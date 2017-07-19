import {
  NEW_ADCAMPAIGN_ITEM_CHANGE,
  NEW_ADGROUP_ITEM_CHANGE,
  NEW_ADCONTENT_ITEM_CHANGE,

  FETCH_REGION_LIST,
  FETCH_REGION_LIST_SUCCESS,
  FETCH_REGION_LIST_FAIL,

  CREATE_ADCAMPAIGN,
  CREATE_ADCAMPAIGN_SUCCESS,
  CREATE_ADCAMPAIGN_FAIL,
} from '../constants/ActionTypes'
import {
  NewAdCampaignItems,
} from '../constants/MenuTypes';

export const fetchRegionList = keyword => ({
  types: [
    FETCH_REGION_LIST,
    FETCH_REGION_LIST_SUCCESS,
    FETCH_REGION_LIST_FAIL,
  ],
  promise: http => http.get('/api/adManagement/regionList', {
    query: { keyword }
  })
})

export const adCampaignDataChange = (type, itemType, itemValue) => ({
  type: NEW_ADCAMPAIGN_ITEM_CHANGE,
  payload: {
    type,
    itemType,
    [itemType]: itemValue,
  }
})

export const adGroupDataChange = (type, itemType, itemValue) => ({
  type: NEW_ADGROUP_ITEM_CHANGE,
  payload: {
    type,
    itemType,
    [itemType]: itemValue,
  }
})

export const adContentDataChange = (type, itemType, itemValue) => ({
  type: NEW_ADCONTENT_ITEM_CHANGE,
  payload: {
    type,
    itemType,
    [itemType]: itemValue,
  }
})

export const createAdCampaign = () => (dispatch, getState) => {
  const {
    basicSetting: {
      budget,
      ...rest1,
    },
    timeSetting: {
      startDate,
      endDate,
      runTimeRange,
    },
    regionSetting: {
      region,
    },
  } = getState().adManagement.new.adCampaign

  const data = {
    ...rest1,
    budgetType: budget.type,
    budget: budget.value,
    startDateType: startDate.type,
    startDate: startDate.value && startDate.value.format('YYYY-MM-DD'),
    endDateType: endDate.type,
    endDate: endDate.value && endDate.value.format('YYYY-MM-DD'),
    runTimeRangeType: runTimeRange.type,
    runTimeRange: runTimeRange.value && runTimeRange.value.join('-'),
    regionType: region.type,
  }
  const regionValue = region.value

  if (!regionValue || regionValue.length === 0) {
    data.regionType = NewAdCampaignItems.region[0].value
  } else {
    data.region = regionValue.map(p => p.children.map(c => c.value).join('-')).join('-')
  }

  return dispatch({
    types: [
      CREATE_ADCAMPAIGN,
      CREATE_ADCAMPAIGN_SUCCESS,
      CREATE_ADCAMPAIGN_FAIL,
    ],
    promise: http => http.post('/api/adManagement/newAdCampaign', { data })
  })
}
