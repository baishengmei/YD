import React, { Component, PropTypes } from 'react';
import rootStyles from './Header.css';
import Divider from 'material-ui/Divider';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuTypes, { NotificationMenuItems } from '../../constants/MenuTypes';
import Menu from '../Menu';
import NotificationDetail from './NotificationDetail';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('Header-NotificationList');


/**
 * notification list 组件
 */
class NotificationList extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      detailNotification: {
        index: -1,
        anchorEl: undefined
      },
      selectedMenu: {
        selectedIndex: 0,
        value: NotificationMenuItems[0].value
      }
    };
  }

  componentWillMount() {
    this.setState({
      messages: this.props.messages
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.messages
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      detailNotification: {
        index
      },
      selectedMenu: {
        selectedIndex
      },
      messages
    } = this.state;
    return index !== nextState.detailNotification.index
      || selectedIndex !== nextState.selectedMenu.selectedIndex
      || messages.length !== nextState.messages.length;
  }

  formatDate(date) {
    return typeof date === 'object' ?
      `${date.getMonth() + 1}月${date.getDate()}日` :
      this.formatDate(new Date(date));
  }

  getMessages() {
    let {
      selectedMenu: {
        value: menuType
      },
      messages
    } = this.state;

    return messages.map((msg, index) => {
      return menuType === 'all' || menuType.includes(msg.type) ?
        [
          <div
            className={rootStyles.messageItem}>
            <span
              className={rootStyles.messageTime}>
              {this.formatDate(msg.time)}
            </span>
            <span
              className={rootStyles.messageContent}
              onTouchTap={evt => {
                this.showNotificationDetail(evt, index)
              }}>
              {msg.content}
            </span>
            <span
              className={rootStyles.messageAction}>
              <NavigationClose
                onTouchTap={() => {
                  this.handleRemoveNotifcation(index)
                }}/>
            </span>
          </div>,
          <Divider style={{width: '100%'}}/>
        ] :
        null;
    });
  }

  getDetailNotification() {
    let {
      detailNotification: {
        index,
        anchorEl
      },
      messages
    } = this.state;

    let openPopover = index !== -1;
    let notification = openPopover ? messages[index] : null;

    return (
      <NotificationDetail
        openPopover={openPopover}
        anchorEl={anchorEl}
        notification={notification}
        onEditReview={this.props.onEditReview}
        goToNotificationCenter={this.props.goToNotificationCenter}
        onHideDetailNotification={this.handleHideDetailNotification}
        onRemoveNotification={this.handleRemoveDetailNotifcation} />
    );
  }

  render() {

    myDebug('NotificationList render')

    return (
      <section style={{width: '400px', borderRadius: '10px'}}>
        <header
          className={rootStyles.notificationPopoverHeader}>
          <Menu
            menuType={MenuTypes.NOTIFICATION}
            selectedMenu={this.state.selectedMenu}
            menuItems={NotificationMenuItems}
            dropDownMenuStyle={{height:'40px',marginTop: '-10px'}}
            underlineStyle={{display: 'none'}}
            labelStyle={{lineHeight: '40px'}}
            iconStyle={{marginTop: '-8px'}}
            style={{float: 'right'}}
            onMenuChange={this.handleMenuChange} />
        </header>
        <div className={rootStyles.messageListBox}>
          {this.getMessages()}
        </div>
        {this.getDetailNotification()}
      </section>
    );
  }

  handleMenuChange = (type, selectedMenu) => {
    this.setState({
      selectedMenu
    });
  }

  // 当前页面显示 notification 的详细信息
  showNotificationDetail = (evt, index) => {
    this.setState({
      detailNotification: {
        index,
        anchorEl: evt.currentTarget.parentNode
      }
    });
  }

  handleHideDetailNotification = () => {
    this.state.detailNotification = {
      index: -1,
      anchorEl: undefined
    };
  }

  handleRemoveDetailNotifcation = (notificationId) => {
    let index = this.state.messages.findIndex( n => n.id === notificationId );
    this.handleRemoveNotifcation(index);
  }

  handleRemoveNotifcation = (index) => {
    let messages = this.state.messages;
    this.setState({
      messages: messages.slice(0, index).concat(messages.slice(index+1))
    }, () => {
      this.forceUpdate();
      setTimeout(() => {
        this.props.onRemoveNotification(index);
      }, 20);
    })
  }
}

const notificationMenuTypes =
NotificationMenuItems.reduce((prev, { value }) => {
  if ( Array.isArray(value) ) {
    prev.push.apply(prev, value);
  } else {
    prev.push(value);
  }
  return prev;
}, []);

const notificationTypeShape = PropTypes.shape({
  id: PropTypes.any.isRequired,
  content: PropTypes.string.isRequired,
  adGroupId: PropTypes.number,
  adContentId: PropTypes.number,
  type: PropTypes.oneOf(notificationMenuTypes).isRequired,
  time: PropTypes.any.isRequired
});

NotificationList.propTypes = {
  messages: PropTypes.arrayOf(notificationTypeShape).isRequired,
  onRemoveNotification: PropTypes.func.isRequired,
  onEditReview: PropTypes.func.isRequired,
  goToNotificationCenter: PropTypes.func.isRequired
};

export {
  NotificationList as default,
  notificationTypeShape
};
