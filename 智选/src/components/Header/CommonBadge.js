import React, { Component, PropTypes } from 'react';
import style from './badgeStyle';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('Header-CommonBadge');

/**
 * Header 中 notification 和 help 的抽象 Badge 组件
 */
class CommonBadge extends Component {

  constructor(...args) {
    super(...args);
  }

  shouldComponentUpdate(nextProps) {
    let {
      badgeCount,
      tooltip
    } = this.props;

    return badgeCount !== nextProps.badgeCount
      || tooltip !== nextProps.tooltip;
  }

  render() {

    myDebug('CommonBadge render')

    let {
      badgeCount,
      tooltip,
      icon
    } = this.props;

    return (
      <Badge
        badgeContent={badgeCount}
        badgeStyle={{
          ...style.badgeStyle,
          display: badgeCount > 0 ? 'block' : 'none'
        }}
        style={style.badge}
        onTouchTap={this.handleTouchTap}>
        <IconButton
          tooltip={tooltip}
          tooltipPosition="bottom-center"
          tooltipStyles={style.tooltipStyles}
          iconStyle={style.icon}>
          {icon}
        </IconButton>
      </Badge>
    );
  }

  handleTouchTap = (evt) => {
    this.props.onTouchTap(evt);
  }
}

CommonBadge.propTypes = {
  badgeCount: PropTypes.number.isRequired,
  tooltip: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onTouchTap: PropTypes.func.isRequired
};

export default CommonBadge;
