import {
  FETCH_ADCAMPAIGN_LIST,
  FETCH_ADCAMPAIGN_LIST_SUCCESS,
  FETCH_ADCAMPAIGN_LIST_FAIL,

  FETCH_ADGROUP_LIST,
  FETCH_ADGROUP_LIST_SUCCESS,
  FETCH_ADGROUP_LIST_FAIL,

  FETCH_ADCONTENT_LIST,
  FETCH_ADCONTENT_LIST_SUCCESS,
  FETCH_ADCONTENT_LIST_FAIL,

  ADLIST_QUERY_CONDITION_CHANGE,
} from '../../../../constants/ActionTypes'
import { AdTabTypes } from '../../../../constants/MenuTypes'

const getSingleInitialState = () => ({
  status: 'initial',
  total: 0,
  list: []
});

const initialState = {};
Object.keys(AdTabTypes).forEach((k) => {
  initialState[k] = getSingleInitialState();
});

const list = (state = initialState, { type, subType, payload }) => {
  switch (type) {
    case ADLIST_QUERY_CONDITION_CHANGE:
      return {
        ...state,
        [subType]: getSingleInitialState(),
      }
    case FETCH_ADCAMPAIGN_LIST:
    case FETCH_ADGROUP_LIST:
    case FETCH_ADCONTENT_LIST:
      return {
        ...state,
        [subType]: {
          ...state[subType],
          status: 'loading',
        }
      }
    case FETCH_ADCAMPAIGN_LIST_SUCCESS:
    case FETCH_ADGROUP_LIST_SUCCESS:
    case FETCH_ADCONTENT_LIST_SUCCESS:
      return {
        ...state,
        [subType]: {
          status: 'success',
          total: payload.total,
          list: payload.list,
        }
      }
    case FETCH_ADCAMPAIGN_LIST_FAIL:
    case FETCH_ADGROUP_LIST_FAIL:
    case FETCH_ADCONTENT_LIST_FAIL:
      return {
        ...state,
        [subType]: {
          ...state[subType],
          status: 'fail',
        }
      }
    default:
      return state
  }
}

export default list
