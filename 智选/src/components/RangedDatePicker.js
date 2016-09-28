import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';

function dateFormat(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  return y + '/' + m + '/' + d;
}

export default class RangedDatePicker extends Component {
  constructor(...args) {
    super(...args);

    let today = new Date();

    this.state = {};

    this.state.pickerStart = {
      minDate: undefined,
      maxDate: today
    };
    this.state.pickerEnd = {
      minDate: undefined,
      maxDate: today
    };

    this.state.select = {
      start: undefined,
      end: undefined
    };


    this.onChangeBefore = this.onChangeBefore.bind(this);
    this.onChangeAfter = this.onChangeAfter.bind(this);
  }

  static propsTypes = {
    dateRange: PropTypes.shape({
      start: PropTypes.object,
      end: PropTypes.object
    }).isRequired,
    onChange: PropTypes.func.isRequired
  };

  // 此处setState，render 只能感知到更新后的 state
  componentWillMount() {
    const { start, end } = this.props.dateRange;
    this.state.select = {
      start,
      end
    };
    this.styles = this.getStyles();
  }

  componentWillReceiveProps(nextProps) {
    let { start, end } = nextProps.dateRange;
    this.setState({
      select: {
        start,
        end
      }
    });
  }

  getStyles() {
    let styles = {
      root: {
        display: 'inline-block',
        position: 'relative',
        marginRight: '10px'
      },
      datepicker: {
        display: 'inline-block',
        width: '88px'
      },
      dpTextField:　{
        width: '100%',
        textAlign: 'center'
      }
    };

    return styles;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { select: { start, end } } = this.props;
    const select = nextProps.select;
    return start !== select.start || end !== select.end;
  }

  render() {
    const {
      styles,
      onChangeBefore,
      onChangeAfter,
      onShow,
      onDismiss
    } = this;

    const {
      select: {
        start,
        end
      },
      pickerStart,
      pickerEnd
    } = this.state;

    return (
      <div
        className='dateRange'
        style={styles.root}>
        <DatePicker
          ref='pickerStart'
          hintText="起始日期"
          value={start ? new Date(start) : null}
          minDate={pickerStart.minDate}
          maxDate={pickerStart.maxDate}
          formatDate={dateFormat}
          textFieldStyle={styles.dpTextField}
          onChange={onChangeBefore}
          onShow={onShow}
          onDismiss={onDismiss}
          style={styles.datepicker} />
        <span style={{margin: '0 10px 0 5px'}}> - </span>
        <DatePicker
          ref='pickerEnd'
          hintText="结束日期"
          value={end ? new Date(end) : null}
          minDate={pickerEnd.minDate}
          maxDate={pickerEnd.maxDate}
          formatDate={dateFormat}
          textFieldStyle={styles.dpTextField}
          onChange={onChangeAfter}
          onShow={onShow}
          onDismiss={onDismiss}
          style={styles.datepicker} />
      </div>
    );
  }

  onChangeBefore(evt, chooseDate) {
    let { pickerEnd, select } = this.state;
    if ( pickerEnd.minDate && pickerEnd.minDate.getTime() === chooseDate.getTime() ) return;
    select.start = dateFormat(pickerEnd.minDate = chooseDate);
    this.forceUpdate();
    if ( this.props.onChange ) {
      this.props.onChange({
        ...select
      })
    }
  }

  onChangeAfter(evt, chooseDate) {
    let { pickerStart, select } = this.state;
    if ( pickerStart.maxDate && pickerStart.maxDate.getTime() === chooseDate.getTime() ) return;
    select.end = dateFormat(pickerStart.maxDate = chooseDate);
    this.forceUpdate();
    if ( this.props.onChange ) {
      this.props.onChange({
        ...select
      })
    }
  }
}
