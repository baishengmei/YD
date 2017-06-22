import React, { Component, PropTypes } from 'react';
import { Layout } from 'antd'
const { Content }= Layout
import ContentName from "../Content/ContentName"
import ContentReq from "../Content/ContentReq"
import ContentRes from "../Content/ContentRes"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './MockContent.css';

let ruleName2rules = {};
let rule2ruleName = {};

class MockContent extends Component {

  constructor(props) {
      super(props);
      this.state = {
        rulename: "",
        projname: "",
        reqVal: ""
      }       
  }
  //点击request中的保存按钮，调用的函数
  reqSave = () => {
    console.log("点击保存按钮后，发送ajax传送的数据", this.state.reqVal)
    console.log("this.rulename and projname----reqsave", this.state.rulename, this.state.projname)
  }

  //将规则名/项目组名传给该组件，并将值更新到state中。
  submitSave = (rulename, projname) => {
    this.setState({
      rulename: rulename,
      projname: projname
    })
  }

  contentReqVal = (value) => {
    this.setState({
      reqVal: value
    })
    console.log(value, "value in MockContent.js")
  }

  render() {
    return (
      <div className={s.content}>
        <ContentName 
          onsave={this.state.onsave}
          onSubmitSave={this.submitSave}
          className={s.content_name} 
        />

        <div className={s.contentRe}>
          <ContentReq onReqSave={this.reqSave} onContentReq={this.contentReqVal}/>
        </div>

        <div className={s.contentRe}>
          <ContentRes />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MockContent);