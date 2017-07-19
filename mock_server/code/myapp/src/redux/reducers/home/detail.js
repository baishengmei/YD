import {
  HOME_FETCH_DETAIL_DATA,
  HOME_FETCH_DETAIL_SUCCESS,
  HOME_FETCH_DETAIL_FAIL,

  HOME_FETCH_ALL_DATA,
  HOME_FETCH_ALL_SUCCESS,
  HOME_FETCH_ALL_FAIL,
}
from '../../../constants/ActionTypes'

const detailInitialState = {
  status: 'initial',
  summary: {
    consumption: 0,
    impressions: 0,
    clickNum: 0,
    clickRate: 0,
    cpc: 0,
  },
  detail: []
};

const detail = (state = detailInitialState, action) => {
  switch (action.type) {
    case HOME_FETCH_ALL_DATA:
    case HOME_FETCH_DETAIL_DATA:
      return {
        ...state,
        status: 'loading'
      }
    case HOME_FETCH_DETAIL_SUCCESS:
      return {
        status: 'success',
        ...action.payload,
      }
    case HOME_FETCH_ALL_SUCCESS:
      return {
        status: 'success',
        ...action.payload.detail
      }
    case HOME_FETCH_ALL_FAIL:
    case HOME_FETCH_DETAIL_FAIL:
      return {
        ...state,
        status: 'fail'
      }
    default:
      return state
  }
}

export default detail;
