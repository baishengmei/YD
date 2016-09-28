import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from '../../constants/ActionTypes'

const initialState = {
  loggingIn: false,
  user: null
}

const auth = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: {
          username: action.result.username
        }
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}

export default auth