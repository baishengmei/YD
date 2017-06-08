/* eslint-disable import/no-extraneous-dependencies */
import React, { Component, PropTypes } from 'react';
import Summary from './summary';
import DataStatistics from './data';

class Home extends Component {

  static propTypes = {
    summary: PropTypes.object.isRequired,
    detail: PropTypes.object.isRequired,
    activeRangeIndex: PropTypes.number.isRequired,
    onDateRangeChange: PropTypes.func.isRequired,
    onQueryAll: PropTypes.func.isRequired,
    onQueryDetail: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.onQueryAll();
  }

  dateRangeChangeHandler = (selectedRangeIndex) => {
    this.props.onDateRangeChange(selectedRangeIndex);
    this.props.onQueryDetail();
  };

  render() {
    const {
      summary: {
        account,
        ad,
      },
      detail: {
        summary,
        detail,
      },
      activeRangeIndex,
    } = this.props;

    return (
      <div className='home-wrapper'>
        <Summary
          ad={ad}
          account={account}
        />
        <DataStatistics
          summary={summary}
          detail={detail}
          activeRangeIndex={activeRangeIndex}
          onDateRangeChange={this.dateRangeChangeHandler}
        />
      </div>
    );
  }
}

export default Home;
