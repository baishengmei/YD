import React, { Component, PropTypes } from 'react';
import { Radio } from 'antd';
import s from '../NewAd.css';
import RegionPicker from './RegionPicker';
import {
  NewAdCampaignSettingItems,
  NewAdCampaignItems,
} from '../../../../constants/MenuTypes';
import {
  updateComponentStateByKeys,
  componentUpdateByState,
} from '../../../../core/utils';

const regionItems = NewAdCampaignItems.region.map(item =>
  <Radio className={s.radio} key={item.value} value={item.value}>
    {item.name}
  </Radio>
);

const regionShape = PropTypes.shape({
  type: PropTypes.oneOf([
    NewAdCampaignItems.region[0].value,
    NewAdCampaignItems.region[1].value,
  ]).isRequired,
  value: PropTypes.array,
});

/* eslint-disable react/no-unused-prop-types */
class TimeSetting extends Component {
  static propTypes = {
    showError: PropTypes.bool.isRequired,
    regionList: PropTypes.object.isRequired,
    region: regionShape.isRequired,
    onRegionChange: PropTypes.func.isRequired,
    fetchRegionList: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);
    const stateKeys = [
      'showError',
      'regionList',
      'region',
    ];
    this.state = {};
    stateKeys.forEach((key) => {
      this.state[key] = this.props[key];
    });

    this.componentWillReceiveProps = updateComponentStateByKeys(stateKeys);
    this.shouldComponentUpdate = componentUpdateByState;
  }

  onRegionTypeChange = (e) => {
    const type = e.target.value;
    const isCustom = type === NewAdCampaignItems.region[1].value;
    const region = {
      type: e.target.value,
    };
    if (isCustom) {
      region.value = [];
    }
    this.setState({
      region,
      regionValid: true,
    }, () => {
      this.props.onRegionChange(region);
    });
  }

  render() {
    const {
      showError,
      regionList,
      region,
    } = this.state;
    const isCustomRegion = region.type === NewAdCampaignItems.region[1].value;

    return (
      <div className={s.setting}>
        <div className={s.setting__title}>{NewAdCampaignSettingItems[2].name}</div>
        <div className={s['setting-item']}>
          <div className={s['setting-item__name']}>
            地域设置
          </div>
          <div className={s['setting-item__value']}>
            <Radio.Group
              size='large'
              value={region.type}
              onChange={this.onRegionTypeChange}
            >
              {regionItems}
            </Radio.Group>
            {
              isCustomRegion &&
              <RegionPicker
                showError={showError}
                regionList={regionList}
                selectedRegion={region.value}
                fetchRegionList={this.props.fetchRegionList}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default TimeSetting;
