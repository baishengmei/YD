/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

const tabs = [{
  name: '首页',
  path: '/home',
}, {
  name: '推广管理',
  path: '/adManagement',
}, {
  name: '数据报表',
  path: '/dataReport'
}, {
  name: '账户管理',
  path: '/account'
}];

function Navigation({ path }) {
  return (
    <section className={`${s.root} root`} role='navigation'>
      <div className={s.container}>
        <div className={s.tabs}>
          {tabs.map(tab => (
            <Link
              key={tab.path}
              className={path.startsWith(tab.path) ? `${s.tab} ${s.active}` : s.tab}
              to={tab.path}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

Navigation.propTypes = {
  path: React.PropTypes.string.isRequired
};

export default withStyles(s)(Navigation);
