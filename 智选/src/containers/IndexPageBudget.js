import { connect } from 'react-redux'
import { sendErrorMessage } from '../actions/Message'
import {
  updateTotalDailyBudget,
  saveTotalDailyBudget
} from '../actions/IndexPage'
import BudgetPopover from '../components/IndexPage/BudgetPopover'

const mapStateToProps = state => {
  return {
    ...state.indexPage.budget
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendErrorMessage: error => {
      dispatch(sendErrorMessage(error))
    },
    saveTotalDailyBudget: budget => {
      dispatch(updateTotalDailyBudget(budget))
      dispatch(saveTotalDailyBudget(budget))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetPopover)
