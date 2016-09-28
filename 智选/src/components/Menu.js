import React, { PropTypes, Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RangedDatePicker from './RangedDatePicker';
import { MenuTypeArr } from '../constants/MenuTypes';
import { getDebugger } from '../core/utils';

const myDebug = getDebugger('Menu');

const MenuItemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
});

const SelectedMenuShape = PropTypes.shape({
  selectedIndex: PropTypes.number.isRequired,
  value: PropTypes.any.isRequired,
  dateRange: PropTypes.object
});

class Menu extends Component {

  constructor(...args) {
    super(...args);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.handleRangedDataPickerChange = this.handleRangedDataPickerChange.bind(this);
  }

  static propTypes = {
    menuType: PropTypes.oneOf(MenuTypeArr).isRequired,
    selectedMenu: SelectedMenuShape.isRequired,
    menuItems: PropTypes.arrayOf(
      MenuItemShape
    ).isRequired,
    onMenuChange: PropTypes.func,
    dropDownMenuStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    underlineStyle: PropTypes.object,
    style: PropTypes.object
  };

  componentWillMount() {
    this.menuItems = this.genMenuItems(this.props.menuItems);
    this.setState({
      ...this.props.selectedMenu
    });
  }

  componentWillReceiveProps(nextProps) {
    myDebug('componentWillReceiveProps')
    this.setState({
      ...nextProps.selectedMenu
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( this.state.selectedIndex === nextState.selectedIndex && this.props.menuType === nextProps.menuType ) {
      myDebug('shouldComponentUpdate', false)
      return false;
    }
    if ( this.props.menuType !== nextProps.menuType ) {
      this.menuItems = this.genMenuItems(nextProps.menuItems);
    }
    myDebug('shouldComponentUpdate', true)
    return true;
  }

  genMenuItems(menuItemObjArr) {
    return menuItemObjArr.map((menuItemObj, index) => (
      <MenuItem
        key={index}
        style={{cursor: 'pointer'}}
        value={menuItemObj.value}
        primaryText={menuItemObj.name} />
    ));
  }

  render() {

    myDebug('render')

    let {
      value: selectValue,
      dateRange
    } = this.state;

    let {
      underlineStyle,
      labelStyle,
      iconStyle,
      style,
      dropDownMenuStyle
    } = this.props;

    return (
      <div
        className='menu'
        style={{
          display: 'inline-block',
          ...(style || {})
        }}>
        <DropDownMenu
          value={selectValue}
          underlineStyle={underlineStyle}
          style={dropDownMenuStyle}
          labelStyle={labelStyle}
          iconStyle={iconStyle}
          onChange={this.handleMenuChange}>
          {this.menuItems}
        </DropDownMenu>
        {
          selectValue === 'custom' ?
            <RangedDatePicker
              ref="dateRange"
              dateRange={dateRange}
              onChange={this.handleRangedDataPickerChange} /> :
            null
        }
      </div>
    );
  }

  handleMenuChange(evt, selectedIndex, value) {
    const _selectedIndex = this.state.selectedIndex;
    if ( selectedIndex === _selectedIndex ) return;
    //this.setState 是异步更新
    let smenu = {
      selectedIndex,
      value,
      ...(value === 'custom' ? {dateRange: {
        start: undefined,
        end: undefined
      }} : {})
    };

    // 这里不使用 setState 更新 state
    // 是因为 setState 不是覆盖，
    // 所以如果 prev State 中含有 dateRange
    // smenu 不含，那么新 state 中也会有 dateRange
    // 这是不对的
    this.state = smenu;
    // 强制刷新，不经过 shouldComponentUpdate
    this.forceUpdate();

    // 为了 UI 更流畅，
    // 最好延迟发起 action，
    // 或者在外层组件延迟执行某些操作
    if (this.props.onMenuChange) {
      // menuType
      // selectedMenu
      this.props.onMenuChange(
        this.props.menuType,
        smenu
      );
    }
  }

  handleRangedDataPickerChange(dateRange) {
    this.state = {
      ...this.state,
      dateRange
    };
    if (this.props.onMenuChange) {
      // menuType
      // selectedMenu
      this.props.onMenuChange(
        this.props.menuType,
        this.state
      );
    }
  }
}

export {
  Menu as default,
  MenuItemShape,
  SelectedMenuShape
};