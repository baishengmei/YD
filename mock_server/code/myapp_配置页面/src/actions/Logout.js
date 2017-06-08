import {
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../constants/ActionTypes'

const logout = () => ({
  types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
  promise: http => http.get('/logout')
})

export default logout
