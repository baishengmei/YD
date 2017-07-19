import React, { Component, PropTypes } from 'react';
import s from './AdManagementList.css';
import BreadCrumb from './BreadCrumb';
import AdTabs from './AdTabs';
import QueryDateRangePicker from './QueryDateRangePicker';
import QueryConditionBar from './QueryConditionBar';
import AdList, { adListShape } from './AdList';
import history from '../../../core/history';
import { AdTabItems, AdHierarchy, AdTabTypes } from '../../../constants/MenuTypes';
import { getAdParentLevelFromAdTabType } from '../../../core/utils';

const { adCampaign, adGroup, adContent } = AdHierarchy;
const {
  sponsorAdCampaign,
  sponsorAdGroup,
  sponsorAdContent,
  adCampaignAdGroup,
  adCampaignAdContent,
  adGroupAdContent,
} = AdTabTypes;

const getTabItems = (tabType) => {
  const level = getAdParentLevelFromAdTabType(tabType);
  return AdTabItems[level];
};

// eslint-disable-next-line eqeqeq
const getAdObjectFromId = (arr, id) => arr.find(c => c.id == id);
const getBreadCrumb = (adTreeRoot, pathArr) => {
  const ret = [{
    ...pathArr[0],
    name: '所有广告内容',
  }];
  let adCampaignObj;
  let adGroupObj;

  if (pathArr.length > 1) {
    adCampaignObj = getAdObjectFromId(adTreeRoot.children, pathArr[1].id);
    ret.push({
      ...pathArr[1],
      name: adCampaignObj ? adCampaignObj.name : pathArr[1].id,
    });
  }
  if (pathArr.length > 2) {
    adGroupObj = adCampaignObj && getAdObjectFromId(adCampaignObj.children, pathArr[2].id);
    ret.push({
      ...pathArr[2],
      name: adGroupObj ? adGroupObj.name : pathArr[2].id,
    });
  }
  return ret;
};

const singleQueryConditionShape = PropTypes.shape({
  dateRange: PropTypes.object.isRequired,
  selectedStatus: PropTypes.object.isRequired,
  selectedObject: PropTypes.object.isRequired,
  keyword: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageNo: PropTypes.number.isRequired,
});

