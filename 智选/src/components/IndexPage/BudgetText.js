import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('IndexPage-BudgetText');

/**
 * budget 数值显示输入组件
 */
class BudgetText extends Component {

  constructor(...args) {
    super(...args);
  }

  componentWillMount() {
    this.setState({
      totalDailyBudget: typeof this.props.totalDailyBudget === 'undefined' ? '' : this.props.totalDailyBudget
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalDailyBudget: typeof nextProps.totalDailyBudget === 'undefined' ? '' : nextProps.totalDailyBudget
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isSaving !== nextProps.isSaving
      || this.state.totalDailyBudget !== nextState.totalDailyBudget;
  }

  render() {

    myDebug('BudgetText render')

    return (
      <div>
        <TextField
          ref='budget'
          hintText="例如 8000.00"
          style={{
            display: 'inline-block',
            width: '60%'
          }}
          underlineStyle={{width: '100%'}}
          value={this.state.totalDailyBudget}
          onFocus={this.handleBudgetFocus}
          onChange={this.handleInputChange}/>
        （ 元/天 ）
      </div>
    );
  }

  handleInputChange = (evt, value) => {
    this.setState({
      totalDailyBudget: value
    });
  }

  handleBudgetFocus = (evt) => {
    this.props.onBudgetFocus(evt);
  }

  getBudget = () => this.state.totalDailyBudget
}

BudgetText.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  totalDailyBudget: PropTypes.string.isRequired,
  onBudgetFocus: PropTypes.func.isRequired
};


export default BudgetText;
