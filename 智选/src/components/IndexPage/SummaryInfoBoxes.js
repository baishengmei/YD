import React, { PropTypes, Component } from 'react';
import IndexPageStyles from './IndexPage.css';
import SectionHeader from '../SectionHeader';
import SectionHeaderStyle from '../SectionHeader.css';
import Paper from 'material-ui/Paper';
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline';
import getSubComponent from '../getSubComponent';
import SummaryAccountInfo from './SummaryAccountInfo';
import SummaryConsumptionInfo from './SummaryConsumptionInfo';
import SummaryStatisticsInfo from './SummaryStatisticsInfo';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('IndexPage-SubComponents');

// 帐号情况组件
class SummaryInfoBoxes extends Component {
  constructor(...args) {
    super(...args);
  }

  shouldComponentUpdate(nextProps) {
    const {
      accountBalance,
      accountStatus,
      yesterdayConsumption,
      todayConsumption,
      totalDailyBudget,
      pending,
      traffickingIn,
      pause,
      invalid,
      total
    } = this.props;

    return accountBalance !== nextProps.accountBalance
      || accountStatus !== nextProps.accountStatus
      || yesterdayConsumption !== nextProps.yesterdayConsumption
      || todayConsumption !== nextProps.todayConsumption
      || totalDailyBudget !== nextProps.totalDailyBudget
      || pending !== nextProps.pending
      || traffickingIn !== nextProps.traffickingIn
      || pause !== nextProps.pause
      || invalid !== nextProps.invalid
      || total !== nextProps.total;
  }

  getAccountInfo() {
    return getSubComponent(this, SummaryAccountInfo);
  }

  getConsumptionInfo() {
    return getSubComponent(this, SummaryConsumptionInfo);
  }

  getStatisticsInfo() {
    return getSubComponent(this, SummaryStatisticsInfo);
  }

  render() {

    myDebug('SummaryInfoBoxes render')

    return (
      <div className={IndexPageStyles.summary}>
        <SectionHeader
          avatar={<SocialPersonOutline style={{color: '#fff'}}/>}
          avatarClassName={SectionHeaderStyle.iconBlue}
          title="帐号情况"/>
        <div className={IndexPageStyles.summaryDetail}>
          {this.getAccountInfo()}
          {this.getConsumptionInfo()}
          {this.getStatisticsInfo()}
        </div>
      </div>
    );
  }
}

SummaryInfoBoxes.propTypes = {
  ...SummaryAccountInfo.propTypes,
  ...SummaryConsumptionInfo.propTypes,
  ...SummaryStatisticsInfo.propTypes
};

export default SummaryInfoBoxes;
