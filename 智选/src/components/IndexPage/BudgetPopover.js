import React, { PropTypes, Component } from 'react';
import rootStyles from './IndexPage.css';
import SummaryStyles from './SummaryStyles';
import Popover from 'material-ui/Popover/Popover';
import PopoverAnimationVertical from 'material-ui/Popover/PopoverAnimationVertical';
import RaisedButton from 'material-ui/RaisedButton';
import {
  greenBtn,
  pinkBtn
} from '../variables';
import TextField from 'material-ui/TextField';
import BudgetText from './BudgetText';
import InputPopover from './InputPopover';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('IndexPage-BudgetPopover');

/**
 * Budget and Popover 组件
 */
class BudgetPopover extends Component {

  constructor(...args) {
    super(...args);
  }

  componentWillMount() {
    this.setState({
      openPopover: false,
      anchorEl: undefined,
      totalDailyBudget: typeof this.props.totalDailyBudget === 'undefined' ? '' : this.props.totalDailyBudget + ''
    });
  }

  componentWillReceiveProps(nextProps) {
    let openPopover = this.state.openPopover;
    if ( this.props.isSaving && !nextProps.isSaving ) {
      openPopover = false;
    }
    this.setState({
      openPopover: openPopover,
      totalDailyBudget: typeof nextProps.totalDailyBudget === 'undefined' ? '' : nextProps.totalDailyBudget + ''
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      isSaving,
      remainingEditTimes
    } = this.props;

    const {
      openPopover,
      totalDailyBudget
    } = this.state;

    return isSaving !== nextProps.isSaving
      || remainingEditTimes !== nextProps.remainingEditTimes
      || openPopover !== nextState.openPopover
      || totalDailyBudget !== nextState.totalDailyBudget;
  }

  render() {

    myDebug('BudgetPopover render')

    const {
      openPopover,
      anchorEl,
      totalDailyBudget
    } = this.state;

    const {
      isSaving,
      remainingEditTimes
    } = this.props;

    return (
      <div style={SummaryStyles.infoLine}>
        <BudgetText
          ref='budgetText'
          isSaving={isSaving}
          totalDailyBudget={totalDailyBudget}
          onBudgetFocus={this.handleBudgetFocus} />
        <InputPopover
          isSaving={isSaving}
          openPopover={openPopover}
          anchorEl={anchorEl}
          remainingEditTimes={remainingEditTimes}
          onConfirmTap={this.handleConfirmTap}
          onInputPopoverClose={this.handleInputPopoverClose} />
      </div>
    );
  }

  handleInputPopoverClose = () => {
    this.setState({
      openPopover: false
    })
  }

  handleBudgetFocus = (evt) => {
    this.setState({
      openPopover: true,
      anchorEl: evt.currentTarget
    })
  }

  handleConfirmTap = () => {
    if ( this.props.remainingEditTimes < 1 ) {
      this.props.sendErrorMessage('修改次数今日已达上限！');
      return;
    }
    let totalDailyBudget = this.refs.budgetText.getBudget();

    let valid = this.validateBudget(totalDailyBudget)
    if ( valid ) {
      this.state.totalDailyBudget = totalDailyBudget;
      this.props.saveTotalDailyBudget(totalDailyBudget - 0);
    } else {
      this.setState({
        openPopover: false
      });
    }
  }

  validateBudget(n) {
    const errorMap = {
      none: '请填写预算值',
      outOfRange: '预算数值不在允许范围内',
      notValidNumber: '输入不是合法数值',
    };
    let type = '';
    if ( n.length === 0 ) {
      type = 'none';
    } else if ( n.length < 2 || n.length > 11 ) {
      type = 'outOfRange';
    } else {
      let valid = /^[0-9]{2,8}(\.[0-9]{0,2})?$/.test(n);
      if ( !valid ) {
        type = 'notValidNumber';
      } else {
        n -= 0;
        if ( n < 50 || n > 1e7 ) {
          type = 'outOfRange'
        }
      }
    }

    if ( type ) {
      this.props.sendErrorMessage(errorMap[type]);
      return false;
    }
    return true;
  }
}

BudgetPopover.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  totalDailyBudget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  remainingEditTimes: PropTypes.number.isRequired,
  sendErrorMessage: PropTypes.func.isRequired,
  saveTotalDailyBudget: PropTypes.func.isRequired
};

BudgetPopover.defaultProps = {
  totalDailyBudget: ''
};

export default BudgetPopover;
