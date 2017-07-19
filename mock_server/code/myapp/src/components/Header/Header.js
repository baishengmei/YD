/* eslint-disable import/no-extraneous-dependencies */
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Menu, Dropdown, Icon } from 'antd';
import s from './Header.css';
import Link from '../Link';

const helpCenterLinks = [
  {
    name: '常见问题',
    link: '/qa'
  },
  {
    name: '反馈建议',
    link: '/feedback'
  },
  {
    name: '咨询客服',
    link: '/consult'
  }
];

const genMenu = items => (
  <Menu>
    {items.map(item => (
      <Menu.Item key={item.link}>
        <Link to={item.link}>{item.name}</Link>
      </Menu.Item>
    ))}
  </Menu>
);

const helpCenterDropDown = (
  <Dropdown overlay={genMenu(helpCenterLinks)}>
    <a className={`${s.link} ant-dropdown-link`}>
    About <Icon type='down' />
    </a>
  </Dropdown>
);

class Header extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.username !== nextProps.uesrname;
  }

  logoutHandler = () => {
    this.props.onLogout();
  }

  render() {
    const {
      username,
    } = this.props;

    return (
      <header className={`${s.root} root`}>
        <div className={s.container}>
          <Link className={s.brand} to='/'>
            <span className={s.brand__logo} />
            <span className={s.brand__txt}>MockServer</span>
          </Link>
          <section className={s.links}>
            <Icon type="home" style={{ color: '#fff'}}/>
            <Link className={s.link} to='/messageCenter'>HOME</Link>
            <span className={s.splitter}>|</span>
            <Icon type="home" style={{ color: '#fff'}}/>
            {helpCenterDropDown}
            <span className={s.splitter}>|</span>
            <span className={`${s.link} ${s.noclick}`}>{username}</span>
            <span className={s.splitter}>|</span>
            <span // eslint-disable-line jsx-a11y/no-static-element-interactions
              className={s.link}
              onClick={this.logoutHandler}
            >
            退出
            </span>
          </section>
        </div>
      </header>
    );
  }
}

export default withStyles(s)(Header);
