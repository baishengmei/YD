import {
  LOGIN_TO_HOME,
  LOGOUT_TO_LOGIN
} from '../../constants/ActionTypes'

export default store => next => action => {
  if ( typeof action === 'function' ) {
    return next(action)
  }
  switch ( action.type ) {
    case LOGIN_TO_HOME:
      window && window.location.replace('/index')
      break
    case LOGOUT_TO_LOGIN:
      window && window.location.replace('/login')
      break
    default:
      return next(action)
  }
}