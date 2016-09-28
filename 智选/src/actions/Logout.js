import {
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_TO_LOGIN
} from '../constants/ActionTypes'

export const logout = () => {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: http => http.get('/logout', {})
  }
}

export const logoutToLogin = () => {
  return {
    type: LOGOUT_TO_LOGIN
  }
}