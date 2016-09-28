import { connect } from 'react-redux'
import {
  logout as doLogout,
  logoutToLogin
} from '../actions/Logout'
import {
  removeNotification,
  markNotificationRead
} from '../actions/Notification'
import Header from '../components/Header/Header'

const mapStateToProps = state => {
  const path = state.routing.locationBeforeTransitions.pathname
  return {
    activeNav: path === '/' ? '/index' : path,
    newMessages: state.notification,
    newHelps: [23],
    userInfo: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeNotification: notificationIndex => {
      dispatch(removeNotification(notificationIndex))
    },
    markNotificationRead: notificationId => {
      dispatch(markNotificationRead(notificationId))
    },
    onLogout: () => {
      dispatch(doLogout())
    },
    goToLogin: () => {
      dispatch(logoutToLogin())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
