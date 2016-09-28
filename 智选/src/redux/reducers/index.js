import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import message from './message'
import notification from './notification'
import { indexPageMenu } from './menu'
import {
  summary,
  budget
} from './indexPageSummary'
import indexPageDetail from './indexPageDetail'

const indexPage = combineReducers({
  summary,
  budget,
  menu: indexPageMenu,
  detail: indexPageDetail
})

const rootReducer = combineReducers({
  auth,
  message, // 页面的提示信息
  notification, // header 部分的消息通知
  routing: routerReducer,
  indexPage
})

export default rootReducer
