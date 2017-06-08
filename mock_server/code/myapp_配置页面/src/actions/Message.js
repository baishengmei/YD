import {
  SHOW_ALERT_MESSAGE,
  SHOW_INFO_MESSAGE,
  SHOW_WARN_MESSAGE,
  SHOW_ERROR_MESSAGE,
  RESET_MESSAGE
} from '../constants/ActionTypes';

const resetMessage = () => ({ type: RESET_MESSAGE })

const sendMessage = type => message => ({ type, message })
const sendAlertMessage = sendMessage(SHOW_ALERT_MESSAGE)
const sendInfoMessage = sendMessage(SHOW_INFO_MESSAGE)
const sendWarnMessage = sendMessage(SHOW_WARN_MESSAGE)
const sendErrorMessage = sendMessage(SHOW_ERROR_MESSAGE)

export {
  resetMessage,
  sendAlertMessage,
  sendInfoMessage,
  sendWarnMessage,
  sendErrorMessage
}
