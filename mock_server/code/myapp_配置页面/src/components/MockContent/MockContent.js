import React, { Component, PropTypes } from 'react';
import { Layout, Modal } from 'antd'
const { Content }= Layout
import ContentName from "../Content/ContentName"
import ContentReq from "../Content/ContentReq"
import ContentRes from "../Content/ContentRes"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './MockContent.css';
import $ from 'jquery'
import ReSave from '../Content/contentReq/ReSave'

let ruleName2rules = {};
let rule2ruleName = {};
let main = {};//用于存放带发送到后端的所有数据

class MockContent extends Component {

  constructor(props) {
      super(props);
      this.state = {
        rulename: "",
        projname: "",
        reqVal: {},
        resVal: [{'$sc':'200'}],
        clearForm: false,
        sendAjax: false
      }       
  }
  error = (errMsg) => {
    Modal.error({
      title: 'this is a warning message!',
      content: 'Please input the legal '+ `${errMsg}` + "!"
    })
  }
  //点击request中的保存按钮，调用的函数
  reSave = () => {
    //判断提交的表单是否有必填项未填写
    if(this.state.rulename == ""){
      this.error("Rule Name");
      this.setState({
        sendAjax: false
      })
    }else if(this.state.projname == ""){
      this.error("Project Name");
      this.setState({
        sendAjax: false
      })
    }else if(this.state.reqVal.$u == undefined || (/^\w+/.test(this.state.reqVal.$u) == false)){
      this.error("URL");
      this.setState({
        sendAjax: false
      })
    }else{
      this.setState({
        sendAjax: true
      }, () => {
        //当必填项规则名、项目组名、url、contentType不为空时，可提交
        if(this.state.sendAjax == true){
          this.setState({
            clearForm: true
          })

          console.log(this.state.reqVal, "再次传值时的reqVal的值")

          let params = {
            ruleName: this.state.rulename,
            projectName: this.state.projname,
            request: this.state.reqVal,
            response: this.state.resVal
          }

          $.ajax({
            url: '/saverules',
            type: 'POST',
            dataType: 'json',
            data: Object.assign({}, params),
            success: data => {
              console.log("succeed!")
              this.setState({
                clearForm: false,
                rulename: "",
                projname: "",
                reqVal: {},
                resVal: [{'$sc':'200'}],
              }, () => {
                // params = {};
                console.log(this.state.clearForm, "clearForm的值 在MockContent.js中")
                console.log(this.state.reqVal, "请求结束，置空reqVal后的值")
              })
            },
            error: err => {
              console.log(err);
              this.setState({
                clearForm: false,
                reqVal: {},
                resVal: [{'$sc':'200'}],
                rulename: "",
                projname: "",
              })
            }
          })
        }else{
          return false;
        }    
      })
    }  
    console.log("req的值：", this.state.reqVal, "res的值:", this.state.resVal,)
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
    }, () => {
      console.log(this.state.reqVal, "请求数据")
    })
  }
  contentResVal = (value) => {
    this.setState({
      resVal: value
    }, () => {
      console.log(this.state.resVal,"响应数据")
    })
  }
  render() {
    return (
      <div className={s.content}>
        <ContentName 
          clearTag={this.state.clearForm}
          onsave={this.state.onsave}
          onSubmitSave={this.submitSave}
          className={s.content_name} 
        />

        <div className={s.contentRe}>
          <ContentReq onContentReq={this.contentReqVal} clearTag={this.state.clearForm}/>
        </div>
        <div className={s.contentRe}>
          <ContentRes onContentRes={this.contentResVal} clearTag={this.state.clearForm} />
        </div>
        <ReSave onReSave={this.reSave}/>
      </div>
    );
  }
}

export default withStyles(s)(MockContent);