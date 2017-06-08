import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DataStatistics.css';
import DateRangeTabs from './DateRangeTabs';
import StatisticsSummary from './StatisticsSummary';
import StatisticsGraph from './statisticsGraph';

class DataStatistics extends Component {

  static propTypes = {
    summary: PropTypes.object.isRequired,
    detail: PropTypes.array.isRequired,
    activeRangeIndex: PropTypes.number.isRequired,
    onDateRangeChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      summary,
      detail,
      activeRangeIndex,
      onDateRangeChange,
    } = this.props;

    return (
      <section className={`${s.root} root`}>
        <div className={s.container}>
          <div className={s.title}>数据概览</div>
          <DateRangeTabs
            onDateRangeChange={onDateRangeChange}
            activeRangeIndex={activeRangeIndex}
          />
          <StatisticsSummary {...summary} />
          <StatisticsGraph
            data={detail}
          />
        </div>
      </section>
    );
  }
}

export default withStyles(s)(DataStatistics);
