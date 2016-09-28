import React, { Component, PropTypes } from 'react';
import CommonBadge from './CommonBadge';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('Header-CommonIconBadge');


function CommonIconBadge(BadgePopoverComponent) {

  class CommonIconBadge extends Component {

    constructor(...args) {
      super(...args);

      this.state = {
        openPopover: false,
        anchorEl: undefined
      };
    }

    componentWillMount() {
      let { openPopover } = this.state;
      if ( openPopover && this.props.badgeCount === 0 ) {
        this.setState({
          openPopover: false
        })
      }
    }

    componentWillReceiveProps(nextProps) {
      let { openPopover } = this.state;
      if ( openPopover && nextProps.badgeCount === 0 ) {
        this.setState({
          openPopover: false
        })
      }
    }

    render() {

      myDebug('render');

      const {
        openPopover,
        anchorEl
      } = this.state;

      const {
        badgeCount,
        tooltip,
        iconElement,
        ...rest
      } = this.props;

      return (
        <div
          className='CommonIconBadge'
          style={{display: 'inline-block'}}>
          <CommonBadge
            badgeCount={badgeCount}
            tooltip={tooltip}
            icon={iconElement}
            onTouchTap={this.handleTouchTap} />
          <BadgePopoverComponent
            openPopover={openPopover}
            anchorEl={anchorEl}
            onPopoverClose={this.handlePopoverClose}
            {...rest}/>
        </div>
      );
    }

    handlePopoverClose = () => {
      this.setState({
        openPopover: false
      })
    }

    handleTouchTap = (evt) => {
      let r = this.props.badgeCount > 0 ? true : this.props.onNoBadgeTouchTap(evt);
      if ( r ) {
        this.setState({
          openPopover: true,
          anchorEl: evt.currentTarget
        })
      }
    }

  }

  const {
    openPopover,
    anchorEl,
    onPopoverClose,
    ...otherProps
  } = BadgePopoverComponent.propTypes;

  CommonIconBadge.propTypes = {
    badgeCount: PropTypes.number.isRequired,
    tooltip: PropTypes.string.isRequired,
    iconElement: PropTypes.element.isRequired,
    // 根据返回值 true/false 判断是否进行 touch 的默认行为
    onNoBadgeTouchTap: PropTypes.func,
    ...otherProps
  };

  CommonIconBadge.defaultProps = {
    onNoBadgeTouchTap: () => true
  };

  return CommonIconBadge;
}

export default CommonIconBadge;
