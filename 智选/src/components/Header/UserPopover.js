import React, { Component, PropTypes } from 'react';
import style from './badgeStyle';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import CommonPopover from './CommonPopover';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('Header-UserPopover');

/**
 * User Popover 组件
 */
class UserPopover extends Component {
  constructor(...args) {
    super(...args);

    this.menus = this.getMenus();
  }

  getMenus() {
    return (
      <Menu autoWidth={false}>
        <MenuItem
          disabled={true}
          style={{
            ...style.menuItemStyle,
            color: 'inherit',
            cursor: 'auto'
          }}
          primaryText='用户: test@163.com' />
        <Divider />
        <MenuItem
          onTouchTap={() => {
            this.handleMenuItemTouchTap('account');
          }}
          style={style.menuItemStyle}
          primaryText='账户信息' />
        <MenuItem
          onTouchTap={() => {
            this.props.onPopoverClose();
            window.open('http://a.youdao.com/index.s')
          }}
          style={style.menuItemStyle}
          primaryText='有道易投' />
        <Divider />
        <MenuItem
          onTouchTap={() => {
            this.props.onPopoverClose();
            this.props.onLogout();
          }}
          style={style.menuItemStyle}
          primaryText='退出' />
      </Menu>
    );
  }

  render() {
    myDebug('render')

    const {
      openPopover,
      anchorEl,
      onPopoverClose,
    } = this.props;

    return (
      <CommonPopover
        openPopover={openPopover}
        anchorEl={anchorEl}
        popoverStyle={{marginLeft: '-20px'}}
        onPopoverClose={onPopoverClose}>
        {this.menus}
      </CommonPopover>
    );
  }

  handleMenuItemTouchTap = (routerValue) => {
    this.props.onPopoverClose();
    this.props.navTo(routerValue);
  }
}

UserPopover.propTypes = {
  onLogout: PropTypes.func.isRequired,
  navTo: PropTypes.func.isRequired
};

[
  'openPopover',
  'anchorEl',
  'onPopoverClose'
].forEach(prop => {
  UserPopover.propTypes[prop] = CommonPopover.propTypes[prop];
})

export default UserPopover;
