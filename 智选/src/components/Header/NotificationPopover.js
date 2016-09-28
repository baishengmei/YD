import React, { Component, PropTypes } from 'react';
import CommonPopover from './CommonPopover';
import NotificationList from './NotificationList';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('Header-NotificationPopover');

/**
 * Notification Popover 组件
 */
class NotificationPopover extends Component {
  constructor(...args) {
    super(...args);
  }

  render() {

    myDebug('NotificationPopover render')

    const {
      openPopover,
      anchorEl,
      onPopoverClose,
      goToNotificationCenter,
      onEditReview,
      ...rest
    } = this.props;

    return (
      <CommonPopover
        openPopover={openPopover}
        anchorEl={anchorEl}
        onPopoverClose={onPopoverClose}
        popoverStyle={{borderRadius: '5px'}}>
        <NotificationList
          goToNotificationCenter={this.goToNotificationCenter}
          onEditReview={this.handleEditReview}
          {...rest} />
      </CommonPopover>
    );
  }

  handleEditReview = (args) => {
    this.props.onPopoverClose();
    this.props.onEditReview(args);
  }

  goToNotificationCenter = notificationId => {
    this.props.onPopoverClose();
    this.props.goToNotificationCenter(notificationId);
  }
}

NotificationPopover.propTypes = {
  ...NotificationList.propTypes
};

[
  'openPopover',
  'anchorEl',
  'onPopoverClose'
].forEach(prop => {
  NotificationPopover.propTypes[prop] = CommonPopover.propTypes[prop];
})

export default NotificationPopover;
