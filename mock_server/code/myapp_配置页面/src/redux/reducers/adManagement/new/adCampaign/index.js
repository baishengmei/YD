import { combineReducers } from 'redux'
import basicSetting from './basicSetting'
import timeSetting from './timeSetting'
import regionSetting from './regionSetting'

const adCampaign = combineReducers({
  basicSetting,
  timeSetting,
  regionSetting,
})

export default adCampaign
