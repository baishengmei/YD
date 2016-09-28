import React, { Component, PropTypes } from 'react';
import Popover from 'material-ui/Popover/Popover';
import PopoverAnimationVertical from 'material-ui/Popover/PopoverAnimationVertical';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('Header-CommonPopover');


/**
 * Header Common Popover 组件 for Badge and Notification
 */
class CommonPopover extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      openPopover: false
    };

    this.popoverStyle = {
      marginTop: '-5px',
      marginLeft: '-50px',
      fontSize: '14px'
    };
  }

  componentWillMount() {
    this.setState({
      openPopover: this.props.openPopover
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      openPopover: nextProps.openPopover
    })
  }

  render() {

    myDebug('CommonPopover render')

    let {
      anchorEl,
      anchorOrigin,
      targetOrigin,
      popoverStyle,
      children
    } = this.props;

    return (
      <Popover
        style={{
          ...this.popoverStyle,
          ...popoverStyle
        }}
        zDepth={2}
        open={this.state.openPopover}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        targetOrigin={targetOrigin}
        canAutoPosition={false}
        animation={PopoverAnimationVertical}
        onRequestClose={this.handlePopoverClose}>
        {children}
      </Popover>
    );
  }

  handlePopoverClose = (type) => {
    if ( type === 'clickAway' ) {
      this.state.openPopover = false;
      this.forceUpdate();
      this.props.onPopoverClose();
    }
  }
}

CommonPopover.propTypes = {
  openPopover: PropTypes.bool.isRequired,
  anchorEl: PropTypes.any,
  onPopoverClose: PropTypes.func.isRequired,
  anchorOrigin: PropTypes.object,
  targetOrigin: PropTypes.object,
  popoverStyle: PropTypes.object
};

CommonPopover.defaultProps = {
  anchorOrigin: {
    horizontal: 'left',
    vertical: 'bottom'
  },
  targetOrigin: {
    horizontal: 'left',
    vertical: 'top'
  },
  popoverStyle: {}
};

export default CommonPopover;
