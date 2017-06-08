/* eslint-disable semi */

/**
 * set runtime variables
 */
export const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';

/**
 * login actions
 */
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

/**
 * logout actions
 */
export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'

/**
 * four kinds of messages
 */
export const ALERT_MESSAGE = 'ALERT_MESSAGE'
export const INFO_MESSAGE = 'INFO_MESSAGE'
export const WARN_MESSAGE = 'WARN_MESSAGE'
export const ERROR_MESSAGE = 'ERROR_MESSAGE'

/**
 * eight kinds of message actions
 */
export const SHOW_ALERT_MESSAGE = 'SHOW_ALERT_MESSAGE'
export const SHOW_INFO_MESSAGE = 'SHOW_INFO_MESSAGE'
export const SHOW_WARN_MESSAGE = 'SHOW_WARN_MESSAGE'
export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE'
export const RESET_MESSAGE = 'RESET_MESSAGE'

export const HOME_MENU_CHANGE = 'HOME_MENU_CHANGE'

export const HOME_FETCH_ALL_DATA = 'HOME_FETCH_ALL_DATA'
export const HOME_FETCH_ALL_SUCCESS = 'HOME_FETCH_ALL_SUCCESS'
export const HOME_FETCH_ALL_FAIL = 'HOME_FETCH_ALL_FAIL'

// export const HOME_FETCH_SUMMARY_DATA = 'HOME_FETCH_SUMMARY_DATA'
// export const HOME_FETCH_SUMMARY_SUCCESS = 'HOME_FETCH_SUMMARY_SUCCESS'
// export const HOME_FETCH_SUMMARY_FAIL = 'HOME_FETCH_SUMMARY_FAIL'

export const HOME_FETCH_DETAIL_DATA = 'HOME_FETCH_DETAIL_DATA'
export const HOME_FETCH_DETAIL_SUCCESS = 'HOME_FETCH_DETAIL_SUCCESS'
export const HOME_FETCH_DETAIL_FAIL = 'HOME_FETCH_DETAIL_FAIL'

/**
 * use to send home data request to nodejs
 */
export const HOME_FETCH_SUMMARY_DATA_FOR_FE = 'HOME_FETCH_SUMMARY_DATA_FOR_FE'
export const HOME_FETCH_DETAIL_DATA_FOR_FE = 'HOME_FETCH_DETAIL_DATA_FOR_FE'

/**
 * update sponsor dailyBudget
 */
export const UPDATE_SPONSOR_BUDGET = 'UPDATE_SPONSOR_BUDGET'
export const UPDATE_SPONSOR_BUDGET_SUCCESS = 'UPDATE_SPONSOR_BUDGET_SUCCESS'
export const UPDATE_SPONSOR_BUDGET_FAIL = 'UPDATE_SPONSOR_BUDGET_FAIL'

/**
 * ad management fetch finance and budget data
 */
export const FETCH_FINANCE_AND_BUDGET = 'FETCH_FINANCE_AND_BUDGET';
export const FETCH_FINANCE_AND_BUDGET_SUCCESS = 'FETCH_FINANCE_AND_BUDGET_SUCCESS';
export const FETCH_FINANCE_AND_BUDGET_FAIL = 'FETCH_FINANCE_AND_BUDGET_FAIL';

/**
 * ad management fetch quick search list
 */
export const FETCH_QUICKSEARCH_LIST = 'FETCH_QUICKSEARCH_LIST';
export const FETCH_QUICKSEARCH_LIST_SUCCESS = 'FETCH_QUICKSEARCH_LIST_SUCCESS';
export const FETCH_QUICKSEARCH_LIST_FAIL = 'FETCH_QUICKSEARCH_LIST_FAIL';

/**
 * ad management list query menu change
 * @param {String} type 取值 dateRange, selectedStatus, selectedObject, keyword, pageSize, pageNo
 * @param {Object} dateRange
 * @param {Object} selectedStatus
 * @param {Object} selectedObject
 * @param {String} keyword
 * @param {Number} pageSize
 * @param {Number} pageNo
 */
export const ADLIST_QUERY_CONDITION_CHANGE = 'ADLIST_QUERY_CONDITION_CHANGE';
export const RESET_ADLIST_QUERY_CONDITION = 'RESET_ADLIST_QUERY_CONDITION';

/**
 * fetch adcampaign list in ad management
 */
export const FETCH_ADCAMPAIGN_LIST = 'FETCH_ADCAMPAIGN_LIST';
export const FETCH_ADCAMPAIGN_LIST_SUCCESS = 'FETCH_ADCAMPAIGN_LIST_SUCCESS';
export const FETCH_ADCAMPAIGN_LIST_FAIL = 'FETCH_ADCAMPAIGN_LIST_FAIL';

