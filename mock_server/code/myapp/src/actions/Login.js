import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../constants/ActionTypes'

const login = (username, pw) => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: http => http.post('/login', {
    data: {
      username,
      pw
    }
  })
})

export default login
