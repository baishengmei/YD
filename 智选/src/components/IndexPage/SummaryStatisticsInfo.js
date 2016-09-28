import React, { PropTypes, Component } from 'react';
import SummaryStyles from './SummaryStyles';
import SectionHeader from '../SectionHeader';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('IndexPage-SubComponents');

// 广告统计组件
class SummaryStatisticsInfo extends Component {
  constructor(...args) {
    super(...args);
  }

  shouldComponentUpdate(nextProps) {
    const {
      isFetchingSummary,
      pending,
      traffickingIn,
      pause,
      invalid,
      total
    } = this.props;
    return isFetchingSummary !== nextProps.isFetchingSummary
      || pending !== nextProps.pending
      || traffickingIn !== nextProps.traffickingIn
      || pause !== nextProps.pause
      || invalid !== nextProps.invalid
      || total !== nextProps.total;
  }

  render() {

    myDebug('SummaryStatisticsInfo render')

    const {
      isFetchingSummary,
      pending,
      traffickingIn,
      pause,
      invalid,
      total
    } = this.props;

    // 广告统计数据
    const infoMap = [
      {
        name: '待审核',
        value: pending
      },
      {
        name: '投放中',
        value: traffickingIn
      },
      {
        name: '暂停',
        value: pause
      },
      {
        name: '无效',
        value: invalid
      },
      {
        name: '全部',
        value: total
      }
    ];

    return (
      <Paper
        key={2}
        zDepth={0}
        style={SummaryStyles.root}>
        <SectionHeader
          style={SummaryStyles.header}
          avatar={<img src={require('../../images/statistics.png')} />}
          title={
            <div style={{display: 'inline-block'}}>
              广告统计
              <IconButton
                tooltip={
                  <div>
                    <span>定义：一套创意代表一条广告</span><br/>
                    <span>统计维度为“创意”</span>
                  </div>
                }
                tooltipStyles={SummaryStyles.tooltipStyle}
                tooltipPosition="top-right"
                style={SummaryStyles.iconButton}
                iconStyle={SummaryStyles.tooltipIcon}>
                <ActionInfoOutline />
              </IconButton>
            </div>
          }/>
        <div style={SummaryStyles.info}>
          <div style={SummaryStyles.infoLine}>
          {
            infoMap.map((info, index) => (
              <div style={SummaryStyles.infoCell} key={index}>
                <label>{info.name}</label>
                <span style={SummaryStyles.infoLineSpan}>{info.value}</span>
              </div>
            ))
          }
          </div>
        </div>
      </Paper>
    );
  }
}

SummaryStatisticsInfo.propTypes = {
  isFetchingSummary: PropTypes.bool.isRequired,
  pending: PropTypes.number.isRequired,
  traffickingIn: PropTypes.number.isRequired,
  pause: PropTypes.number.isRequired,
  invalid: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default SummaryStatisticsInfo;
