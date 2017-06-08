import { connect } from 'react-redux'
import AdManagementList from '../pages/adManagement/list'
import {
  fechFinanceBudget,
  updateSponsorBudget,
  fetchQuickSearchList,
} from '../actions/AdManagementList'
import { sendErrorMessage } from '../actions/Message'

const mapStateToProps = state => ({
  finance: state.account.finance,
  sponsorBudget: state.account.sponsorBudget,
  quickSearch: state.adManagement.list.quickSearch
})

const mapDispatchToProps = dispatch => ({
  fechFinanceBudget() {
    dispatch(fechFinanceBudget())
  },
  onDailyBudgetChange(value) {
    dispatch(updateSponsorBudget(value));
  },
  fetchQuickSearchList(keywords) {
    dispatch(fetchQuickSearchList(keywords))
  },
  sendErrorMessage(msg) {
    dispatch(sendErrorMessage(msg))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdManagementList)
