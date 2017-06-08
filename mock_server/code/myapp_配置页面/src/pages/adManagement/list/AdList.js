import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';
import s from './AdManagementList.css';
import { AdTabTypes, AdPageSizeOptions } from '../../../constants/MenuTypes';
import TableColumns from './TableColumns';
import { getAdLevelFromAdTabType } from '../../../core/utils';

const {
  sponsorAdCampaign,
  sponsorAdGroup,
  sponsorAdContent,
  adCampaignAdGroup,
  adCampaignAdContent,
  adGroupAdContent,
} = AdTabTypes;

const getColumns = (
  type,
  onSwitchChange,
  onAdCampaignNameChange,
  onAdGroupNameChange,
  onAdContentNameChange,
  onBudgetChange,
) => {
  switch (type) {
    case sponsorAdCampaign:
      return [
        {
          ...TableColumns.switchBtn,
          render: TableColumns.switchBtn.render(type, onSwitchChange),
        },
        {
          ...TableColumns.adCampaignName.editable,
          render: TableColumns.adCampaignName.editable.render(onAdCampaignNameChange),
        },
        TableColumns.adCampaign.operation,
        TableColumns.adCampaign.status,
        TableColumns.object,
        {
          ...TableColumns.budget,
          render: TableColumns.budget.render(type, onBudgetChange),
        },
        TableColumns.consumption,
        TableColumns.impressions,
        TableColumns.clickNum,
        TableColumns.clickRate,
        TableColumns.cpc,
        TableColumns.conversion,
        TableColumns.conversionRate
      ];
    case sponsorAdGroup:
    case adCampaignAdGroup:
      return [
        {
          ...TableColumns.switchBtn,
          render: TableColumns.switchBtn.render(type, onSwitchChange),
        },
        {
          ...TableColumns.adGroupName.editable,
          render: TableColumns.adGroupName.editable.render(onAdGroupNameChange),
        },
        TableColumns.adCampaignName.noEditable,
        TableColumns.adGroup.operation,
        TableColumns.adGroup.status,
        TableColumns.price,
        {
          ...TableColumns.budget,
          render: TableColumns.budget.render(type, onBudgetChange),
        },
        TableColumns.consumption,
        TableColumns.impressions,
        TableColumns.clickNum,
        TableColumns.clickRate,
        TableColumns.cpc,
        TableColumns.conversion,
        TableColumns.conversionRate
      ];
    case sponsorAdContent:
    case adCampaignAdContent:
    case adGroupAdContent:
      return [
        {
          ...TableColumns.switchBtn,
          render: TableColumns.switchBtn.render(type, onSwitchChange),
        },
        {
          ...TableColumns.adContentName,
          render: TableColumns.adContentName.render(onAdContentNameChange),
        },
        TableColumns.adGroupName.noEditable,
        TableColumns.adCampaignName.noEditable,
        TableColumns.adContent.operation,
        TableColumns.adContent.status,
        TableColumns.consumption,
        TableColumns.impressions,
        TableColumns.clickNum,
        TableColumns.clickRate,
        TableColumns.cpc,
        TableColumns.conversion,
        TableColumns.conversionRate
      ];
    default:
      return [];
  }
};

const getTableData = (data, tabType) => data.map((d) => {
  const level = getAdLevelFromAdTabType(tabType);
  return {
    ...d,
    key: d[level].id,
  };
});

const adListShape = PropTypes.shape({
  status: PropTypes.oneOf(['initial', 'loading', 'success', 'fail']).isRequired,
  total: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
});

class AdList extends Component {
  static propTypes = {
    tabType: PropTypes.oneOf(Object.keys(AdTabTypes)).isRequired,
    loading: PropTypes.bool.isRequired,
    data: adListShape.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageNo: PropTypes.number.isRequired,
    onRowSelectionChange: PropTypes.func.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    onPageNoChange: PropTypes.func.isRequired,
    onSwitchChange: PropTypes.func.isRequired,
    onAdCampaignNameChange: PropTypes.func.isRequired,
    onAdGroupNameChange: PropTypes.func.isRequired,
    onAdContentNameChange: PropTypes.func.isRequired,
    onBudgetChange: PropTypes.func.isRequired,
  };

  constructor(args) {
    super(args);
    const {
      loading,
      tabType,
      data,
      pageSize,
      pageNo,
      onSwitchChange,
      onAdCampaignNameChange,
      onAdGroupNameChange,
      onAdContentNameChange,
      onBudgetChange,
    } = this.props;
    this.state = {
      loading,
      columns: getColumns(
        tabType,
        onSwitchChange,
        onAdCampaignNameChange,
        onAdGroupNameChange,
        onAdContentNameChange,
        onBudgetChange
      ),
      xScroll: 1200,
      list: getTableData(data.list, tabType),
      total: data.total,
      pageSize,
      pageNo,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      loading,
      tabType,
      data,
      pageSize,
      pageNo,
      onSwitchChange,
      onAdCampaignNameChange,
      onAdGroupNameChange,
      onAdContentNameChange,
      onBudgetChange,
    } = nextProps;
    const newState = {
      loading,
      total: data.total,
      pageSize,
      pageNo,
    };
    if (tabType !== this.props.tabType) {
      newState.columns = getColumns(
        tabType,
        onSwitchChange,
        onAdCampaignNameChange,
        onAdGroupNameChange,
        onAdContentNameChange,
        onBudgetChange
      );
    }
    if (data !== this.props.data) {
      newState.list = getTableData(data.list, tabType);
    }
    this.setState(newState);
  }

  render() {
    const {
      onRowSelectionChange,
      onPageSizeChange,
      onPageNoChange,
    } = this.props;
    const {
      loading,
      columns,
      xScroll,
      list,
      total,
      pageSize,
      pageNo,
    } = this.state;

    return (
      <section className={s.list}>
        <Table
          rowSelection={{
            onChange: onRowSelectionChange
          }}
          columns={columns}
          dataSource={list}
          bordered
          loading={loading}
          scroll={{ x: xScroll }}
          pagination={{
            size: 'small',
            current: pageNo,
            pageSize,
            showSizeChanger: true,
            pageSizeOptions: AdPageSizeOptions,
            total,
            onChange: onPageNoChange,
            onShowSizeChange: onPageSizeChange,
          }}
        />
      </section>
    );
  }
}

export {
  AdList as default,
  adListShape,
};
