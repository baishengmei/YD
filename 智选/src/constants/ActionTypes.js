/**
 * login actions
 */
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

/**
 * 登录成功后跳转到首页
 */
export const LOGIN_TO_HOME = 'LOGIN_TO_HOME'

/**
 * logout actions
 */
export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'

/**
 * 登出成功后跳转到登录页
 */
export const LOGOUT_TO_LOGIN = 'LOGOUT_TO_LOGIN'

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

/**
 * index page menu action's types
 */
export const INDEX_PAGE_MENU_CHANGE = 'INDEX_PAGE_MENU_CHANGE'

/**
 * index page fetch data actions' types
 */
export const INDEX_PAGE_FETCH_ALL_DATA = 'INDEX_PAGE_FETCH_ALL_DATA'
export const INDEX_PAGE_FETCH_ALL_SUCCESS = 'INDEX_PAGE_FETCH_ALL_SUCCESS'
export const INDEX_PAGE_FETCH_ALL_FAIL = 'INDEX_PAGE_FETCH_ALL_FAIL'

export const INDEX_PAGE_FETCH_DETAIL_DATA = 'INDEX_PAGE_FETCH_DETAIL_DATA'
export const INDEX_PAGE_FETCH_DETAIL_SUCCESS = 'INDEX_PAGE_FETCH_DETAIL_SUCCESS'
export const INDEX_PAGE_FETCH_DETAIL_FAIL = 'INDEX_PAGE_FETCH_DETAIL_FAIL'

/**
 * index page budget actions' types
 */
export const UPDATE_TOTAL_DAILY_BUDGET = 'UPDATE_TOTAL_DAILY_BUDGET'

export const SAVE_TOTAL_DAILY_BUDGET = 'SAVE_TOTAL_DAILY_BUDGET'

export const SAVE_TOTAL_DAILY_BUDGET_SUCCESS = 'SAVE_TOTAL_DAILY_BUDGET_SUCCESS'
export const SAVE_TOTAL_DAILY_BUDGET_FAIL = 'SAVE_TOTAL_DAILY_BUDGET_FAIL'

/**
 * header notification actions' types
 */
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
export const MARK_NOTIFICATION_READ = 'MARK_NOTIFICATION_READ'
export const MARK_NOTIFICATION_READ_SUCCESS = 'MARK_NOTIFICATION_READ_SUCCESS'
export const MARK_NOTIFICATION_READ_FAIL = 'MARK_NOTIFICATION_READ_FAIL'