class MainContent extends Component {
  static propTypes = {
    quickSearchListRoot: PropTypes.object.isRequired,
    queryCondition: singleQueryConditionShape.isRequired,
    dataList: adListShape.isRequired,
    tabType: PropTypes.oneOf(Object.keys(AdTabTypes)).isRequired,
    pathArr: PropTypes.array.isRequired,
    fetchAdCampaignList: PropTypes.func.isRequired,
    fetchAdGroupList: PropTypes.func.isRequired,
    fetchAdContentList: PropTypes.func.isRequired,
    onDateRangeChange: PropTypes.func.isRequired,
    onKeywordChange: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onObjectChange: PropTypes.func.isRequired,
    onMultipleOperation: PropTypes.func.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    onPageNoChange: PropTypes.func.isRequired,
    onSwitchChange: PropTypes.func.isRequired,
    onAdCampaignNameChange: PropTypes.func.isRequired,
    onAdGroupNameChange: PropTypes.func.isRequired,
    onAdContentNameChange: PropTypes.func.isRequired,
    onBudgetChange: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);
    const {
      tabType,
      quickSearchListRoot,
      queryCondition,
      dataList,
      pathArr,
    } = this.props;
    this.state = {
      quickSearchListRoot,
      queryCondition,
      dataList,
      tabItems: getTabItems(tabType),
      breadCrumb: getBreadCrumb(quickSearchListRoot, pathArr),
    };
    this.multipleOperationRowKeys = [];
  }

  componentDidMount() {
    this.onFetchList(this.props.tabType);
  }

  componentWillReceiveProps(nextProps) {
    const {
      tabType,
      quickSearchListRoot,
      queryCondition,
      dataList,
      pathArr,
    } = nextProps;
    const newState = {
      quickSearchListRoot,
      queryCondition,
      dataList,
    };

    if (tabType !== this.props.tabType) {
      newState.tabItems = getTabItems(tabType);
    }
    if (pathArr !== this.props.pathArr || quickSearchListRoot !== this.props.quickSearchListRoot) {
      newState.breadCrumb = getBreadCrumb(quickSearchListRoot, pathArr);
    }
    this.setState(newState);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      quickSearchListRoot,
      queryCondition,
      dataList,
    } = this.state;

    return queryCondition !== nextState.queryCondition
      || dataList !== nextState.dataList
      || quickSearchListRoot !== nextState.quickSearchListRoot;
  }

  componentDidUpdate() {
    const { status } = this.state.dataList;
    if (status === 'initial') {
      this.onFetchList(this.props.tabType);
    }
  }

  onDateRangeChange = (ranges) => {
    const { tabType } = this.props;
    this.props.onDateRangeChange(tabType, ranges);
    // this.onFetchList(tabType);
  }

  onStatusChange = (type, status) => {
    this.props.onStatusChange(type, status);
    // this.onFetchList(type);
  }

  onObjectChange = (type, object) => {
    this.props.onObjectChange(type, object);
    // this.onFetchList(type);
  }

  onMultipleOperation = (type, operation) => {
    if (this.multipleOperationRowKeys.length > 0) {
      this.props.onMultipleOperation(type, operation, this.multipleOperationRowKeys);
    }
  }

  onPageSizeChange = (PageNo, pageSize) => {
    const { tabType } = this.props;
    this.props.onPageSizeChange(tabType, pageSize, PageNo);
    // this.onFetchList(tabType);
  }

  onPageNoChange = (pageNo) => {
    const { tabType } = this.props;
    this.props.onPageNoChange(tabType, pageNo);
    // this.onFetchList(tabType);
  }

  onSearch = (type, keyword) => {
    this.props.onKeywordChange(type, keyword);
    // this.onFetchList(type);
  }

  onFetchList = (type) => {
    switch (type) {
      case sponsorAdCampaign:
        this.props.fetchAdCampaignList(type);
        break;
      case sponsorAdGroup:
      case adCampaignAdGroup:
        this.props.fetchAdGroupList(type);
        break;
      case sponsorAdContent:
      case adCampaignAdContent:
      case adGroupAdContent:
        this.props.fetchAdContentList(type);
        break;
      default:
    }
  }

  onTabChange = (tabItem) => {
    const path = window.location.pathname;
    const pathArr = path.split('/');
    let pathItem = pathArr.pop();
    while (pathItem.length === 0) {
      pathItem = pathArr.pop();
    }
    let addPath;
    switch (tabItem.key) {
      case sponsorAdCampaign:
        addPath = adCampaign;
        break;
      case sponsorAdGroup:
      case adCampaignAdGroup:
        addPath = adGroup;
        break;
      default:
        addPath = adContent;
    }
    pathArr.push(addPath);
    history.push(pathArr.join('/'));
  }

  onCreate = () => {
    const path = window.location.pathname;
    const pathArr = path.split('/');
    let pathItem = pathArr[pathArr.length - 1];
    while (pathItem.length === 0) {
      pathArr.pop();
      pathItem = pathArr[pathArr.length - 1];
    }
    pathArr.push('new');
    history.push(pathArr.join('/'));
  }

  onRowSelectionChange = (selectedRowKeys) => {
    this.multipleOperationRowKeys = selectedRowKeys;
  }

  render() {
    const {
      queryCondition,
      dataList,
      tabItems,
      breadCrumb,
    } = this.state;
    const {
      dateRange: {
        startDate,
        endDate,
      },
      selectedStatus,
      selectedObject,
      keyword,
      pageSize,
      pageNo,
    } = queryCondition;

    const {
      tabType,
      onSwitchChange,
      onAdCampaignNameChange,
      onAdGroupNameChange,
      onAdContentNameChange,
      onBudgetChange,
    } = this.props;

    return (
      <section className={s.contentContainer}>
        <BreadCrumb
          crumb={breadCrumb}
        />
        <div className={s.subNavBar}>
          <AdTabs
            tabItems={tabItems}
            activeTabKey={tabType}
            onTabChange={this.onTabChange}
          />
          <QueryDateRangePicker
            startDate={startDate}
            endDate={endDate}
            onDateRangeChange={this.onDateRangeChange}
          />
        </div>
        <QueryConditionBar
          tabType={tabType}
          selectedStatus={selectedStatus}
          selectedObject={selectedObject}
          keyword={keyword}
          onButtonClick={this.onCreate}
          onStatusChange={this.onStatusChange}
          onObjectChange={this.onObjectChange}
          onMultipleOperation={this.onMultipleOperation}
          onSearch={this.onSearch}
        />
        <AdList
          tabType={tabType}
          loading={dataList.status === 'loading'}
          data={dataList}
          onRowSelectionChange={this.onRowSelectionChange}
          pageSize={pageSize}
          pageNo={pageNo}
          onPageSizeChange={this.onPageSizeChange}
          onPageNoChange={this.onPageNoChange}
          onSwitchChange={onSwitchChange}
          onAdCampaignNameChange={onAdCampaignNameChange}
          onAdGroupNameChange={onAdGroupNameChange}
          onAdContentNameChange={onAdContentNameChange}
          onBudgetChange={onBudgetChange}
        />
      </section>
    );
  }
}

export default MainContent;
