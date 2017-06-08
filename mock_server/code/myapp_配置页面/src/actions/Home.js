import {
  HOME_MENU_CHANGE,

  HOME_FETCH_SUMMARY_DATA_FOR_FE,
  HOME_FETCH_DETAIL_DATA_FOR_FE,

  HOME_FETCH_ALL_DATA,
  HOME_FETCH_ALL_SUCCESS,
  HOME_FETCH_ALL_FAIL,

  HOME_FETCH_DETAIL_DATA,
  HOME_FETCH_DETAIL_SUCCESS,
  HOME_FETCH_DETAIL_FAIL,
} from '../constants/ActionTypes'
import { getDateRange } from '../core/utils'

export function homeMenuChange(activeRangeIndex) {
  return {
    type: HOME_MENU_CHANGE,
    activeRangeIndex
  }
}

const homeQuery = (queryType, actionTypes) =>
(dispatch, getState) => {
  const { dateRangeItem: { range } } = getState().home.menu

  return dispatch({
    types: actionTypes,
    promise: http => http.get('/api/home', {
      query: {
        type: queryType,
        dateRange: getDateRange(range[0], range[1])
      }
    })
  })
}

export const homeQueryAll = () => homeQuery(
  `${HOME_FETCH_SUMMARY_DATA_FOR_FE},${HOME_FETCH_DETAIL_DATA_FOR_FE}`,
  [
    HOME_FETCH_ALL_DATA,
    HOME_FETCH_ALL_SUCCESS,
    HOME_FETCH_ALL_FAIL
  ]
)

export const homeQueryDetail = () => homeQuery(
  HOME_FETCH_DETAIL_DATA_FOR_FE,
  [
    HOME_FETCH_DETAIL_DATA,
    HOME_FETCH_DETAIL_SUCCESS,
    HOME_FETCH_DETAIL_FAIL
  ]
)
