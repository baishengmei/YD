/* eslint-disable no-shadow, react/prop-types */
import React, { PropTypes, Component } from 'react';
import { Switch, Input, Icon } from 'antd';
import s from './AdManagementList.css';
import { AdStates, AdTabTypes, AdDeliveryObjectList } from '../../../constants/MenuTypes';
import { formatNumber, getAdLevelFromAdTabType } from '../../../core/utils';
import Link from '../../../components/Link';

const getLink = (type = 'edit', adCampaignId, adGroupId, adContentId) => {
  const isEdit = type === 'edit';
  if (typeof adContentId !== 'undefined') {
    return `/adManagement/adCampaign/${adCampaignId}/adGroup/${adGroupId}/adContent/${adContentId}/edit`;
  } else if (typeof adGroupId !== 'undefined') {
    return `/adManagement/adCampaign/${adCampaignId}/adGroup/${adGroupId}/${isEdit ? 'edit' : 'adContent'}`;
  } else if (typeof adCampaignId !== 'undefined') {
    return `/adManagement/adCampaign/${adCampaignId}/${isEdit ? 'edit' : 'adGroup'}`;
  }
  return '';
};

const {
  sponsorAdCampaign,
  sponsorAdGroup,
  sponsorAdContent,
} = AdTabTypes;

class EditableCell extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['link', 'number']).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    link: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    link: ''
  };

  state = {
    value: this.props.value,
    editable: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { editable, value } = this.state;
    return value !== nextState.value
      || editable !== nextState.editable;
  }

  onEdit = () => {
    this.setState({
      editable: true
    });
  }

  onInputCancel = () => {
    this.setState({
      value: this.props.value,
      editable: false
    });
  }

  onInputChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  onCheckInput = () => {
    this.setState({
      editable: false
    });
    if (this.state.value !== this.props.value) {
      this.props.onChange(this.state.value);
    }
  }

  render() {
    const { type, link } = this.props;
    const { editable, value } = this.state;
    const isNumber = type === 'number';

    return (
      <div className={s['editable-cell']}>
        {editable
          ?
            <div className={s['editable-cell-input-wrapper']}>
              <Input
                type={isNumber ? 'text' : 'textarea'}
                autosize={{ maxRows: 6 }}
                value={isNumber && value < 0 ? '' : value}
                onChange={this.onInputChange}
                onPressEnter={this.onCheckInput}
              />
              <Icon
                type='check'
                className={s['editable-cell-icon-check']}
                onClick={this.onCheckInput}
              />
              <Icon
                type='close'
                className={s['editable-cell-icon-close']}
                onClick={this.onInputCancel}
              />
            </div>
          :
            <div
              className={s['editable-cell-text-wrapper']}
              style={{
                ...(isNumber ? {
                  lineHeight: '28px',
                  height: 28,
                } : {})
              }}
            >
              {
                !isNumber // eslint-disable-line no-nested-ternary
                  ? <Link to={link}>{value}</Link>
                  : (value < 0 ? '不限' : formatNumber(value))
              }
              <Icon
                type='edit'
                className={s['editable-cell-icon']}
                onClick={this.onEdit}
              />
            </div>
        }
      </div>
    );
  }
}

