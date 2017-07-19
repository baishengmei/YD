import { connect } from 'react-redux'
import MainContent from '../pages/adManagement/list/MainContent'
import {
  adListQueryConditionChange,
  fetchAdCampaignList,
  fetchAdGroupList,
  fetchAdContentList,
  adCampaignMultipleOperation,
  adGroupMultipleOperation,
  adContentMultipleOperation,
} from '../actions/AdManagementList'
import { AdHierarchy } from '../constants/MenuTypes'
import { getAdParentLevelFromAdTabType, getAdListPathArr } from '../core/utils'

const { adCampaign, adGroup, adContent } = AdHierarchy

const memory = {
  adLevel: undefined,
  adCampaignId: undefined,
  adGroupId: undefined,
  pathArr: undefined,
};

const mapStateToProps = (state) => {
  const { tabType, quickSearch, queryConditions, queryLists } = state.adManagement.list
  const queryCondition = queryConditions[tabType]
  const { adCampaignId, adGroupId } = queryCondition
  const adLevel = getAdParentLevelFromAdTabType(tabType)

  let pathArr = memory.pathArr
  if (
    memory.adLevel !== adLevel
    || memory.adCampaignId !== adCampaignId
    || memory.adGroupId !== adGroupId
  ) {
    pathArr = getAdListPathArr(adLevel, adCampaignId, adGroupId)
    memory.pathArr = pathArr
    memory.adLevel = adLevel
    memory.adCampaignId = adCampaignId
    memory.adGroupId = adGroupId
  }

  return {
    tabType,
    pathArr,
    quickSearchListRoot: quickSearch.root,
    queryCondition,
    dataList: queryLists[tabType],
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAdCampaignList(type) {
    dispatch(fetchAdCampaignList(type))
  },
  fetchAdGroupList(type) {
    dispatch(fetchAdGroupList(type))
  },
  fetchAdContentList(type) {
    dispatch(fetchAdContentList(type))
  },
  onDateRangeChange(subType, ranges) {
    dispatch(adListQueryConditionChange(subType, {
      type: 'dateRange',
      dateRange: {
        startDate: ranges[0],
        endDate: ranges[1],
      }
    }))
  },
  onStatusChange(subType, selectedStatus) {
    dispatch(adListQueryConditionChange(subType, {
      type: 'selectedStatus',
      selectedStatus,
    }))
  },
  onObjectChange(subType, selectedObject) {
    dispatch(adListQueryConditionChange(subType, {
      type: 'selectedObject',
      selectedObject,
    }))
  },
  onKeywordChange(subType, keyword) {
    dispatch(adListQueryConditionChange(subType, {
      type: 'keyword',
      keyword,
    }))
  },
  onMultipleOperation(type, operation, ids) {
    let action;
    switch (type) {
      case adCampaign:
        action = adCampaignMultipleOperation;
        break;
      case adGroup:
        action = adGroupMultipleOperation;
        break;
      case adContent:
        action = adContentMultipleOperation;
        break;
      default:
    }
    if (action) {
      dispatch(action(operation.value, ids));
    }
  },
  onPageSizeChange(subType, pageSize, pageNo) {
    dispatch(adListQueryConditionChange(subType, {
      type: 'pageSize',
      pageSize,
      pageNo,
    }))
  },
  onPageNoChange(subType, pageNo) {
    dispatch(adListQueryConditionChange(subType, {
      type: 'pageNo',
      pageNo,
    }))
  },
  onSwitchChange(type, id, checked) {
    console.log(type, id, checked);
  },
  onAdCampaignNameChange(id, name) {
    console.log(id, name);
  },
  onAdGroupNameChange(id, name) {
    console.log(id, name);
  },
  onAdContentNameChange(id, name) {
    console.log(id, name);
  },
  onBudgetChange(type, id, budget) {
    console.log(type, id, budget);
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent)
