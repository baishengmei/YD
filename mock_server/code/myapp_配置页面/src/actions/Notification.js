import {
  FETCH_NOTIFICATION_DATA,
  FETCH_NOTIFICATION_SUCCESS,
  FETCH_NOTIFICATION_FAIL,

  REMOVE_NOTIFICATION,
  REMOVE_NOTIFICATION_SUCCESS,
  REMOVE_NOTIFICATION_FAIL,

  MARK_NOTIFICATION_READ,
  MARK_NOTIFICATION_READ_SUCCESS,
  MARK_NOTIFICATION_READ_FAIL,
} from '../constants/ActionTypes';

export function fetchNotification() {
  return {
    types: [
      FETCH_NOTIFICATION_DATA,
      FETCH_NOTIFICATION_SUCCESS,
      FETCH_NOTIFICATION_FAIL
    ],
    promise: http => http.get('/api/notification/unread')
  }
}

export function removeNotification(notificationId) {
  return {
    types: [
      REMOVE_NOTIFICATION,
      REMOVE_NOTIFICATION_SUCCESS,
      REMOVE_NOTIFICATION_FAIL
    ],
    notificationId,
    promise: http => http.post('/api/notification/del', {
      data: {
        notificationId
      }
    })
  }
}

export function markNotificationRead(notificationId) {
  return {
    types: [
      MARK_NOTIFICATION_READ,
      MARK_NOTIFICATION_READ_SUCCESS,
      MARK_NOTIFICATION_READ_FAIL
    ],
    promise: http => http.post('/api/notification/read', {
      data: {
        notificationId
      }
    })
  }
}
