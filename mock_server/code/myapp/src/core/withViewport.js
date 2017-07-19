import React, { Component } from 'react';

// Default size for server-side rendering
let viewport = { width: 1366, height: 768 };

const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

function withViewport(ComposedComponent) {
  return class WithViewport extends Component {

    state = {
      viewport: canUseDOM ? { width: window.innerWidth, height: window.innerHeight } : viewport,
    };

    componentDidMount() {
      window.addEventListener('resize', this.handleResize, false);
      window.addEventListener('orientationchange', this.handleResize, false);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('orientationchange', this.handleResize);
    }

    render() {
      return <ComposedComponent {...this.props} viewport={this.state.viewport} />;
    }

    handleResize = () => {
      if (viewport.width !== window.innerWidth || viewport.height !== window.innerHeight) {
        viewport = { width: window.innerWidth, height: window.innerHeight };
        this.setState({ viewport });
      }
    }

  };
}

export default withViewport;
