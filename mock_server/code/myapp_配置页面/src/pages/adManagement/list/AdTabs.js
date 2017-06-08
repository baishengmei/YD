import React, { Component, PropTypes } from 'react';
import s from './AdManagementList.css';
import Tabs from '../../../components/Tabs';

class AdTabs extends Component {
  static propTypes = {
    tabItems: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    activeTabKey: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { activeTabKey, tabItems } = this.props;
    return activeTabKey !== nextProps.activeTabKey
      || tabItems.length !== nextProps.tabItems.length;
  }

  render() {
    const {
      activeTabKey,
      tabItems,
      onTabChange
    } = this.props;

    return (
      <Tabs
        containerStyle={{ float: 'left' }}
        tabsClassName={s.navTabs}
        tabClassName={s.tab}
        tabItems={tabItems}
        tabSpacing={48}
        fontSize={14}
        activeTabClassName={s.active}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      />
    );
  }
}

export default AdTabs;
