import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Header.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { orangeBtn } from '../variables';
import { Notification, Help, User } from './Icons';

@withStyles(styles)
class Header extends Component {

  constructor() {
    super();

    this.navs = [{
      text: '首页',
      payload: '/index'
    }, {
      text: '创建广告',
      payload: '/createAd'
    }, {
      text: '管理广告',
      payload: '/managementAds'
    }, {
      text: '数据报告',
      payload: '/dataReport'
    }, {
      text: '工具箱',
      payload: '/toolBox'
    }, {
      text: '账户信息',
      payload: '/account'
    }];
  }

  static propTypes = {
    activeNav: PropTypes.string.isRequired,
    newMessages: PropTypes.array.isRequired,
    removeNotification: PropTypes.func.isRequired,
    newHelps: PropTypes.array.isRequired,
    userInfo: PropTypes.object,
    onLogout: PropTypes.func.isRequired,
    goToLogin: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if ( !nextProps.userInfo ) {
      this.props.goToLogin();
    }
  }

  getNavLinks() {
    return this.navs.map((nav, index) => (
      <Link
        className={classnames(styles.navLink, this.props.activeNav === nav.payload && styles.activeNavLink)}
        key={index}
        to={nav.payload}>
        {nav.text}
      </Link>
    ));
  }

  getIcons() {

    const {
      newMessages,
      removeNotification,
      newHelps,
      userInfo,
      onLogout
    } = this.props;

    return [
      userInfo && <Notification
        key={0}
        newMessages={newMessages}
        onRemoveNotification={removeNotification} />,
      <Help
        key={1}
        newHelps={newHelps} />,
      userInfo && <User
        key={2}
        onLogout={onLogout} />,
      <Link
        key={3}
        to='/createAd'
        style={{
          marginLeft: '40px',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '14px'
        }}>
        <RaisedButton
          label='新建广告'
          labelColor={orangeBtn.color}
          backgroundColor={orangeBtn.bgColor}
          borderColor={orangeBtn.borderColor}
          style={{
            width: '90px',
            height: '30px',
            lineHeight: '30px'
          }} />
      </Link>
    ];
  }

  render() {

    return (
      <div className={styles.header}>
        <div className={styles.headerMain}>
          <Link
            className={styles.logo}
            to="/">
            <img
              src={require('../../images/logo.png')}
              alt="有道智选，网易效果推广"
              style={{height: '100%'}} />
          </Link>
          <div className={styles.nav}>
            {this.getNavLinks()}
          </div>
          <div style={{float: 'right'}}>
            {this.getIcons()}
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
