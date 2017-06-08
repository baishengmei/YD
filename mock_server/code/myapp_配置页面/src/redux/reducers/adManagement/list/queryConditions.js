import moment from 'moment'
import {
  AdTabTypes,
  AdStates,
  AdDeliveryObjectList,
  AdPageSizeOptions,
} from '../../../../constants/MenuTypes'
import {
  ADLIST_QUERY_CONDITION_CHANGE,
  RESET_ADLIST_QUERY_CONDITION,
} from '../../../../constants/ActionTypes'

const getSingleInitialState = (type) => {
  const today = moment()
  const initialState = {
    dateRange: {
      startDate: today,
      endDate: today,
    },
    selectedStatus: AdStates[type][0],
    selectedObject: AdDeliveryObjectList[0],
    keyword: '',
    pageSize: AdPageSizeOptions[0] - 0,
    pageNo: 1,
  }
  switch (type) {
    case AdTabTypes.adGroupAdContent:
      initialState.adCampaignId = -1
      initialState.adGroupId = -1
      break
    case AdTabTypes.adCampaignAdGroup:
    case AdTabTypes.adCampaignAdContent:
      initialState.adCampaignId = -1
      break
    default:
  }
  return initialState
}

const getInitialState = () => {
  const initialState = {}
  Object.keys(AdTabTypes).forEach((k) => {
    initialState[k] = getSingleInitialState(k)
  })
  return initialState
}

const queryCondition = (state = getInitialState(), { type, subType, payload }) => {
  if (type === ADLIST_QUERY_CONDITION_CHANGE) {
    switch (payload.type) {
      case 'dateRange':
      case 'keyword':
      case 'selectedStatus':
      case 'selectedObject':
      case 'adCampaignId':
      case 'pageSize':
        return {
          ...state,
          [subType]: {
            ...state[subType],
            [payload.type]: payload[payload.type],
            pageNo: 1,
          },
        }
      case 'adGroupId':
        return {
          ...state,
          [subType]: {
            ...state[subType],
            adCampaignId: payload.adCampaignId,
            adGroupId: payload.adGroupId,
            pageNo: 1,
          },
        }
      case 'pageNo':
        return {
          ...state,
          [subType]: {
            ...state[subType],
            pageNo: payload.pageNo
          },
        }
      default:
    }
  } else if (type === RESET_ADLIST_QUERY_CONDITION) {
    return getInitialState()
  }
  return state
}

export default queryCondition
