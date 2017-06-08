import {
  HOME_FETCH_ALL_DATA,
  HOME_FETCH_ALL_SUCCESS,
  HOME_FETCH_ALL_FAIL,

  FETCH_FINANCE_AND_BUDGET,
  FETCH_FINANCE_AND_BUDGET_SUCCESS,
  FETCH_FINANCE_AND_BUDGET_FAIL,

  UPDATE_SPONSOR_BUDGET,
  UPDATE_SPONSOR_BUDGET_SUCCESS,
  UPDATE_SPONSOR_BUDGET_FAIL,
}
from '../../constants/ActionTypes'

const initialState = {
  finance: {
    status: 'initial',
    balance: 0,
    todayConsumption: 0,
  },
  sponsorBudget: {
    status: 'initial',
    dailyBudget: 0,
    remainingSettingTimes: 5,
    prev: {
      dailyBudget: 0,
      remainingSettingTimes: 5,
    },
  },
};

const account = (state = initialState, { type, dailyBudget, payload }) => {
  switch (type) {
    case HOME_FETCH_ALL_DATA:
    case FETCH_FINANCE_AND_BUDGET:
      return {
        finance: {
          ...state.finance,
          status: 'loading',
        },
        sponsorBudget: {
          ...state.sponsorBudget,
          status: 'loading',
        },
      }
    case UPDATE_SPONSOR_BUDGET:
      return {
        finance: state.finance,
        sponsorBudget: {
          status: 'saving',
          dailyBudget,
          remainingSettingTimes: state.sponsorBudget.remainingSettingTimes - 1,
          prev: {
            dailyBudget: state.sponsorBudget.dailyBudget,
            remainingSettingTimes: state.sponsorBudget.remainingSettingTimes,
          },
        }
      }
    case HOME_FETCH_ALL_SUCCESS:
      return {
        finance: {
          status: 'success',
          ...payload.summary.account,
        },
        sponsorBudget: state.sponsorBudget,
      }
    case FETCH_FINANCE_AND_BUDGET_SUCCESS:
      return {
        finance: {
          status: 'success',
          balance: payload.balance,
          todayConsumption: payload.todayConsumption,
        },
        sponsorBudget: {
          status: 'success',
          dailyBudget: payload.dailyBudget,
          remainingSettingTimes: payload.remainingBudgetSettingTimes,
          prev: {
            dailyBudget: payload.dailyBudget,
            remainingSettingTimes: payload.remainingBudgetSettingTimes,
          },
        }
      }
    case UPDATE_SPONSOR_BUDGET_SUCCESS:
      return {
        finance: state.finance,
        sponsorBudget: {
          ...state.sponsorBudget,
          status: 'success',
        }
      }
    case HOME_FETCH_ALL_FAIL:
      return {
        finance: {
          ...state.finance,
          status: 'fail',
        },
        sponsorBudget: state.sponsorBudget,
      }
    case FETCH_FINANCE_AND_BUDGET_FAIL:
      return {
        finance: {
          ...state.finance,
          status: 'fail',
        },
        sponsorBudget: {
          ...state.sponsorBudget,
          status: 'fail',
        }
      }
    case UPDATE_SPONSOR_BUDGET_FAIL:
      return {
        finance: state.finance,
        sponsorBudget: {
          ...state.sponsorBudget.prev,
          prev: state.sponsorBudget.prev,
        }
      }
    default:
      return state
  }
}

export default account;
