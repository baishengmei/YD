import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import rootStyles from './Header.css';
import {
  greenBtn,
  pinkBtn
} from '../variables';
import RaisedButton from 'material-ui/RaisedButton';
import CommonPopover from './CommonPopover';
import {
  addTransitionEndListener,
  removeTransitionEndListener
} from '../../core/DOMUtils';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('Header-NotificationDetail');


export default class NotificationDetail extends Component {
  constructor(...args) {
    super(...args);
    this.hideTransitionEndQueue = [];
  }

  static propTypes = {
    notification: PropTypes.object,
    openPopover: PropTypes.bool.isRequired,
    anchorEl: PropTypes.any,
    onEditReview: PropTypes.func.isRequired,
    onHideDetailNotification: PropTypes.func,
    onHideDetailNotificationEnd: PropTypes.func,
    onRemoveNotification: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.setState({
      openPopover: this.props.openPopover
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      openPopover: nextProps.openPopover
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.openPopover !== nextState.openPopover
      || this.props.anchorEl !== nextProps.anchorEl;
  }


  componentDidUpdate() {
    myDebug('componentDidUpdate')
  	if ( this.listenHide ) {
    	this.handleHideTransitionEnd();
  	}
  }

  render() {

    let {
      anchorEl,
      notification
    } = this.props;

    return (
      <CommonPopover
        openPopover={this.state.openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top'
        }}
        targetOrigin={{
          horizontal: 'left',
          vertical: 'top'
        }}
        popoverStyle={{
          margin: '0',
          width: anchorEl ? (anchorEl.offsetWidth + 'px') : 'auto',
          minHeight: '100px'
        }}
        onPopoverClose={this.hideDetailNotification}>
        <header
          ref='detailPopoverHeader'
          className={rootStyles.detailMessageHeader}>
          尊敬的用户
        </header>
        <div className={rootStyles.detailMessageItem}>
          {notification && notification.content}
        </div>
        <div className={rootStyles.detailMessageAction}>
          <RaisedButton
            className={rootStyles.detailMessageButton}
            onTouchTap={this.removeNotification}
            label='删除'
            labelColor={greenBtn.color}
            labelStyle={{
              fontSize: '12px'
            }}
            backgroundColor={greenBtn.bgColor}
            style={{
              height: '32px',
              lineHeight: '32px',
              verticalAlign: 'middle',
              border: `1px solid ${greenBtn.borderColor}`
            }}/>
          {
            notification && notification.type === 'review' &&
              ( notification.adGroupId || notification.adContentId ) ?
              (
                <RaisedButton
                  className={rootStyles.detailMessageButton}
                  onTouchTap={this.handleEditReview}
                  label='点击修改'
                  labelColor={pinkBtn.color}
                  labelStyle={{
                    fontSize: '12px'
                  }}
                  backgroundColor={pinkBtn.bgColor}
                  style={{
                    height: '32px',
                    lineHeight: '32px',
                    verticalAlign: 'middle',
                    border: `1px solid ${pinkBtn.borderColor}`
                  }}/>
              ) :
              (
                <RaisedButton
                  className={rootStyles.detailMessageButton}
                  onTouchTap={this.goToNotificationCenter}
                  label='去消息中心查看'
                  labelColor={pinkBtn.color}
                  labelStyle={{
                    fontSize: '12px'
                  }}
                  backgroundColor={pinkBtn.bgColor}
                  style={{
                    height: '32px',
                    lineHeight: '32px',
                    verticalAlign: 'middle',
                    border: `1px solid ${pinkBtn.borderColor}`
                  }}/>
              )
          }
        </div>
      </CommonPopover>
    );
  }

  removeNotification = () => {
    let nid = this.props.notification.id;
    this.hideTransitionEndQueue.push(() => {
      this.props.onRemoveNotification(nid);
    });
    this.hideDetailNotification();
  }

  handleEditReview = () => {
    let notification = this.props.notification;
    let type = notification.adGroupId ? 'adGroup' : 'adContent';
    let id = notification[type + 'Id'];
    this.hideDetailNotification();
    this.props.onEditReview({ type, id });
  }

  // 跳转到消息中心查看
  goToNotificationCenter = () => {
    let nid = this.props.notification.id;
    this.hideDetailNotification();
    this.props.goToNotificationCenter(nid);
  }

  hideDetailNotification = () => {
    //this.popoverNode = ReactDOM.findDOMNode(this.refs.detailPopoverHeader).parentNode;
    // 监听 popover 消失的动画的结束时刻，
    // 因为 popover 是动态创建的，
    // 所以每次都要重新获取 dom node 并监听
    //addTransitionEndListener(this.popoverNode, this.handleHideTransitionEnd.bind(this)); // 在 chrome 46 上，不是每次都成功过触发
    this.listenHide = true;

    this.setState({
      openPopover: false
    });


    if ( this.props.onHideDetailNotification ) {
      this.props.onHideDetailNotification();
    }
  }

  handleHideTransitionEnd = (evt) => {
    if ( !this.state.openPopover) {
      this.listenHide = false;
      evt && evt.stopPropagation();
      console.log('NotificationDetail hideTransitionEnd')
      // 移除监听
      // removeTransitionEndListener(this.popoverNode, this.handleHideTransitionEnd);
      // this.popoverNode = null;
      // 出发 popover 消失动画完成事件
      if ( this.props.onHideDetailNotificationEnd ) {
        this.props.onHideDetailNotificationEnd();
      }
      // 处理 popover 消失后需要触发的事件
      let q = this.hideTransitionEndQueue;
      while ( q.length > 0 ) {
        q.shift()();
      }
    }
  }
}
