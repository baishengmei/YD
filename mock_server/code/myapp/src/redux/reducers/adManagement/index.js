import { combineReducers } from 'redux'
import list from './list'
import newAd from './new'

const adManagement = combineReducers({
  list,
  new: newAd,
})

export default adManagement
