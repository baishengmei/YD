import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Radio, DatePicker } from 'antd';
import s from '../NewAd.css';
import RunTimeRangePicker, {
  checkRunTimeRangeValuesValidity,
} from './RunTimeRangePicker';
import {
  NewAdCampaignSettingItems,
  NewAdCampaignItems,
} from '../../../../constants/MenuTypes';
import {
  updateComponentStateByKeys,
  componentUpdateByState,
} from '../../../../core/utils';

const dateFormat = 'YYYY-MM-DD';

// for datepicker
function disableStartDateByEndDate(endDate) {
  return function disableStartDate(current) {
    if (!current) return false;
    const curDate = current.format(dateFormat);
    return curDate < moment().format(dateFormat)
      || (endDate ? curDate > endDate.format(dateFormat) : false);
  };
}

function disableEndDateByStartDate(startDate) {
  return function disableEndDate(current) {
    if (!current) return false;
    const curDate = current.format(dateFormat);
    return startDate
      ? curDate < startDate.format(dateFormat)
      : curDate < moment().format(dateFormat);
  };
}

// generate initial timeslot data
function getInitialTimeslotData() {
  return Array.from({ length: 7 }, () => '0'.repeat(24));
}

const startDateItems = NewAdCampaignItems.startDate.map(item =>
  <Radio className={s.radio} key={item.value} value={item.value}>
    {item.name}
  </Radio>
);

const endDateItems = NewAdCampaignItems.endDate.map(item =>
  <Radio className={s.radio} key={item.value} value={item.value}>
    {item.name}
  </Radio>
);

const runTimeRangeItems = NewAdCampaignItems.runTimeRange.map(item =>
  <Radio className={s.radio} key={item.value} value={item.value}>
    {item.name}
  </Radio>
);

const checkRunTimeRangeValidity = (runTimeRange) => {
  if (runTimeRange.type === NewAdCampaignItems.runTimeRange[0].value) return true;
  return !!runTimeRange.value && checkRunTimeRangeValuesValidity(runTimeRange.value);
};

// for propTypes definition
const startDateShape = PropTypes.shape({
  type: PropTypes.oneOf([
    NewAdCampaignItems.startDate[0].value,
    NewAdCampaignItems.startDate[1].value,
  ]).isRequired,
  value: PropTypes.instanceOf(moment),
});

const endDateShape = PropTypes.shape({
  type: PropTypes.oneOf([
    NewAdCampaignItems.endDate[0].value,
    NewAdCampaignItems.endDate[1].value,
  ]).isRequired,
  value: PropTypes.instanceOf(moment),
});

const runTimeRangeShape = PropTypes.shape({
  type: PropTypes.oneOf([
    NewAdCampaignItems.runTimeRange[0].value,
    NewAdCampaignItems.runTimeRange[1].value,
  ]).isRequired,
  value: PropTypes.array,
});

/* eslint-disable react/no-unused-prop-types */
class TimeSetting extends Component {
  static propTypes = {
    showError: PropTypes.bool.isRequired,
    startDate: startDateShape.isRequired,
    endDate: endDateShape.isRequired,
    runTimeRange: runTimeRangeShape.isRequired,
    runTimeRangeValid: PropTypes.bool.isRequired,
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
    onRunTimeRangeChange: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);
    const stateKeys = [
      'showError',
      'startDate',
      'endDate',
      'runTimeRange',
      'runTimeRangeValid',
    ];
    this.state = {};
    stateKeys.forEach((key) => {
      this.state[key] = this.props[key];
    });

