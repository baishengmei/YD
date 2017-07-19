import { combineReducers } from 'redux'
import quickSearch from './quickSearch'
import tabType from './tabType'
import queryConditions from './queryConditions'
import queryLists from './queryLists'

const list = combineReducers({
  quickSearch,
  tabType,
  queryConditions,
  queryLists,
})

export default list
