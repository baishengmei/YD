import React, { Component, PropTypes } from 'react';
import { Radio, Icon, Input } from 'antd';
import s from '../NewAd.css';
import s2 from './index.css';
import {
  AdDeliveryObjectList,
  NewAdCampaignSettingItems,
  NewAdCampaignItems,
} from '../../../../constants/MenuTypes';
import {
  classnames,
  updateComponentStateByKeys,
  componentUpdateByState,
} from '../../../../core/utils';

const objectItems = [
  <Radio.Button
    key={AdDeliveryObjectList[1].value}
    value={AdDeliveryObjectList[1].value}
  >
    <Icon type='global' /> &nbsp;{AdDeliveryObjectList[1].name}
  </Radio.Button>,
  <Radio.Button
    key={AdDeliveryObjectList[2].value}
    value={AdDeliveryObjectList[2].value}
  >
    <Icon type='download' /> &nbsp;{AdDeliveryObjectList[2].name}
  </Radio.Button>
];

const budgetItems = NewAdCampaignItems.budget.map(item =>
  <Radio className={s.radio} key={item.value} value={item.value}>
    {item.name}
  </Radio>
);

const checkObjectValidity = value =>
  value === AdDeliveryObjectList[1].value
  || value === AdDeliveryObjectList[2].value;

const checkNameValidity = (name = '') => {
  const cname = name.trim();
  return cname.length > 0 && cname.length <= 25;
};

const checkBudgetValidity = (budget) => {
  if (budget.type === NewAdCampaignItems.budget[0].value) return true;
  const bv = budget.value;
  return !isNaN(bv) && bv >= 100 && bv <= 1e7;
};

