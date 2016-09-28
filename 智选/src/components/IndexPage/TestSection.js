import React, { Component } from 'react';
import SectionHeader from '../SectionHeader';
import SummaryStyles from './SummaryStyles';
import IndexPageStyles from './IndexPage.css';
import TestSectionStyles from './TestSection.css';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import BudgetPopover from '../../containers/IndexPageBudget';


class TestSection extends Component {
  constructor(...args) {
    super(...args);

    this.tooltip = this.getToolTip();
  }

  getToolTip() {
    return (
      <div>
        <span>您可以在此设置每日预算总额。</span><br/>
        <span>(1) 在未做设置前，默认设置每日预算总额为 10,000,000.00 元/天；</span><br/>
        <span>(2) 系统生效会有15分钟左右的延迟，所以可能会出现您当天消费总<br/>金额超过您预算总值的情况，敬请谅解；</span><br/>
        <span>(3) 如果您修改的金额小于您当日已产生的消费额，广告会很快下线；</span><br/>
        <span>(4) 最终取值为所有推广系列预算和与总预算之间的最小值。</span>
      </div>
    );
  }

  render(){
    return (
      <div className={IndexPageStyles.summary}>
        <div className={IndexPageStyles.summaryDetail}>
          <Paper style={SummaryStyles.root}>
            <SectionHeader
              style={SummaryStyles.header}
              avatar={<img src={require('../../images/consumption.png')} />}
              title="Test消费状态" />
            <div style={SummaryStyles.info}>
              <div style={SummaryStyles.infoLine}>
                <label>昨日消费</label>
                <span style={SummaryStyles.infoLineSpan}>12111122 元</span>
              </div>
              <div style={SummaryStyles.infoLine}>
                <label>今日消费</label>
                <span style={SummaryStyles.infoLineSpan}>3000 元</span>
              </div>
              <div style={SummaryStyles.infoLine}>
                每日预算总额
                <IconButton
                  tooltip={this.tooltip}
                  tooltipStyles={SummaryStyles.tooltipStyle}
                  tooltipPosition="top-right"
                  style={SummaryStyles.iconButton}
                  iconStyle={SummaryStyles.tooltipIcon}>
                  <ActionInfoOutline />
                </IconButton>
              </div>
              <BudgetPopover />
            </div>

            {/*<h2>sldjfjfjfjfjfjfjfjfjfjfjfjfjfjfsldjfjfjfjfjfjfjfjfjfjfjfjfjfjf</h2>*/}
          </Paper>
        </div>
      </div>
    )
  }
}
export default TestSection;
