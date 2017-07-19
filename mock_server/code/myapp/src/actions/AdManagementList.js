import {
  FETCH_FINANCE_AND_BUDGET,
  FETCH_FINANCE_AND_BUDGET_SUCCESS,
  FETCH_FINANCE_AND_BUDGET_FAIL,

  UPDATE_SPONSOR_BUDGET,
  UPDATE_SPONSOR_BUDGET_SUCCESS,
  UPDATE_SPONSOR_BUDGET_FAIL,

  FETCH_QUICKSEARCH_LIST,
  FETCH_QUICKSEARCH_LIST_SUCCESS,
  FETCH_QUICKSEARCH_LIST_FAIL,

  ADLIST_QUERY_CONDITION_CHANGE,
  RESET_ADLIST_QUERY_CONDITION,

  FETCH_ADCAMPAIGN_LIST,
  FETCH_ADCAMPAIGN_LIST_SUCCESS,
  FETCH_ADCAMPAIGN_LIST_FAIL,

  FETCH_ADGROUP_LIST,
  FETCH_ADGROUP_LIST_SUCCESS,
  FETCH_ADGROUP_LIST_FAIL,

  FETCH_ADCONTENT_LIST,
  FETCH_ADCONTENT_LIST_SUCCESS,
  FETCH_ADCONTENT_LIST_FAIL,

  FETCH_ADCAMPAIGN_LIST_FOR_FE,
  FETCH_ADGROUP_LIST_FOR_FE,
  FETCH_ADCONTENT_LIST_FOR_FE,

  ADCAMPAIGN_MULTIPLE_OPERATION,
  ADCAMPAIGN_MULTIPLE_OPERATION_SUCCESS,
  ADCAMPAIGN_MULTIPLE_OPERATION_FAIL,

  ADGROUP_MULTIPLE_OPERATION,
  ADGROUP_MULTIPLE_OPERATION_SUCCESS,
  ADGROUP_MULTIPLE_OPERATION_FAIL,

  ADCONTENT_MULTIPLE_OPERATION,
  ADCONTENT_MULTIPLE_OPERATION_SUCCESS,
  ADCONTENT_MULTIPLE_OPERATION_FAIL,

  ADCAMPAIGN_MULTIPLE_OPERATION_FOR_FE,
  ADGROUP_MULTIPLE_OPERATION_FOR_FE,
  ADCONTENT_MULTIPLE_OPERATION_FOR_FE,

} from '../constants/ActionTypes'

export const fechFinanceBudget = () => ({
  types: [
    FETCH_FINANCE_AND_BUDGET,
    FETCH_FINANCE_AND_BUDGET_SUCCESS,
    FETCH_FINANCE_AND_BUDGET_FAIL,
  ],
  promise: http => http.get('/api/adManagement/getFinanceBudget')
})

export const updateSponsorBudget = dailyBudget => ({
  types: [
    UPDATE_SPONSOR_BUDGET,
    UPDATE_SPONSOR_BUDGET_SUCCESS,
    UPDATE_SPONSOR_BUDGET_FAIL,
  ],
  dailyBudget,
  promise: http => http.post('/api/adManagement/updateSponsorBudget', {
    data: { dailyBudget }
  })
})

export const fetchQuickSearchList = keyword => ({
  types: [
    FETCH_QUICKSEARCH_LIST,
    FETCH_QUICKSEARCH_LIST_SUCCESS,
    FETCH_QUICKSEARCH_LIST_FAIL,
  ],
  promise: http => http.get('/api/adManagement/quickSearchList', {
    query: { keyword }
  })
})

export const adListQueryConditionChange = (subType, payload) => ({
  type: ADLIST_QUERY_CONDITION_CHANGE,
  subType,
  payload,
})

export const resetAdListQueryCondition = () => ({
  type: RESET_ADLIST_QUERY_CONDITION,
})

const fetchAdList = (queryType, subType, actionTypes) => (dispatch, getState) => {
  const {
    adCampaignId,
    adGroupId,
    dateRange: {
      startDate,
      endDate,
    },
    selectedStatus,
    selectedObject,
    keyword,
    pageSize,
    pageNo,
  } = getState().adManagement.list.queryConditions[subType]

  const query = {
    type: queryType,
    startDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
    status: selectedStatus.value,
    object: selectedObject.value,
    keyword,
    pageSize,
    pageNo,
  }

  if (adCampaignId) {
    query.adCampaignId = adCampaignId
  }
  if (adGroupId) {
    query.adGroupId = adGroupId
  }

  return dispatch({
    types: actionTypes,
    subType,
    promise: http => http.get('/api/adManagement/queryAdEntityList', { query })
  })
}

export const fetchAdCampaignList = type => fetchAdList(
  FETCH_ADCAMPAIGN_LIST_FOR_FE,
  type,
  [
    FETCH_ADCAMPAIGN_LIST,
    FETCH_ADCAMPAIGN_LIST_SUCCESS,
    FETCH_ADCAMPAIGN_LIST_FAIL,
  ]
)

export const fetchAdGroupList = type => fetchAdList(
  FETCH_ADGROUP_LIST_FOR_FE,
  type,
  [
    FETCH_ADGROUP_LIST,
    FETCH_ADGROUP_LIST_SUCCESS,
    FETCH_ADGROUP_LIST_FAIL,
  ]
)

export const fetchAdContentList = type => fetchAdList(
  FETCH_ADCONTENT_LIST_FOR_FE,
  type,
  [
    FETCH_ADCONTENT_LIST,
    FETCH_ADCONTENT_LIST_SUCCESS,
    FETCH_ADCONTENT_LIST_FAIL,
  ]
)

const multipleOperation = (level, type, ids, actionTypes) => dispatch => dispatch({
  types: actionTypes,
  promise: http => http.post('/api/adManagement/multipleOperation', {
    data: {
      level,
      type,
      ids,
    }
  })
})

export const adCampaignMultipleOperation = (operationType, ids) => multipleOperation(
  ADCAMPAIGN_MULTIPLE_OPERATION_FOR_FE,
  operationType,
  ids,
  [
    ADCAMPAIGN_MULTIPLE_OPERATION,
    ADCAMPAIGN_MULTIPLE_OPERATION_SUCCESS,
    ADCAMPAIGN_MULTIPLE_OPERATION_FAIL,
  ]
)

export const adGroupMultipleOperation = (operationType, ids) => multipleOperation(
  ADGROUP_MULTIPLE_OPERATION_FOR_FE,
  operationType,
  ids,
  [
    ADGROUP_MULTIPLE_OPERATION,
    ADGROUP_MULTIPLE_OPERATION_SUCCESS,
    ADGROUP_MULTIPLE_OPERATION_FAIL,
  ]
)

export const adContentMultipleOperation = (operationType, ids) => multipleOperation(
  ADCONTENT_MULTIPLE_OPERATION_FOR_FE,
  operationType,
  ids,
  [
    ADCONTENT_MULTIPLE_OPERATION,
    ADCONTENT_MULTIPLE_OPERATION_SUCCESS,
    ADCONTENT_MULTIPLE_OPERATION_FAIL,
  ]
)
