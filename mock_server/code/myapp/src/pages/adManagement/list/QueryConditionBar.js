import React, { Component, PropTypes } from 'react';
import { Dropdown, Menu, Button, Select, Input, Icon } from 'antd';
import s from './AdManagementList.css';
import {
  AdTabTypes,
  AdStates,
  AdDeliveryObjectList,
  AdMultipleOperationItems,
} from '../../../constants/MenuTypes';

const Option = Select.Option;
const Search = Input.Search;

const {
  sponsorAdCampaign,
  sponsorAdGroup,
  sponsorAdContent,
  adCampaignAdGroup,
  adCampaignAdContent,
  adGroupAdContent,
} = AdTabTypes;
const BtnText = {
  [sponsorAdCampaign]: '新建推广系列',
  [sponsorAdGroup]: '新建推广组',
  [sponsorAdContent]: '新建创意',
  [adCampaignAdGroup]: '新建推广组',
  [adCampaignAdContent]: '新建创意',
  [adGroupAdContent]: '新建创意',
};

const selectStyle = {
  width: 110
};
const searchInputStyle = {
  width: 200,
  float: 'right'
};

class QueryConditionBar extends Component {
  static propTypes = {
    tabType: PropTypes.oneOf(Object.keys(AdTabTypes)).isRequired,
    selectedStatus: PropTypes.object.isRequired,
    selectedObject: PropTypes.object.isRequired,
    keyword: PropTypes.string.isRequired,
    onButtonClick: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onObjectChange: PropTypes.func.isRequired,
    onMultipleOperation: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);
    const {
      selectedStatus,
      selectedObject,
      keyword,
    } = this.props;
    this.state = {
      selectedStatus,
      selectedObject,
      keyword,
    };

    this.multipleOperationMenu = (
      <Menu selectedKeys={[]} onClick={this.handleMultipleOperationMenuClick}>
        {AdMultipleOperationItems.map(item => <Menu.Item key={item.value}>{item.name}</Menu.Item>)}
      </Menu>
    );
  }

  componentWillReceiveProps(nextProps) {
    const {
      selectedStatus,
      selectedObject,
      keyword,
    } = nextProps;
    this.setState({
      selectedStatus,
      selectedObject,
      keyword,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      selectedStatus,
      selectedObject,
      keyword,
    } = this.state;
    return this.props.tabType !== nextProps.tabType
      || selectedStatus !== nextState.selectedStatus
      || selectedObject !== nextState.selectedObject
      || keyword !== nextState.keyword;
  }

  onButtonClick = () => {
    const { onButtonClick, tabType } = this.props;
    onButtonClick(tabType);
  }

  // eslint-disable-next-line react/sort-comp
  handleMultipleOperationMenuClick = ({ key: value }) => {
    const newOperation = AdMultipleOperationItems.find(it => it.value === value);
    const { tabType, onMultipleOperation } = this.props;
    onMultipleOperation(tabType, newOperation);
  }

  onStatusChange = (value) => {
    const { tabType } = this.props;
    const newSelectedStatus = AdStates[tabType].find(it => it.value === value);
    this.setState({
      selectedStatus: newSelectedStatus,
    }, () => {
      this.props.onStatusChange(tabType, newSelectedStatus);
    });
  }

  onObjectChange = (value) => {
    const { tabType } = this.props;
    const newSelectedObject = AdDeliveryObjectList.find(it => it.value === value);
    this.setState({
      selectedObject: newSelectedObject,
    }, () => {
      this.props.onObjectChange(tabType, newSelectedObject);
    });
  }

  onSearchInputChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  }

  onSearch = (value) => {
    this.props.onSearch(this.props.tabType, value.replace(/^\s+|\s+$/g, ''));
  }

  render() {
    const { tabType } = this.props;
    const {
      selectedStatus,
      selectedObject,
      keyword,
    } = this.state;

    return (
      <div className={s.queryConditionBar}>
        <Button className={s.newBtn} onClick={this.onButtonClick}>{BtnText[tabType]}</Button>
        <div className={s.select}>
          <span className={s.label}>状态：</span>
          <Select
            value={selectedStatus.value}
            style={selectStyle}
            onChange={this.onStatusChange}
          >
            {AdStates[tabType].map(x => <Option key={x.value} value={x.value}>{x.name}</Option>)}
          </Select>
        </div>
        <div className={s.select}>
          <span className={s.label}>推广标的：</span>
          <Select
            value={selectedObject.value}
            style={selectStyle}
            onChange={this.onObjectChange}
          >
            {AdDeliveryObjectList.map(x => <Option key={x.value} value={x.value}>{x.name}</Option>)}
          </Select>
        </div>
        <div className={s.select}>
          <Dropdown
            trigger={['click']}
            overlay={this.multipleOperationMenu}
          >
            <Button>
              批量修改 <Icon type='down' />
            </Button>
          </Dropdown>
        </div>
        <Search
          value={keyword}
          placeholder='请输入查询关键词'
          style={searchInputStyle}
          onChange={this.onSearchInputChange}
          onSearch={this.onSearch}
        />
      </div>
    );
  }
}

export default QueryConditionBar;
