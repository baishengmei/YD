import React, { Component, PropTypes } from 'react';
import s from './DataStatistics.css';
import Tabs from '../../../components/Tabs';
import { DateRangeItems } from '../../../constants/MenuTypes';

const tabPadding = {
  left: 4,
  right: 4,
};

class DateRangeTabs extends Component {
  static propTypes = {
    activeRangeIndex: PropTypes.number.isRequired,
    onDateRangeChange: PropTypes.func.isRequired
  };

  state = {
    selectedRangeIndex: this.props.activeRangeIndex
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedRangeIndex: nextProps.activeRangeIndex
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.selectedRangeIndex !== nextState.selectedRangeIndex;
  }

  onTabChange = (tabItem, index) => {
    const { selectedRangeIndex } = this.state;
    if (selectedRangeIndex !== index) {
      this.state.selectedRangeIndex = index;
      this.props.onDateRangeChange(index);
    }
  }

  render() {
    const { selectedRangeIndex: index } = this.state;
    const activeTabKey = DateRangeItems[index].key;

    return (
      <Tabs
        containerClassName={s.dateRangeContainer}
        tabsClassName={s.rangeTabs}
        tabClassName={s.range}
        tabItems={DateRangeItems}
        tabSpacing={40}
        tabPadding={tabPadding}
        fontSize={14}
        activeTabClassName={s.active}
        activeTabKey={activeTabKey}
        onTabChange={this.onTabChange}
      />
    );
  }
}

export default DateRangeTabs;
