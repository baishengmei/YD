import React, { Component, PropTypes } from 'react';
import CommunicationMailOutline from 'material-ui/svg-icons/communication/mail-outline';
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline';
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline';
import { browserHistory } from 'react-router';
import CommonIconBadge from './CommonIconBadge';
import { notificationTypeShape } from './NotificationList';
import NotificationPopover from './NotificationPopover';
import HelpPopover from './HelpPopover';
import UserPopover from './UserPopover';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('Header-Icons');

const NotificationBadgePopover = CommonIconBadge(NotificationPopover);
const HelpBadgePopover = CommonIconBadge(HelpPopover);
const UserBadgePopover = CommonIconBadge(UserPopover);

class Notification extends Component {

  constructor(...args) {
    super(...args);
  }

  static propTypes = {
    newMessages: PropTypes.arrayOf(notificationTypeShape).isRequired,
    onRemoveNotification: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.newMessages !== nextProps.newMessages;
  }

  render() {

    myDebug('Notification render');

    const {
      newMessages,
      onRemoveNotification
    } = this.props;

    return (
      <NotificationBadgePopover
        badgeCount={newMessages.length}
        tooltip={`您${newMessages.length > 0 ? '' : '没'}有未读消息`}
        iconElement={<CommunicationMailOutline />}
        messages={newMessages}
        onNoBadgeTouchTap={evt => {
          browserHistory.push('/account');
          return false;
        }}
        onEditReview={({ type, id}) => {
          browserHistory.push(`/managementAds/${type}/${id}`);
        }}
        goToNotificationCenter={id => {
          browserHistory.push('/account/' + id);
        }}
        onRemoveNotification={onRemoveNotification} />
    );
  }

}

class Help extends Component {

  constructor(...args) {
    super(...args);
  }

  static propTypes = {
    newHelps: PropTypes.array.isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.newHelps !== nextProps.newHelps;
  }

  render() {

    myDebug('Help render');

    const newHelps = this.props.newHelps;

    return (
      <HelpBadgePopover
        badgeCount={newHelps.length}
        tooltip={`${newHelps.length > 0 ? '新的' : ''}帮助信息`}
        iconElement={<ActionHelpOutline />}
        navTo={this.navTo} />
    );
  }

  navTo(path) {
    browserHistory.push('/' + path);
  }

}

class User extends Component {

  constructor(...args) {
    super(...args);
  }

  static propTypes = {
    onLogout: PropTypes.func.isRequired
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {

    myDebug('User render');

    return (
      <UserBadgePopover
        badgeCount={0}
        tooltip='查看账户信息以及更多'
        iconElement={<SocialPersonOutline />}
        navTo={this.navTo}
        onLogout={this.props.onLogout} />
    );
  }

  navTo(path) {
    browserHistory.push('/' + path);
  }

}

export {
  Notification,
  Help,
  User
};