    this.componentWillReceiveProps = updateComponentStateByKeys(stateKeys);
    this.shouldComponentUpdate = componentUpdateByState;
  }

  onStartDateTypeChange = (e) => {
    const type = e.target.value;
    const isCustom = type === NewAdCampaignItems.startDate[1].value;
    const nextState = {
      type,
      value: isCustom ? moment() : undefined,
    };
    this.setState(nextState, () => {
      this.props.onStartDateChange(nextState);
    });
  }
  onStartDateValueChange = (startDate) => {
    const nextState = {
      type: this.state.startDate.type,
      value: startDate,
    };
    this.setState(nextState, () => {
      this.props.onStartDateChange(nextState);
    });
  }

  onEndDateTypeChange = (e) => {
    const type = e.target.value;
    const isCustom = type === NewAdCampaignItems.endDate[1].value;
    const startDate = this.state.startDate.value;
    const nextState = {
      type,
      // eslint-disable-next-line no-mixed-operators
      value: isCustom ? (startDate && startDate || moment()) : undefined,
    };
    this.setState(nextState, () => {
      this.props.onEndDateChange(nextState);
    });
  }
  onEndDateValueChange = (endDate) => {
    const nextState = {
      type: this.state.endDate.type,
      value: endDate,
    };
    this.setState(nextState, () => {
      this.props.onEndDateChange(nextState);
    });
  }

  onRunTimeRangeTypeChange = (e) => {
    const type = e.target.value;
    const isCustom = type === NewAdCampaignItems.runTimeRange[1].value;
    const runTimeRange = {
      type: e.target.value,
    };
    if (isCustom) {
      runTimeRange.value = getInitialTimeslotData();
    }
    this.setState({
      runTimeRange,
      runTimeRangeValid: true,
    }, () => {
      this.props.onRunTimeRangeChange(runTimeRange);
    });
  }

  render() {
    const {
      startDate,
      endDate,
      runTimeRange,
      runTimeRangeValid,
    } = this.state;
    const isCustomStartDate = startDate.type === NewAdCampaignItems.startDate[1].value;
    const isCustomEndDate = endDate.type === NewAdCampaignItems.endDate[1].value;
    const isCustomRunTimeRange = runTimeRange.type === NewAdCampaignItems.runTimeRange[1].value;

    return (
      <div className={s.setting}>
        <div className={s.setting__title}>{NewAdCampaignSettingItems[1].name}</div>
        <div className={s['setting-item']}>
          <div className={s['setting-item__name']}>
            开始时间
          </div>
          <div className={s['setting-item__value']}>
            <Radio.Group
              size='large'
              value={startDate.type}
              onChange={this.onStartDateTypeChange}
            >
              {startDateItems}
            </Radio.Group>
            {isCustomStartDate &&
              <DatePicker
                value={startDate.value}
                format={dateFormat}
                allowClear={false}
                onChange={this.onStartDateValueChange}
                disabledDate={disableStartDateByEndDate(endDate.value)}
              />
            }
          </div>
        </div>
        <div className={s['setting-item']}>
          <div className={s['setting-item__name']}>
            结束时间
          </div>
          <div className={s['setting-item__value']}>
            <Radio.Group
              size='large'
              value={endDate.type}
              onChange={this.onEndDateTypeChange}
            >
              {endDateItems}
            </Radio.Group>
            {isCustomEndDate &&
              <DatePicker
                value={endDate.value}
                format={dateFormat}
                allowClear={false}
                onChange={this.onEndDateValueChange}
                disabledDate={disableEndDateByStartDate(startDate.value)}
              />
            }
          </div>
        </div>
        <div className={s['setting-item']}>
          <div className={s['setting-item__name']}>
            时间段设置
          </div>
          <div className={s['setting-item__value']}>
            <Radio.Group
              size='large'
              value={runTimeRange.type}
              onChange={this.onRunTimeRangeTypeChange}
            >
              {runTimeRangeItems}
            </Radio.Group>
            {
              isCustomRunTimeRange &&
              <RunTimeRangePicker
                runTimeRangeValues={runTimeRange.value}
                runTimeRangeValuesValid={runTimeRangeValid}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export {
  TimeSetting as default,
  checkRunTimeRangeValidity,
};
