import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const getShortcut = () => {
  const today = moment();
  const yesterday = moment().subtract(1, 'day');

  const ranges = {
    今天: [today, today],
    昨天: [yesterday, yesterday],
    过去7天: [moment().subtract(7, 'days'), yesterday],
    过去30天: [moment().subtract(30, 'days'), yesterday],
    本月: [moment().startOf('month'), today],
    上个月: [moment().startOf('month').subtract(1, 'month'), moment().endOf('month').subtract(1, 'month')],
  };
  return ranges;
};
const disabledDate = current => current && current.valueOf() > Date.now();
const dateFormat = 'YYYY-MM-DD';
const placeholder = ['开始日期', '结束日期'];
const pickerStyle = {
  float: 'right',
  marginTop: 14,
};

class QueryDateRangePicker extends Component {
  static propTypes = {
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    onDateRangeChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      startDate,
      endDate,
      onDateRangeChange,
    } = this.props;

    return (
      <RangePicker
        value={[startDate, endDate]}
        format={dateFormat}
        placeholder={placeholder}
        style={pickerStyle}
        disabledDate={disabledDate}
        ranges={getShortcut()}
        onChange={onDateRangeChange}
      />
    );
  }
}

export default QueryDateRangePicker;
