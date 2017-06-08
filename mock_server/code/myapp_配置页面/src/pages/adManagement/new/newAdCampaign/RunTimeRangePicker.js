import React, { Component, PropTypes } from 'react';
import { Table, Button, Icon } from 'antd';
import s from './index.css';
import {
  classnames,
  updateComponentStateByKeys,
  componentUpdateByState,
} from '../../../../core/utils';

// for timeslot viewer
const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

// replace by this.onTimeslotCellClick
// to simplify the process of handling timeslot click event
let onTimeslotClick = () => 1;

// timeslot column common render
const renderTimeSlot = colIndex => (recordStr, row, rowIndex) => (
  <div
    className={classnames({
      [s.timeslot]: true,
      [s.selected]: recordStr[colIndex] === '0',
    })}
    onClick={() => {
      onTimeslotClick(rowIndex, colIndex);
    }}
  />
);

// for timeslot table
const tableSubHeaderMap = [{
  title: '凌晨',
  children: [0, 1, 2, 3, 4, 5],
}, {
  title: '上午',
  children: [6, 7, 8, 9, 10, 11],
}, {
  title: '下午',
  children: [12, 13, 14, 15, 16, 17],
}, {
  title: '晚上',
  children: [18, 19, 20, 21, 22, 23],
}];

const runTimeRangeValuesTableColumns = [
  {
    title: '星期 \\ 时间',
    key: 'week',
    colSpan: 2,
    dataIndex: 'recordStr',
    width: 48,
    render: (recordStr, record, index) => {
      const obj = {
        children: index < 5 ? '工作日' : '周末',
        props: {},
      };
      switch (index) {
        case 0:
          obj.props.rowSpan = 5;
          break;
        case 5:
          obj.props.rowSpan = 2;
          break;
        default:
          obj.props.rowSpan = 0;
      }
      return obj;
    },
  }, {
    title: '时间',
    key: 'day',
    dataIndex: 'recordStr',
    colSpan: 0,
    width: 56,
    render: (recordStr, record, index) => weekDays[index],
  },
  ...tableSubHeaderMap.map(sh => ({
    title: sh.title,
    key: sh.title,
    children: sh.children.map((n, index) => ({
      title: `${n}`,
      key: `${n}`,
      width: index === 0 || index === 5 ? 30 : 26,
      className: classnames({
        [s.column]: true,
        [s['column-group-edge-left']]: index === 0,
        [s['column-group-edge-right']]: index === 5,
      }),
      dataIndex: 'recordStr',
      render: renderTimeSlot(n),
    })),
  })),
];

// for timeslot viewer
function getSelectedTimeSlot(runTimeRangeValues) {
  const pad2 = t => (t >= 10 ? t : `0${t}`);
  return runTimeRangeValues.map((ts) => {
    let st = 0;
    const timeblock = ts.split(/1+/)
      .filter(t => t.length > 0)
      .map((t) => {
        const start = ts.indexOf(t, st);
        const end = start + t.length - 1; // eslint-disable-line no-mixed-operators
        st = end + 1;
        return `${pad2(start)}:00～${pad2(end)}:59`;
      });
    return timeblock.length > 0 ? timeblock : ['不投放'];
  });
}

// convert runTimeRangeValues data to table's record format
function getTimeSlotTableData(runTimeRangeValues) {
  return runTimeRangeValues.map((ts, index) => ({
    key: `${index}`,
    recordStr: ts,
  }));
}

const checkRunTimeRangeValuesValidity = runTimeRangeValues =>
  runTimeRangeValues
  && runTimeRangeValues.length === 7
  && runTimeRangeValues.some(ts => ts.includes('0'));


class RunTimeRangePicker extends Component {
  static propTypes = {
    runTimeRangeValues: PropTypes.array.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    runTimeRangeValuesValid: PropTypes.bool.isRequired,
  };

