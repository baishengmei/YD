import { connect } from 'react-redux'
import LoginPage from '../components/LoginPage'
import {
  resetMessage,
  sendErrorMessage
} from '../actions/Message'
import {
  login as doLogin,
  loginToHome
} from '../actions/Login'

const mapStateToProps = state => {
  return {
    message: state.message,
    isLoggingIn: state.auth.loggingIn,
    login: !!state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetMessage: () => {
      dispatch(resetMessage())
    },
    sendErrorMessage: error => {
      dispatch(sendErrorMessage(error))
    },
    onLogin: (username, pw) => {
      dispatch(doLogin(username, pw))
    },
    goHome: () => {
      dispatch(loginToHome())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)