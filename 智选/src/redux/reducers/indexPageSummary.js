import {
  INDEX_PAGE_FETCH_ALL_DATA,
  INDEX_PAGE_FETCH_ALL_SUCCESS,
  INDEX_PAGE_FETCH_ALL_FAIL,
  UPDATE_TOTAL_DAILY_BUDGET,
  SAVE_TOTAL_DAILY_BUDGET,
  SAVE_TOTAL_DAILY_BUDGET_SUCCESS,
  SAVE_TOTAL_DAILY_BUDGET_FAIL
}
from '../../constants/ActionTypes'

const summaryInitialState = {
  isFetching: true,
  content: {
    accountBalance: 0,
    accountStatus: '有效',
    yesterdayConsumption: 0,
    todayConsumption: 0,
    pending: 0,
    traffickingIn: 0,
    pause: 0,
    invalid: 0,
    total: 0
  }
}

const summary = (state = summaryInitialState, action) => {
  switch(action.type) {
    case INDEX_PAGE_FETCH_ALL_DATA:
      return {
        ...state,
        isFetching: true
      }
    case INDEX_PAGE_FETCH_ALL_SUCCESS:
      return {
        isFetching: false,
        content: {
          ...action.result.summary
        }
      }
    case INDEX_PAGE_FETCH_ALL_FAIL:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

const budgetInitialState = {
  isFetching: true,
  isSaving: false,
  // 保存前的 totalDailyBudget
  prevTotalDailyBudget: void 0,
  // 默认未设置
  totalDailyBudget: void 0,
  remainingEditTimes: 0
}

const budget = (state = budgetInitialState, action) => {
  switch(action.type) {
    case UPDATE_TOTAL_DAILY_BUDGET:
      return {
        ...state,
        prevTotalDailyBudget: state.totalDailyBudget,
        totalDailyBudget: action.budget,
        remainingEditTimes: state.remainingEditTimes -1
      }
    case INDEX_PAGE_FETCH_ALL_DATA:
      return {
        ...state,
        isFetching: true
      }
    case INDEX_PAGE_FETCH_ALL_SUCCESS:
      let budget = action.result.budget;
      return {
        ...state,
        isFetching: false,
        prevTotalDailyBudget: state.totalDailyBudget,
        totalDailyBudget: budget.totalDailyBudget == null ? undefined : budget.totalDailyBudget - 0,
        remainingEditTimes: budget.remainingEditTimes - 0
      };
    case INDEX_PAGE_FETCH_ALL_FAIL:
      return {
        ...state,
        isFetching: false,
        prevTotalDailyBudget: state.totalDailyBudget,
        totalDailyBudget: 0,
        remainingEditTimes: 0
      };
    case SAVE_TOTAL_DAILY_BUDGET:
      return {
        ...state,
        isSaving: true
      }
    case SAVE_TOTAL_DAILY_BUDGET_SUCCESS:
      return {
        ...state,
        isSaving: false
      }
    case SAVE_TOTAL_DAILY_BUDGET_FAIL:
      return {
        ...state,
        isSaving: false,
        totalDailyBudget: state.prevTotalDailyBudget,
        prevTotalDailyBudget: void 0,
        remainingEditTimes: state.remainingEditTimes + 1
      }
    default:
      return state
  }
}

export {
  summary,
  budget
}
