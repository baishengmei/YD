import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Select, Checkbox } from 'antd';
import withViewport from '../../../../core/withViewport';
import {
  screenMdMin,
  screenLgMin,
  paddingLrLg,
  minContentWidth
} from '../../../../components/variables';
import s from './StatisticsGraph.css';
import BiLineChart from './BiLineChart';

const Option = Select.Option;
const vsIndicator = [{
  name: '展示数',
  value: 'impressions'
}, {
  name: '点击数',
  value: 'clickNum'
}, {
  name: '点击率',
  value: 'clickRate'
}, {
  name: '点击单价',
  value: 'cpc'
}, {
  name: '消费',
  value: 'consumption'
}];

const numberTickFormatter = (val) => {
  if (val >= 1000) {
    return `${Math.round(val / 10) / 100}k`;
  }
  return val;
};

const percentTickFormatter = val => `${val}%`;

const getProperTickFormatter = x => x && x === 'clickRate' ? percentTickFormatter : numberTickFormatter;

class StatisticsGraph extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    viewport: PropTypes.object.isRequired,
  };

  state = {
    vs: true,
    selectValues: ['impressions', 'clickRate'],
    selectLabels: [vsIndicator[0].name, vsIndicator[2].name],
    data: this.props.data,
    width: this.props.viewport.width,
  };

  componentWillReceiveProps(nextProps) {
    const {
      data,
      viewport: {
        width
      }
    } = nextProps;

    this.setState({
      data,
      width: width > screenMdMin ? width : screenMdMin
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      vs,
      selectValues,
      data,
      width
    } = this.state;

    const {
      vs: nVs,
      selectValues: nSelectValues,
      data: nData,
      width: nWidth
    } = nextState;

    return vs !== nVs
      || selectValues !== nSelectValues
      || data !== nData
      || width !== nWidth;
  }

  getController() {
    const {
      vs,
      selectValues,
    } = this.state;

    return (
      <div className={s.controller}>
        <Select
          className={s.select}
          defaultValue={selectValues[0]}
          onChange={this.selectChangeHandler(0)}
        >
          {vsIndicator.map(item => (
            <Option
              key={item.value}
              value={item.value}
            >
              {item.name}
            </Option>
          ))}
        </Select>
        <div className={s.vsLabel}>
          <span>对比 </span>
          <Checkbox
            checked={vs}
            onChange={this.vsChangeHandler}
          />
        </div>
        <Select
          className={s.select}
          defaultValue={selectValues[1]}
          onChange={this.selectChangeHandler(1)}
        >
          {vsIndicator.map(item => (
            <Option
              key={item.value}
              value={item.value}
            >
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
    );
  }

  vsChangeHandler = (evt) => {
    this.setState({
      vs: evt.target.checked
    });
  }

  selectChangeHandler = index => (value) => {
    const {
      selectValues: preValues,
      selectLabels: preLabels
    } = this.state;
    const selectValues = [...preValues];
    const selectLabels = [...preLabels];

    selectValues[index] = value;
    selectLabels[index] = vsIndicator[vsIndicator.findIndex(x => x.value === value)].name;

    this.setState({
      selectValues,
      selectLabels,
    });
  };

  render() {
    const {
      vs,
      selectValues,
      selectLabels,
      data,
      width,
    } = this.state;
    // eslint-disable-next-line no-mixed-operators
    const chartWidth = width > screenLgMin ? (width - paddingLrLg * 2) : minContentWidth;

    return (
      <section className={s.container}>
        { this.getController() }
        <BiLineChart
          lineType='linear'
          data={data}
          xKey='x'
          yKeys={vs ? selectValues : [selectValues[0]]}
          yLabels={vs ? selectLabels : [selectLabels[0]]}
          tickFormatters={{
            left: getProperTickFormatter(selectValues[0]),
            right: vs ? getProperTickFormatter(selectValues[1]) : null,
          }}
          width={chartWidth - 32 * 2} // eslint-disable-line no-mixed-operators
          height={300}
        />
      </section>
    );
  }

}

export default withStyles(s)(withViewport(StatisticsGraph));
