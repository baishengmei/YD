import {
  REMOVE_NOTIFICATION,
  MARK_NOTIFICATION_READ,
  MARK_NOTIFICATION_READ_SUCCESS,
  MARK_NOTIFICATION_READ_FAIL,
} from '../constants/ActionTypes';

export function removeNotification(index) {
  return {
    type: REMOVE_NOTIFICATION,
    index
  }
}

export function markNotificationRead(notificationId) {
  return {
    types: [
      MARK_NOTIFICATION_READ,
      MARK_NOTIFICATION_READ_SUCCESS,
      MARK_NOTIFICATION_READ_FAIL
    ],
    promise: http => http.post('/api/notificationRead', {
      data: {
        notificationId
      }
    })
  }
}
