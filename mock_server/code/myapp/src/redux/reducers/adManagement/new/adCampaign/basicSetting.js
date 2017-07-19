import {
  AdDeliveryObjectList,
  NewAdCampaignItems,
  NewAdCampaignSettingItems,
} from '../../../../../constants/MenuTypes'
import { NEW_ADCAMPAIGN_ITEM_CHANGE } from '../../../../../constants/ActionTypes'

const initialState = {
  object: AdDeliveryObjectList[1].value,
  adCampaignName: '',
  budget: {
    type: NewAdCampaignItems.budget[0].value,
    value: undefined,
  },
  clientType: NewAdCampaignItems.clientType[0].value,
}

const basicSetting = (state = initialState, { type, payload }) => {
  if (type === NEW_ADCAMPAIGN_ITEM_CHANGE) {
    const { type: subType, itemType } = payload
    if (subType === NewAdCampaignSettingItems[0].value) {
      switch (itemType) {
        case 'adCampaignName':
        case 'budget':
        case 'clientType':
          return {
            ...state,
            [itemType]: payload[itemType],
          }
        case 'object': {
          const nextState = {
            ...state,
            [itemType]: payload[itemType],
          }
          if (payload[itemType] === AdDeliveryObjectList[2].value) {
            nextState.clientType = NewAdCampaignItems.clientType[0].value
          }
          return nextState
        }
        default:
      }
    }
  }
  return state
}

export default basicSetting
