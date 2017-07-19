import {
  NewAdCampaignItems,
  NewAdCampaignSettingItems,
} from '../../../../../constants/MenuTypes'
import {
  NEW_ADCAMPAIGN_ITEM_CHANGE,
  FETCH_REGION_LIST,
  FETCH_REGION_LIST_SUCCESS,
  FETCH_REGION_LIST_FAIL,
} from '../../../../../constants/ActionTypes'

const initialState = {
  regionList: {
    status: 'initial',
    list: [],
  },
  region: {
    type: NewAdCampaignItems.region[0].value,
    value: undefined,
  },
}

const regionSetting = (state = initialState, { type, payload }) => {
  switch (type) {
    case NEW_ADCAMPAIGN_ITEM_CHANGE: {
      const { type: subType, itemType } = payload
      if (subType === NewAdCampaignSettingItems[2].value && itemType === 'region') {
        return {
          ...state,
          [itemType]: payload[itemType],
        }
      }
      return state;
    }
    case FETCH_REGION_LIST:
      return {
        ...state,
        regionList: {
          ...state.regionList,
          status: 'loading',
        }
      }
    case FETCH_REGION_LIST_SUCCESS: {
      return {
        ...state,
        regionList: {
          status: 'success',
          list: payload,
        }
      }
    }
    case FETCH_REGION_LIST_FAIL: {
      return {
        ...state,
        regionList: {
          ...state.regionList,
          status: 'fail',
        }
      }
    }
    default:
      return state;
  }
}

export default regionSetting
