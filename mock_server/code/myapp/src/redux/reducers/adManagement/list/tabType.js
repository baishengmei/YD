import {
  AdTabTypes,
} from '../../../../constants/MenuTypes'
import {
  ADLIST_QUERY_CONDITION_CHANGE,
  RESET_ADLIST_QUERY_CONDITION,
} from '../../../../constants/ActionTypes'

const initialState = AdTabTypes.sponsorAdCampaign

const tabType = (state = initialState, { type, subType }) => {
  switch (type) {
    case ADLIST_QUERY_CONDITION_CHANGE:
      if (subType !== state) {
        return subType
      }
      break;
    case RESET_ADLIST_QUERY_CONDITION:
      return initialState
    default:
  }
  return state
}

export default tabType
