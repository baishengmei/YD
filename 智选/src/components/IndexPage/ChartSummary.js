import React, { PropTypes, Component } from 'react';
import rootStyles from './IndexPage.css';
import SummaryStyles from './SummaryStyles';
import SectionHeader from '../SectionHeader';
import Paper from 'material-ui/Paper';
import { formatInterger, getDebugger } from '../../core/utils';

const myDebug = getDebugger('IndexPage-SubComponents');

// 整体数据中的 summary
class ChartSummary extends Component {
  constructor(...args) {
    super(...args);
  }

  shouldComponentUpdate(nextProps) {
    const { show, click, clickRate, consumption } = this.props;
    return show !== nextProps.show
      || click !== nextProps.click
      || clickRate !== nextProps.clickRate
      || consumption !== nextProps.consumption;
  }

  render() {

    myDebug('ChartSummary render');

    let style = this.style;
    const {
      show,
      click,
      clickRate,
      consumption
    } = this.props;

    const summaryMap = [
      {
        name: '展示',
        value: formatInterger(show)
      },
      {
        name: '点击',
        value: formatInterger(click)
      },
      {
        name: '点击率',
        value: Math.round(clickRate * 100) / 100 + '%'
      },
      {
        name: '消费',
        value: formatInterger(consumption)
      }
    ];

    return (
      <div className={rootStyles.chartSummary}>
      {
        summaryMap.map( (info, index) => (
          <Paper
            key={index}
            zDepth={0}
            style={SummaryStyles.detailSummary}>
            <label style={SummaryStyles.title}>{info.name}</label>
            <span style={SummaryStyles.desc}>{info.value}</span>
          </Paper>
        ))
      }
      </div>
    );

  }
}

ChartSummary.propTypes = {
  isFetchingDetail: PropTypes.bool.isRequired,
  show: PropTypes.number.isRequired,
  click: PropTypes.number.isRequired,
  clickRate: PropTypes.number.isRequired,
  consumption: PropTypes.number.isRequired
};


export default ChartSummary;
