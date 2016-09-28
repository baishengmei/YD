import React, { PropTypes, Component } from 'react';
import SummaryStyles from './SummaryStyles';
import SectionHeader from '../SectionHeader';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { orangeBtn } from '../variables';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('IndexPage-SubComponents');

// 账户信息组件
class SummaryAccountInfo extends Component {
  constructor(...args) {
    super(...args);
  }

  shouldComponentUpdate(nextProps) {
    const {
      isFetchingSummary,
      accountBalance,
      accountStatus
    } = this.props;

    return isFetchingSummary !== nextProps.isFetchingSummary
      || accountBalance !== nextProps.accountBalance
      || accountStatus !== nextProps.accountStatus;
  }

  render() {

    myDebug('SummaryAccountInfo render')

    const { accountBalance, accountStatus } = this.props;

    return (
      <Paper
        key={0}
        style={SummaryStyles.root}>
        <SectionHeader
          style={SummaryStyles.header}
          avatar={<img src={require('../../images/account.png')} />}
          title="账户信息"/>
        <div style={SummaryStyles.info}>
          <div style={SummaryStyles.infoLine}>
            <label>账户余额</label>
            <span style={SummaryStyles.infoLineSpan}>{accountBalance} 元</span>
          </div>
          <div style={SummaryStyles.infoLine}>
            <label>账户状态</label>
            <span style={SummaryStyles.infoLineSpan}>{accountStatus}</span>
          </div>
        </div>
        <div style={SummaryStyles.charge}>
          <RaisedButton
            label='充 值'
            labelColor={orangeBtn.color}
            backgroundColor={orangeBtn.bgColor}
            borderColor={orangeBtn.borderColor}
            style={{
              ...SummaryStyles.chargeBtn,
              border: `1px solid ${orangeBtn.borderColor}`
            }} />
        </div>
      </Paper>
    );
  }
}

SummaryAccountInfo.propTypes = {
  isFetchingSummary: PropTypes.bool.isRequired,
  accountBalance: PropTypes.number.isRequired,
  accountStatus: PropTypes.string.isRequired
};

export default SummaryAccountInfo;