/**
 * fetch adgroup list in ad management
 */
export const FETCH_ADGROUP_LIST = 'FETCH_ADGROUP_LIST';
export const FETCH_ADGROUP_LIST_SUCCESS = 'FETCH_ADGROUP_LIST_SUCCESS';
export const FETCH_ADGROUP_LIST_FAIL = 'FETCH_ADGROUP_LIST_FAIL';

/**
 * fetch adcontent list in ad management
 */
export const FETCH_ADCONTENT_LIST = 'FETCH_ADCONTENT_LIST';
export const FETCH_ADCONTENT_LIST_SUCCESS = 'FETCH_ADCONTENT_LIST_SUCCESS';
export const FETCH_ADCONTENT_LIST_FAIL = 'FETCH_ADCONTENT_LIST_FAIL';

/**
 * use to send admanagement query request to nodejs
 */
export const FETCH_ADCAMPAIGN_LIST_FOR_FE = 'FETCH_ADCAMPAIGN_LIST_FOR_FE';
export const FETCH_ADGROUP_LIST_FOR_FE = 'FETCH_ADGROUP_LIST_FOR_FE';
export const FETCH_ADCONTENT_LIST_FOR_FE = 'FETCH_ADCONTENT_LIST_FOR_FE';

/**
 * adcampaign multiple operation
 * @param {String} type 取值 open, pause, delete
 */
export const ADCAMPAIGN_MULTIPLE_OPERATION = 'ADCAMPAIGN_MULTIPLE_OPERATION';
export const ADCAMPAIGN_MULTIPLE_OPERATION_SUCCESS = 'ADCAMPAIGN_MULTIPLE_OPERATION_SUCCESS';
export const ADCAMPAIGN_MULTIPLE_OPERATION_FAIL = 'ADCAMPAIGN_MULTIPLE_OPERATION_FAIL';

/**
 * adgroup multiple operation
 * @param {String} type 取值 open, pause, delete
 */
export const ADGROUP_MULTIPLE_OPERATION = 'ADGROUP_MULTIPLE_OPERATION';
export const ADGROUP_MULTIPLE_OPERATION_SUCCESS = 'ADGROUP_MULTIPLE_OPERATION_SUCCESS';
export const ADGROUP_MULTIPLE_OPERATION_FAIL = 'ADGROUP_MULTIPLE_OPERATION_FAIL';

/**
 * adcontent multiple operation
 * @param {String} type 取值 open, pause, delete
 */
export const ADCONTENT_MULTIPLE_OPERATION = 'ADCONTENT_MULTIPLE_OPERATION';
export const ADCONTENT_MULTIPLE_OPERATION_SUCCESS = 'ADCONTENT_MULTIPLE_OPERATION_SUCCESS';
export const ADCONTENT_MULTIPLE_OPERATION_FAIL = 'ADCONTENT_MULTIPLE_OPERATION_FAIL';

/**
 * used to send admanagement multiple operation request to nodejs
 */
export const ADCAMPAIGN_MULTIPLE_OPERATION_FOR_FE = 'ADCAMPAIGN_MULTIPLE_OPERATION_FOR_FE';
export const ADGROUP_MULTIPLE_OPERATION_FOR_FE = 'ADGROUP_MULTIPLE_OPERATION_FOR_FE';
export const ADCONTENT_MULTIPLE_OPERATION_FOR_FE = 'ADCONTENT_MULTIPLE_OPERATION_FOR_FE';

/**
 * new ad campaign/group/content input item value change event
 */
export const NEW_ADCAMPAIGN_ITEM_CHANGE = 'NEW_ADCAMPAIGN_ITEM_CHANGE';
export const NEW_ADGROUP_ITEM_CHANGE = 'NEW_ADGROUP_ITEM_CHANGE';
export const NEW_ADCONTENT_ITEM_CHANGE = 'NEW_ADCONTENT_ITEM_CHANGE';

/**
 * new ad campaign fetch region list data
 */
export const FETCH_REGION_LIST = 'FETCH_REGION_LIST';
export const FETCH_REGION_LIST_SUCCESS = 'FETCH_REGION_LIST_SUCCESS';
export const FETCH_REGION_LIST_FAIL = 'FETCH_REGION_LIST_FAIL';

/**
 * create ad campaign
 */
export const CREATE_ADCAMPAIGN = 'CREATE_ADCAMPAIGN';
export const CREATE_ADCAMPAIGN_SUCCESS = 'CREATE_ADCAMPAIGN_SUCCESS';
export const CREATE_ADCAMPAIGN_FAIL = 'CREATE_ADCAMPAIGN_FAIL';
