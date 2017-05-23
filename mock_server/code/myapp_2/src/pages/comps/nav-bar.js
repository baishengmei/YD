import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header }= Layout;
import { Icon } from "antd";
import { Row, Col } from "antd";
import 'antd/dist/antd.less'

class NavBar extends React.Component {

  render() {
    return (
      <div className="nav_bar">
        <div className="navbar_logo">MockServer</div>
        <div className="navbar_icon">
          <Row>
            <Col span={8}>
              <Icon type="home" />
              <span>&nbsp;home</span>
            </Col>
            <Col span={8}>
              <Icon type="question-circle-o" />
              <span>&nbsp;help</span>
            </Col>
            <Col span={8}>
              <Icon type="user" />
              <span>&nbsp;User</span>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default NavBar;