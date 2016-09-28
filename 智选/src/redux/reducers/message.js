import {
  ALERT_MESSAGE,
  INFO_MESSAGE,
  WARN_MESSAGE,
  ERROR_MESSAGE,
  SHOW_ALERT_MESSAGE,
  SHOW_INFO_MESSAGE,
  SHOW_WARN_MESSAGE,
  SHOW_ERROR_MESSAGE,
  RESET_MESSAGE
} from '../../constants/ActionTypes'

const initialState = {
  type: ALERT_MESSAGE,
  message: null
}

const message = (state = initialState, action) => {
  const { type, message } = action
  switch (type) {
    case SHOW_ALERT_MESSAGE:
      return {
        ...state,
        type: ALERT_MESSAGE,
        message
      }
    case SHOW_INFO_MESSAGE:
      return {
        ...state,
        type: INFO_MESSAGE,
        message
      }
    case SHOW_WARN_MESSAGE:
      return {
        ...state,
        type: WARN_MESSAGE,
        message
      }
    case SHOW_ERROR_MESSAGE:
      return {
        ...state,
        message
      }
    case RESET_MESSAGE:
      return {
        ...state,
        message: null
      }
    default:
      return state
  }
};

export default message
