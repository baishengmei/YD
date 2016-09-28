import {
  INDEX_PAGE_FETCH_ALL_DATA,
  INDEX_PAGE_FETCH_ALL_SUCCESS,
  INDEX_PAGE_FETCH_ALL_FAIL,
  INDEX_PAGE_FETCH_DETAIL_DATA,
  INDEX_PAGE_FETCH_DETAIL_SUCCESS,
  INDEX_PAGE_FETCH_DETAIL_FAIL
}
from '../../constants/ActionTypes'

const initialState = {
  isFetching: true,
  summary: {
    show: 0,
    click: 0,
    clickRate: 0,
    consumption: 0,
  },
  chart: undefined
}

const detail = (state = initialState, action) => {
  switch(action.type) {
    case INDEX_PAGE_FETCH_ALL_DATA:
    case INDEX_PAGE_FETCH_DETAIL_DATA:
      return {
        ...state,
        isFetching: true
      }
    case INDEX_PAGE_FETCH_ALL_SUCCESS:
    case INDEX_PAGE_FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        // summary: {
        //   ...action.result.detail.summary
        // }
        ...action.result.detail
      }
    case INDEX_PAGE_FETCH_ALL_FAIL:
    case INDEX_PAGE_FETCH_DETAIL_FAIL:
      return {
        ...state,
        isFetching: false,
        chart: undefined
      }
    default:
      return state
  }
}

export default detail
