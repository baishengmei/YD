import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_TO_HOME
} from '../constants/ActionTypes'

export const login = (username, pw) => {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: http => http.post('/login', {
      data: {
        username,
        pw
      }
    })
  }
}

export const loginToHome = () => {
  return {
    type: LOGIN_TO_HOME
  }
}