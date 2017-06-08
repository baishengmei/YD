import {
  NewAdCampaignItems,
  NewAdCampaignSettingItems,
} from '../../../../../constants/MenuTypes'
import { NEW_ADCAMPAIGN_ITEM_CHANGE } from '../../../../../constants/ActionTypes'

const getInitialState = () => ({
  startDate: {
    type: NewAdCampaignItems.startDate[0].value,
    value: undefined,
  },
  endDate: {
    type: NewAdCampaignItems.endDate[0].value,
    value: undefined,
  },
  runTimeRange: {
    type: NewAdCampaignItems.runTimeRange[0].value,
    value: undefined,
  },
})

const timeSetting = (state = getInitialState(), { type, payload }) => {
  if (type === NEW_ADCAMPAIGN_ITEM_CHANGE) {
    const { type: subType, itemType } = payload
    if (subType === NewAdCampaignSettingItems[1].value) {
      switch (itemType) {
        case 'startDate':
        case 'endDate':
        case 'runTimeRange':
          return {
            ...state,
            [itemType]: payload[itemType],
          }
        default:
      }
    }
  }
  return state;
}

export default timeSetting
