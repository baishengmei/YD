import {
  HOME_FETCH_ALL_DATA,
  HOME_FETCH_ALL_SUCCESS,
  HOME_FETCH_ALL_FAIL,
}
from '../../../constants/ActionTypes'

const summaryInitialState = {
  status: 'initial',
  ad: {
    toBeAudit: 0,
    unpass: 0,
    outOfBudget: 0
  }
};

const summary = (state = summaryInitialState, action) => {
  switch (action.type) {
    case HOME_FETCH_ALL_DATA:
      return {
        ...state,
        status: 'loading'
      }
    case HOME_FETCH_ALL_SUCCESS:
      return {
        status: 'success',
        ad: action.payload.summary.ad
      }
    case HOME_FETCH_ALL_FAIL:
      return {
        ...state,
        status: 'fail'
      }
    default:
      return state
  }
}

export default summary;
