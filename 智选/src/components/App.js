import React, { PropTypes, Component } from 'react';
import styles from './App.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Header from '../containers/Header';
import Alert from './Alert';

@withStyles(styles)
class App extends Component {

  constructor(...args) {
    super(...args);
    this.handleDismissClick = this.handleDismissClick.bind(this);
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    message: PropTypes.object.isRequired,
    resetMessage: PropTypes.func.isRequired,
  };

  handleDismissClick(e) {
    e && e.preventDefault();
    this.props.resetMessage();
  }

  renderMessage() {
    const { message: {
      type,
      message
    }} = this.props;
    return (
      <Alert
        type={type}
        open={!!message}
        content={message}
        style={{zIndex: 3000}}
        onClose={this.handleDismissClick} />
    );
  }

  render() {
    return (
      <div>
        <Header />
        <div id='main'>
          {this.props.children}
        </div>
        {this.renderMessage()}
      </div>
    );
  }

}

export default App;
