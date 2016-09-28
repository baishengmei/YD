import { connect } from 'react-redux'
import { resetMessage } from '../actions/Message'
import App from '../components/App'

const mapStateToProps = state => {
  return {
    message: state.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetMessage: () => {
      dispatch(resetMessage())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)