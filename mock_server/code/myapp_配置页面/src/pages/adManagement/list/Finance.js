import React, { Component, PropTypes } from 'react';
import { Tooltip, Icon, Input, Spin } from 'antd';
import s from './AdManagementList.css';
import { formatNumber } from '../../../core/utils';

const financeTooltipText = `
1. 默认设置每日预算总额为 10,000,000.00 元/天；
2. 系统生效会有 15 分钟左右的延迟，因此可能会出现您当天消费总金额超过您所设置的当天预算总值的情况，敬请谅解；
3. 如果您修改的金额小于您当日已产生的消费额，广告会很快下线；
4. 最终取值为所有推广系列预算和与总预算之间的最小值。
`.split('\n')
.filter(Boolean)
.map(t => <div key={t.slice(0, 6)}>{t}</div>);
const tooltip = <Tooltip title={financeTooltipText}><Icon type='question-circle-o' /></Tooltip>;
const inputFinanceText = '金额数值应在 100.00 - 10,000,000.00之间';

class EditableNumber extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    sendErrorMessage: PropTypes.func.isRequired,
  };

  state = {
    status: this.props.status,
    value: this.props.value,
    editable: false,
    inputInvalid: false,
  };

  componentWillReceiveProps(nextProps) {
    const valueChange = this.state.value !== nextProps.value;
    const nextState = {
      status: nextProps.status,
      value: nextProps.value,
    };
    if (valueChange) {
      nextState.inputInvalid = false;
    }
    this.setState(nextState);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { status, value, editable, inputInvalid } = this.state;
    return status !== nextState.status
      || value !== nextState.value
      || editable !== nextState.editable
      || inputInvalid !== nextState.inputInvalid;
  }

  onEdit = () => {
    this.setState({
      editable: true
    });
  }

  onInputCancel = () => {
    this.setState({
      value: this.props.value,
      editable: false,
      inputInvalid: false,
    });
  }

  onInputChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  onCheckInput = () => {
    const { value } = this.state;
    const invalid = isNaN(value) || value < 100 || value > 1e7;
    if (invalid) {
      this.setState({
        inputInvalid: invalid,
      }, () => {
        if (invalid) {
          this.refs.editInput.focus();
        }
      });
      return;
      // return this.props.sendErrorMessage('输入不符合要求！');
    }
    const change = value !== this.props.value;
    const newState = { editable: false };

    if (change) {
      newState.status = 'saving';
    }
    this.setState(newState);
    if (change) {
      this.props.onChange(parseFloat(value));
    }
  }

  render() {
    const { status, editable, value, inputInvalid } = this.state;

    return (
      <div className={s['editable-number']}>
        <Spin
          spinning={status === 'saving'}
          size='small'
        >
          {editable
            ?
              <div className={s['editable-cell-input-wrapper']}>
                <Tooltip
                  placement='top'
                  title={
                    <span style={inputInvalid ? { color: 'red' } : undefined}>{inputFinanceText}</span>
                  }
                  trigger='focus'
                >
                  <Input
                    ref='editInput'
                    type='text'
                    value={value}
                    onChange={this.onInputChange}
                    onPressEnter={this.onCheckInput}
                  />
                </Tooltip>
                <Icon
                  type='check'
                  className={s['editable-cell-icon-check']}
                  onClick={this.onCheckInput}
                />
                <Icon
                  type='close'
                  className={s['editable-cell-icon-close']}
                  onClick={this.onInputCancel}
                />
              </div>
            :
              <div className={s['editable-cell-text-wrapper']}>
                <span className={s.item__content}>{formatNumber(value)}</span>
                <Icon
                  type='edit'
                  className={s['editable-cell-icon']}
                  onClick={this.onEdit}
                />
              </div>
          }
        </Spin>
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class Finance extends Component {
  static propTypes = {
    balance: PropTypes.number.isRequired,
    todayConsumption: PropTypes.number.isRequired,
    sponsorBudget: PropTypes.object.isRequired,
    onDailyBudgetChange: PropTypes.func.isRequired,
    sendErrorMessage: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const {
      balance,
      todayConsumption,
      sponsorBudget
    } = this.props;

    return balance !== nextProps.balance
      || todayConsumption !== nextProps.todayConsumption
      || sponsorBudget !== nextProps.sponsorBudget;
  }

  render() {
    const {
      balance,
      todayConsumption,
      sponsorBudget,
      onDailyBudgetChange,
      sendErrorMessage,
    } = this.props;

    return (
      <section className={`${s.financeRoot} root`}>
        <div className={s.financeContainer}>
          <div className={s.item}>
            <span className={s.item__name}>今日账户消耗</span>
            <span className={s.item__content}>{formatNumber(todayConsumption)}</span>
          </div>
          <span className={s.splitter} />
          <div className={s.item}>
            <span className={s.item__name}>账户总余额</span>
            <span className={s.item__content}>{formatNumber(balance)}</span>
          </div>
          <span className={s.splitter} />
          <div className={s.item}>
            <span className={s.item__name}>每日总预算 {tooltip}</span>
            <EditableNumber
              className={s.item__content}
              status={sponsorBudget.status}
              value={sponsorBudget.dailyBudget}
              onChange={onDailyBudgetChange}
              sendErrorMessage={sendErrorMessage}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Finance;
