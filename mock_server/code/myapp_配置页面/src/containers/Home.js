import { connect } from 'react-redux'
import Home from '../pages/home'
import {
  homeMenuChange,
  homeQueryAll,
  homeQueryDetail
} from '../actions/Home'

const mapStateToProps = (state) => {
  const finance = state.account.finance;
  const home = state.home;
  return {
    summary: {
      account: {
        balance: finance.balance,
        todayConsumption: finance.todayConsumption,
      },
      ad: home.summary.ad,
    },
    detail: home.detail,
    activeRangeIndex: home.menu.selectedIndex
  }
};

const mapDispatchToProps = dispatch => ({
  onDateRangeChange: (selectedIndex) => {
    dispatch(homeMenuChange(selectedIndex))
  },
  onQueryDetail: () => {
    dispatch(homeQueryDetail())
  },
  onQueryAll: () => {
    dispatch(homeQueryAll())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
