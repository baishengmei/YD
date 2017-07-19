import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from '../../constants/ActionTypes'

const initialState = {
  status: 'initial',
  user: null
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        status: 'loggingIn'
      }
    case LOGIN_SUCCESS:
      return {
        user: action.payload.user,
        status: 'loginSuccess'
      }
    case LOGIN_FAIL:
      return {
        ...state,
        status: 'loginFail'
      }
    case LOGOUT_SUCCESS:
      return {
        user: null,
        status: 'initial'
      }
    default:
      return state
  }
}

export default auth