  constructor(...args) {
    super(...args);
    const stateKeys = [
      'runTimeRangeValues',
      'runTimeRangeValuesValid',
    ];
    this.state = {};
    stateKeys.forEach((key) => {
      this.state[key] = this.props[key];
    });
    this.getAdaptedTimeSlotData(this.props.runTimeRangeValues);

    const componentWillReceiveProps = updateComponentStateByKeys(stateKeys);
    this.componentWillReceiveProps = (nextProps) => {
      const { runTimeRangeValues } = nextProps;
      if (runTimeRangeValues !== this.state.runTimeRangeValues) {
        this.getAdaptedTimeSlotData(runTimeRangeValues);
      }
      componentWillReceiveProps.call(this, nextProps);
    };
    this.shouldComponentUpdate = componentUpdateByState;
    onTimeslotClick = this.onTimeslotCellClick;
  }

  onRunTimeRangeValueChange = (runTimeRangeValues) => {
    const runTimeRangeValuesValid = checkRunTimeRangeValuesValidity(runTimeRangeValues);
    this.getAdaptedTimeSlotData(runTimeRangeValues);

    // 此处直接修改引用数据内部的值，redux state 直接得到更新，不需要触发 action。
    // 这个做法虽然违反了 redux 的设计理念，但是可以减少渲染次数。
    // 问题来了，redux devtools 中的 state 显示没更新, 猜测应该是遇到 action
    // 后才会更新 state 的显示，实际已经更新啦，此时可以点击 redux devtools 扩展
    // 图标重新加载即可看到 state 的变化。
    this.setState({
      runTimeRangeValues,
      runTimeRangeValuesValid,
    });
    this.forceUpdate();
  }

  onTimeslotCellClick = (rowIndex, colIndex) => {
    const trs = this.state.runTimeRangeValues;
    trs[rowIndex] = ((str) => {
      const c = parseInt(str[colIndex], 10);
      // eslint-disable-next-line no-bitwise
      return `${str.slice(0, colIndex)}${c ^ 1}${str.slice(colIndex + 1)}`;
    })(trs[rowIndex]);
    this.onRunTimeRangeValueChange(trs);
  }

  onResetTimeRange = () => {
    const tr = this.state.runTimeRangeValues;
    for (let i = 0; i < tr.length; i += 1) {
      tr[i] = '0'.repeat(24);
    }
    this.onRunTimeRangeValueChange(tr);
  }

  getAdaptedTimeSlotData(runTimeRangeValues) {
    this.timeSlotTableData = getTimeSlotTableData(runTimeRangeValues);
    this.selectedTimeSlotByDay = getSelectedTimeSlot(runTimeRangeValues);
  }

  render() {
    return (
      <section>
        <div className={s['timeslot-table-wrapper']}>
          <Table
            columns={runTimeRangeValuesTableColumns}
            dataSource={this.timeSlotTableData}
            bordered
            size='small'
            pagination={false}
          />
        </div>
        <div className={s['timeslot-hint-area']}>
          <div>
            <div className={s['timeslot-viewer__title']}>
            已选时间
            </div>
            <ul
              className={classnames({
                [s['timeslot-viewer__content']]: true,
                [s.error]: !this.state.runTimeRangeValuesValid,
              })}
            >
              {this.selectedTimeSlotByDay.map((timeslot, index) =>
                <li
                  key={`k-${index}`} // eslint-disable-line react/no-array-index-key
                  className={s['content-item']}
                >
                  <div className={s.item__title}>{weekDays[index]}</div>
                  <div className={s.item__list}>
                    {timeslot.map(ts =>
                      <span key={ts} className={s['list-item']}>{ts}</span>
                    )}
                  </div>
                </li>
              )}
            </ul>
            <div className={s['control-bar-cell']}>
              <div className={s['control-bar']}>
                <Button onClick={this.onResetTimeRange}>
                  <Icon type='reload' /> 重新设置
                </Button>
                <div>
                  <div
                    className={classnames({
                      [s.timeslot]: true,
                      [s.selected]: true,
                      [s.noClick]: true,
                    })}
                  />
                  &nbsp;&nbsp;投放时间段
                </div>
                <div>
                  <div
                    className={classnames({
                      [s.timeslot]: true,
                      [s.noClick]: true,
                    })}
                  />
                  &nbsp;&nbsp;不投放时间段
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export {
  RunTimeRangePicker as default,
  checkRunTimeRangeValuesValidity
};