/* eslint-disable react/no-unused-prop-types */
class BasicSetting extends Component {
  static propTypes = {
    showError: PropTypes.bool.isRequired,
    object: PropTypes.string.isRequired,
    adCampaignName: PropTypes.string.isRequired,
    budget: PropTypes.shape({
      type: PropTypes.oneOf([
        NewAdCampaignItems.budget[0].value,
        NewAdCampaignItems.budget[1].value,
      ]).isRequired,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    }).isRequired,
    clientType: PropTypes.oneOf([
      NewAdCampaignItems.clientType[0].value,
      NewAdCampaignItems.clientType[1].value,
    ]).isRequired,
    objectValid: PropTypes.bool.isRequired,
    nameValid: PropTypes.bool.isRequired,
    budgetValid: PropTypes.bool.isRequired,
    onObjectChange: PropTypes.func.isRequired,
    onAdCampaignNameChange: PropTypes.func.isRequired,
    onBudgetChange: PropTypes.func.isRequired,
    onClientTypeChange: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);
    const stateKeys = [
      'showError',
      'object',
      'adCampaignName',
      'budget',
      'clientType',
      'objectValid',
      'nameValid',
      'budgetValid',
    ];
    this.state = {};
    stateKeys.forEach((key) => {
      this.state[key] = this.props[key];
    });
    this.hasChooseObject = this.props.objectValid;
    this.hasFocusName = false;
    this.hasFocusBudget = false;
    this.componentWillReceiveProps = updateComponentStateByKeys(stateKeys);
    this.shouldComponentUpdate = componentUpdateByState;
  }

  onObjectChange = (e) => {
    const value = e.target.value;
    const isDownload = value === AdDeliveryObjectList[2].value;
    const nextState = {
      object: value,
      objectValid: checkObjectValidity(value),
    };
    if (isDownload) {
      nextState.clientType = NewAdCampaignItems.clientType[0].value;
    }
    this.setState(nextState, () => {
      this.hasChooseObject = true;
      this.props.onObjectChange(value);
    });
  }

  onAdCampaignNameChange = (e) => {
    const adCampaignName = e.target.value;
    this.setState({
      adCampaignName,
      nameValid: checkNameValidity(adCampaignName),
    }, () => {
      this.props.onAdCampaignNameChange(adCampaignName);
    });
  }

  onAdCampaignNameFocus = () => {
    this.hasFocusName = true;
  }

  onBudgetTypeChange = (e) => {
    const type = e.target.value;
    const emptyInput = type === NewAdCampaignItems.budget[0].value;
    const budget = {
      type,
      value: emptyInput ? undefined : this.state.budget.value,
    };
    this.setState({
      budget,
      budgetValid: checkBudgetValidity(budget),
    }, () => {
      if (emptyInput) {
        this.hasFocusBudget = false;
      }
      this.props.onBudgetChange(budget);
    });
  }
  onBudgetValueChange = (e) => {
    const budget = {
      type: this.state.budget.type,
      value: e.target.value,
    };
    this.setState({
      budget,
      budgetValid: checkBudgetValidity(budget),
    }, () => {
      this.props.onBudgetChange(budget);
    });
  }

  onBudgetValueFocus = () => {
    this.hasFocusBudget = true;
  }

  onClientTypeChange = (e) => {
    const clientType = e.target.value;
    this.setState({
      clientType,
    }, () => {
      this.props.onClientTypeChange(clientType);
    });
  }

  render() {
    const {
      showError,
      object,
      adCampaignName,
      budget: {
        type,
        value,
      },
      clientType,
      nameValid,
      budgetValid,
    } = this.state;
    const showNameError = !nameValid && (showError ? true : this.hasFocusName);
    const showBudgetError = !budgetValid && (showError ? true : this.hasFocusBudget);
    const isCustomBudget = type === NewAdCampaignItems.budget[1].value;

    return (
      <div className={s.setting}>
        <div className={s.setting__title}>{NewAdCampaignSettingItems[0].name}</div>
        <div className={s['setting-item']}>
          <div className={s['setting-item__name']}>
            推广标的
          </div>
          <div className={s['setting-item__value']}>
            <Radio.Group
              size='large'
              value={object}
              onChange={this.onObjectChange}
            >
              {objectItems}
            </Radio.Group>
          </div>
        </div>
        <div className={s['setting-item']}>
          <div className={s['setting-item__name']}>
            推广系列名称
          </div>
          <div className={s['setting-item__value']}>
            <Input
              className={classnames({
                [s.input]: true,
                [s2['adcampaign-name-input']]: true,
                [s.error]: showNameError,
              })}
              value={adCampaignName}
              onChange={this.onAdCampaignNameChange}
              onFocus={this.onAdCampaignNameFocus}
            />
            <div
              className={classnames({
                [s['input-hint']]: true,
                [s.error]: showNameError,
              })}
            >
            必填，最多 25 个字
            </div>
          </div>
        </div>
        <div className={s['setting-item']}>
          <div className={s['setting-item__name']}>
            预算设置
          </div>
          <div className={s['setting-item__value']}>
            <Radio.Group
              size='large'
              value={type}
              onChange={this.onBudgetTypeChange}
            >
              {budgetItems}
            </Radio.Group>
            {isCustomBudget &&
              <Input
                className={classnames({
                  [s.input]: true,
                  [s2.budget]: true,
                  [s.error]: showBudgetError,
                })}
                value={value}
                addonAfter='元/天'
                onChange={this.onBudgetValueChange}
                onFocus={this.onBudgetValueFocus}
              />
            }
            {isCustomBudget &&
              <div
                className={classnames({
                  [s['input-hint']]: true,
                  [s.error]: showBudgetError,
                })}
              >
              预算范围 100.00 ~ 10,000,000.00，最多精确到小数点后两位
              </div>
            }
          </div>
        </div>
        <div className={s['setting-item']}>
          <div className={s['setting-item__name']}>
            终端设置
          </div>
          <div className={s['setting-item__value']}>
            <Radio.Group
              size='large'
              value={clientType}
              onChange={this.onClientTypeChange}
            >
              {NewAdCampaignItems.clientType.map((item, index) =>
                <Radio
                  className={s.radio}
                  key={item.value}
                  value={item.value}
                  disabled={index > 0 && object === AdDeliveryObjectList[2].value}
                >
                  {item.name}
                </Radio>
              )}
            </Radio.Group>
          </div>
        </div>
      </div>
    );
  }
}

export {
  BasicSetting as default,
  checkObjectValidity,
  checkNameValidity,
  checkBudgetValidity,
};
