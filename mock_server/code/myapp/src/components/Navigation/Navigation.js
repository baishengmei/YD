import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import $ from 'jquery'
import s from './Navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "createRule",
    }
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  
  render() {
    return (
      <div className={s.navbar}>
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        theme="light"
      >
        <Menu.Item key="createRule">
          <a href="/" rel="noopener noreferrer">首页-创建规则</a>
        </Menu.Item>
        <Menu.Item key="createProjname">
          <a href="/createprojectname" rel="noopener noreferrer">创建项目组</a>
        </Menu.Item>
        <Menu.Item key="searchRule">
          <a href="searchrules" rel="noopener noreferrer">规则查询</a>
        </Menu.Item>
        
        <Menu.Item key="detailRule">
          <a href="showdetailrules" rel="noopener noreferrer">规则详情</a>
        </Menu.Item>
      </Menu>
      </div>
    );
  }

}

export default withStyles(s)(Navigation);
