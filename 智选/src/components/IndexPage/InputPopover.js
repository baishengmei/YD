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
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('IndexPage-InputPopover');

/**
 * Input popover 组件
 */
class InputPopover extends Component {

  constructor(...args) {
    super(...args);
  }

  componentWillMount() {
    this.setState({
      openPopover: this.props.openPopover,
      remainingEditTimes: this.props.remainingEditTimes
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      openPopover: nextProps.openPopover,
      remainingEditTimes: nextProps.remainingEditTimes
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      openPopover,
      remainingEditTimes
    } = this.state;

    const {
      isSaving,
      anchorEl
    } = this.props;

    return isSaving !== nextProps.isSaving
      || openPopover !== nextState.openPopover
      || anchorEl !== nextProps.anchorEl
      || remainingEditTimes !== nextState.remainingEditTimes;
  }

  render() {

    myDebug('InputPopover render')

    const {
      openPopover,
      remainingEditTimes
    } = this.state;

    const {
      isSaving,
      anchorEl
    } = this.props;

    return (
      <Popover
        className={rootStyles.budgetPopover}
        zDepth={2}
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'middle', vertical: 'top'}}
        onRequestClose={this.handlePopoverClose}>
        <div className={rootStyles.hint}>
        本日还可操作更改 <span style={{color: 'red', fontSize: '1.2em'}}>{remainingEditTimes}</span> 次.</div>
        <div className={rootStyles.hint}>
        必须为数字（数值应在 50.00 ~ 10,000,000.00 之间）<br/>
        最多保留到小数点后两位.
        </div>
        <div className={rootStyles.buttonLine}>
          <RaisedButton
            onTouchTap={this.handleCancelBtnTap}
            disabled={isSaving}
            label='取消'
            labelColor={greenBtn.color}
            labelStyle={{
              fontSize: '12px'
            }}
            backgroundColor={greenBtn.bgColor}
            style={{
              ...SummaryStyles.popoverButton,
              ...( isSaving ?
                {} :
                {
                  border: `1px solid ${greenBtn.borderColor}`
                })
            }}/>
          <RaisedButton
            onTouchTap={this.handleConfirmBtnTap}
            disabled={isSaving}
            label={isSaving ? '保存中...' : '确认'}
            labelColor={pinkBtn.color}
            labelStyle={{
              fontSize: '12px'
            }}
            backgroundColor={pinkBtn.bgColor}
            style={{
              ...SummaryStyles.popoverButton,
              ...( isSaving ?
                {} :
                {
                  border: `1px solid ${pinkBtn.borderColor}`
                })
            }}/>
        </div>
      </Popover>
    );
  }

  handlePopoverClose = (type) => {
    if ( type === 'clickAway' ) {
      this.props.onInputPopoverClose();
    }
  }

  handleCancelBtnTap = () => {
    this.props.onInputPopoverClose();
  }

  handleConfirmBtnTap = () => {
    this.props.onConfirmTap();
  }
}

InputPopover.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  openPopover: PropTypes.bool.isRequired,
  anchorEl: PropTypes.any,
  remainingEditTimes: PropTypes.number.isRequired,
  onConfirmTap: PropTypes.func.isRequired,
  onInputPopoverClose: PropTypes.func.isRequired
};

export default InputPopover;
