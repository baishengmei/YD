import {
  INDEX_PAGE_MENU_CHANGE,

  INDEX_PAGE_FETCH_ALL_DATA,
  INDEX_PAGE_FETCH_ALL_SUCCESS,
  INDEX_PAGE_FETCH_ALL_FAIL,

  INDEX_PAGE_FETCH_DETAIL_DATA,
  INDEX_PAGE_FETCH_DETAIL_SUCCESS,
  INDEX_PAGE_FETCH_DETAIL_FAIL,

  UPDATE_TOTAL_DAILY_BUDGET,
  SAVE_TOTAL_DAILY_BUDGET,
  SAVE_TOTAL_DAILY_BUDGET_SUCCESS,
  SAVE_TOTAL_DAILY_BUDGET_FAIL
} from '../constants/ActionTypes';

export function updateTotalDailyBudget(budget) {
  return {
    type: UPDATE_TOTAL_DAILY_BUDGET,
    budget
  }
}

export function saveTotalDailyBudget(budget) {
  return {
    types: [
      SAVE_TOTAL_DAILY_BUDGET,
      SAVE_TOTAL_DAILY_BUDGET_SUCCESS,
      SAVE_TOTAL_DAILY_BUDGET_FAIL
    ],
    promise: http => http.post('/api/saveDailyBudget', {
      data: {
        budget
      }
    })
  }
}

// Resets the currently visible error message.
export function indexPageMenuChange(menu) {
  return {
    type: INDEX_PAGE_MENU_CHANGE,
    menu
  }
}

const indexPageQuery = (queryType, actionTypes) => {
  return (dispatch, getState) => {
    let {
      type,
      value,
      dateRange
    } = getState().indexPage.menu

    return dispatch({
      types: actionTypes,
      promise: http => http.get('/api/indexPage', {
        data: {
          type: queryType,
          menu: JSON.stringify({
            type,
            value,
            dateRange
          })
        }
      })
    })
  }
}

export const indexPageQueryAll = () => indexPageQuery('indexPage_all', [
  INDEX_PAGE_FETCH_ALL_DATA,
  INDEX_PAGE_FETCH_ALL_SUCCESS,
  INDEX_PAGE_FETCH_ALL_FAIL
])

export const indexPageQueryDetail = () => indexPageQuery('indexPage_detail', [
  INDEX_PAGE_FETCH_DETAIL_DATA,
  INDEX_PAGE_FETCH_DETAIL_SUCCESS,
  INDEX_PAGE_FETCH_DETAIL_FAIL
])
