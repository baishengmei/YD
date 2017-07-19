import { combineReducers } from 'redux';
import auth from './auth';
import runtime from './runtime';
import account from './account';
import homeSummary from './home/summary';
import homeDetail from './home/detail';
import { homeMenu } from './menu';
import adManagement from './adManagement'

const home = combineReducers({
  summary: homeSummary,
  detail: homeDetail,
  menu: homeMenu
});

const rootReducer = combineReducers({
  runtime,
  auth,
  account,
  home,
  adManagement,
});

export default rootReducer;
