import { connect } from 'react-redux'
import doLogout from '../actions/Logout'
import Header from '../components/Header'

const mapStateToProps = state => ({
  username: state.auth.user && state.auth.user.email
})

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(doLogout())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
