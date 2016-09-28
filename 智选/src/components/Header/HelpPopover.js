import React, { Component, PropTypes } from 'react';
import style from './badgeStyle';
import { HelpMenuItems } from '../../constants/MenuTypes';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import CommonPopover from './CommonPopover';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('Header-HelpPopover');

/**
 * Help Popover 组件
 */
class HelpPopover extends Component {
  constructor(...args) {
    super(...args);

    this.menus = this.getMenus();
  }

  getMenus() {
    return (
      <Menu
        autoWidth={false}
        onItemTouchTap={this.handleMenuItemTouchTap}>
        {
          HelpMenuItems.map((item, index) =>
            <MenuItem
              key={index}
              style={style.menuItemStyle}
              primaryText={item.name} />
          )
        }
      </Menu>
    );
  }

  render() {
    const {
      openPopover,
      anchorEl,
      onPopoverClose
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

  handleMenuItemTouchTap = (evt, menuItem, index) => {
    this.props.onPopoverClose();
    this.props.navTo(HelpMenuItems[index].value);
  }
}

HelpPopover.propTypes = {
  navTo: PropTypes.func.isRequired
};

[
  'openPopover',
  'anchorEl',
  'onPopoverClose'
].forEach(prop => {
  HelpPopover.propTypes[prop] = CommonPopover.propTypes[prop];
})

export default HelpPopover;
