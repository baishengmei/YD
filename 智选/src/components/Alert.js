import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ActionInfo from 'material-ui/svg-icons/action/info';
import AlertError from 'material-ui/svg-icons/alert/error';
import ActionWarning from 'material-ui/svg-icons/alert/warning';
import { red700, blue700, yellow700 } from 'material-ui/styles/colors';
import {
  ALERT_MESSAGE,
  INFO_MESSAGE,
  WARN_MESSAGE,
  ERROR_MESSAGE
} from '../constants/ActionTypes';

class Alert extends Component {

  static propTypes = {
    content: PropTypes.string,
    type: PropTypes.oneOf([
      ALERT_MESSAGE,
      INFO_MESSAGE,
      WARN_MESSAGE,
      ERROR_MESSAGE
    ]),
    style: PropTypes.object,
    onClose: PropTypes.func
  };

  static defaultProps = {
    type: ALERT_MESSAGE,
    style: {}
  };

  titleStyle = {
    margin: '0',
    padding: '20px',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: '400',
    borderBottom: 'none'
  };

  getTitle() {
    let type = this.props.type;

    let map = {
      [ALERT_MESSAGE]: ['', '', '提示'],
      [INFO_MESSAGE]: [ActionInfo, blue700, '信息'],
      [WARN_MESSAGE]: [ActionWarning, yellow700, '警告'],
      [ERROR_MESSAGE]: [AlertError, red700, '错误'],
    };

    let m = map[type];

    return m[0] ?
      React.createElement(
        'div',
        null,
        React.createElement(
          m[0],
          {
            key: 0,
            style: {
              marginRight: '5px'
            },
            color: m[1]
          }
        ),
        m[2]
      ) :
      m[2];
  }

  render() {
    const actions = [
      <FlatButton
        label="知道了"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}/>
    ];

    const title = this.getTitle();

    return (
      <Dialog
        title={title}
        titleStyle={this.titleStyle}
        contentStyle={{width: '600px'}}
        actions={actions}
        modal={false}
        open={!!this.props.content}
        style={this.props.style}
        onRequestClose={this.handleClose}>
        {this.props.content}
      </Dialog>
    );
  }

  handleClose = () => {
    if ( this.props.onClose ) {
      this.props.onClose();
    }
  }
}

export default Alert;
