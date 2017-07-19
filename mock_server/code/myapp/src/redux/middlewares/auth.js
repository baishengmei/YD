import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../../constants/ActionTypes'

export default () => next => (action) => {
  if (typeof action === 'function') {
    return next(action)
  }
  switch (action.type) {
    case LOGIN_SUCCESS:
      if (window) {
        window.location.replace('/home')
      }
      break
    case LOGOUT_SUCCESS:
      if (typeof window !== 'undefined') {
        window.location.href = action.payload.redirect;
      }
      break
    default:
      return next(action)
  }
}