const TableColumns = {
  switchBtn: {
    title: '开关',
    key: 'switch',
    className: s.switchBtn,
    render: (type, onChange) => (record) => {
      const level = getAdLevelFromAdTabType(type);
      return (
        <Switch
          size='small'
          disabled={record.switch === 'disable'}
          checked={record.switch === 'on'}
          onChange={checked => onChange(
            type,
            record[level].id,
            checked,
          )}
        />
      );
    },
  },
  adCampaignName: {
    editable: {
      title: '推广系列',
      key: 'adCampaignName',
      className: s.adCampaignName,
      render: onChange => ({ adCampaign }) => (
        <EditableCell
          type='link'
          value={adCampaign.name}
          link={getLink('list', adCampaign.id)}
          onChange={value => onChange(adCampaign.id, value)}
        />
      )
    },
    noEditable: {
      title: '推广系列',
      key: 'adCampaignName',
      className: s.adCampaignName,
      render: ({ adCampaign }) => (
        <Link to={getLink('list', adCampaign.id)}>{adCampaign.name}</Link>
      )
    },
  },
  adCampaign: {
    operation: {
      title: '操作',
      dataIndex: 'adCampaign',
      key: 'operation',
      className: s.operation,
      render: item => (
        <span>
          <Link to={getLink('edit', item.id)}>编辑</Link>
          <span className='ant-divider' />
          <a>复制</a>
        </span>
      )
    },
    status: {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      className: s.status,
      render: (value) => {
        const status = AdStates[sponsorAdCampaign].find(it => it.value === value);
        return status ? status.name : value;
      },
    },
  },
  adGroupName: {
    editable: {
      title: '推广组',
      key: 'adGroupName',
      className: s.adGroupName,
      render: onChange => ({ adCampaign, adGroup }) => (
        <EditableCell
          type='link'
          value={adGroup.name}
          link={getLink('list', adCampaign.id, adGroup.id)}
          onChange={value => onChange(adGroup.id, value)}
        />
      )
    },
    noEditable: {
      title: '推广组',
      key: 'adGroupName',
      className: s.adGroupName,
      render: ({ adCampaign, adGroup }) => (
        <Link to={getLink('list', adCampaign.id, adGroup.id)}>{adGroup.name}</Link>
      )
    },
  },
  adGroup: {
    operation: {
      title: '操作',
      key: 'operation',
      className: s.operation,
      render: ({ adCampaign, adGroup }) => (
        <span>
          <Link to={getLink('edit', adCampaign.id, adGroup.id)}>编辑</Link>
          <span className='ant-divider' />
          <a>复制</a>
        </span>
      )
    },
    status: {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      className: s.status,
      render: (value) => {
        const status = AdStates[sponsorAdGroup].find(it => it.value === value);
        return status ? status.name : value;
      },
    },
  },
  adContentName: {
    title: '创意',
    key: 'adContentName',
    className: s.adContentName,
    render: onChange => ({ adCampaign, adGroup, adContent }) => (
      <EditableCell
        type='link'
        value={adContent.name}
        link={getLink('list', adCampaign.id, adGroup.id, adContent.id)}
        onChange={value => onChange(adContent.id, value)}
      />
    )
  },
  adContent: {
    operation: {
      title: '操作',
      key: 'operation',
      className: s.operation,
      render: ({ adCampaign, adGroup, adContent }) => (
        <span>
          <Link to={getLink('edit', adCampaign.id, adGroup.id, adContent.id)}>编辑</Link>
          <span className='ant-divider' />
          <a>复制</a>
        </span>
      )
    },
    status: {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      className: s.status,
      render: (value) => {
        const status = AdStates[sponsorAdContent].find(it => it.value === value);
        return status ? status.name : value;
      },
    },
  },
  price: {
    title: '出价',
    dataIndex: 'price',
    key: 'price',
    className: s.price,
    render: item => (
      <span>
        <p>{formatNumber(item.value)}</p>
        <p>{item.type.toUpperCase()}</p>
      </span>
    ),
  },
  object: {
    title: '推广标的',
    dataIndex: 'object',
    key: 'object',
    className: s.object,
    render: (value) => {
      const object = AdDeliveryObjectList.find(it => it.value === value);
      return object ? object.name : '';
    },
  },
  budget: {
    title: '预算',
    key: 'budget',
    className: s.budget,
    render: (type, onChange) => (record) => {
      const level = getAdLevelFromAdTabType(type);
      return (
        <EditableCell
          type='number'
          value={record.budget}
          onChange={value => onChange(
            type,
            record[level].id,
            value
          )}
        />
      );
    },
  },
  consumption: {
    title: '消费',
    dataIndex: 'consumption',
    key: 'consumption',
    className: s.consumption,
    render: formatNumber,
    sorter: (a, b) => a.consumption - b.consumption,
  },
  impressions: {
    title: '展示数',
    dataIndex: 'impressions',
    key: 'impressions',
    className: s.impressions,
    render: formatNumber,
    sorter: (a, b) => a.impressions - b.impressions,
  },
  clickNum: {
    title: '点击数',
    dataIndex: 'clickNum',
    key: 'clickNum',
    className: s.clickNum,
    render: formatNumber,
    sorter: (a, b) => a.clickNum - b.clickNum,
  },
  clickRate: {
    title: '点击率',
    dataIndex: 'clickRate',
    key: 'clickRate',
    className: s.clickRate,
    render: formatNumber,
    sorter: (a, b) => a.clickRate - b.clickRate,
  },
  cpc: {
    title: '平均点击单价',
    dataIndex: 'cpc',
    key: 'cpc',
    className: s.cpc,
    render: formatNumber,
    sorter: (a, b) => a.cpc - b.cpc,
  },
  conversion: {
    title: '转化数',
    dataIndex: 'conversion',
    key: 'conversion',
    className: s.conversion,
    render: formatNumber,
  },
  conversionRate: {
    title: '转化率',
    dataIndex: 'conversionRate',
    key: 'conversionRate',
    className: s.conversionRate,
    render: val => `${val}%`,
  }
};

export default TableColumns;
