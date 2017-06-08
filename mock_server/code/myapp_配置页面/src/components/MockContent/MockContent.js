import React, { Component, PropTypes } from 'react';
import { Layout } from 'antd'
const { Content }= Layout
import ContentName from "../Content/ContentName"
import ContentReq from "../Content/ContentReq"
import ContentRes from "../Content/ContentRes"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './MockContent.css';

class MockContent extends Component {

  constructor(props) {
      super(props);
      this.state = {
        mockNames: {
          ruleName: "test1",//规则名
          projName: "yadk1" //项目名
        }
      }       
  }

  handleChange = () => {
    // this.props.onChangeRulename();
    console.log("yes")
  }

  render() {
    return (
      <div className={s.content}>
        <ContentName 
          className={s.content_name} 
        />
        <div className={s.contentRe}>
          <ContentReq />
          <ContentRes />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MockContent);