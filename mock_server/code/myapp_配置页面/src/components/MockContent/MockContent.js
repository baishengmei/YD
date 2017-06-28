import React, { Component, PropTypes } from 'react';
import { Layout, Modal } from 'antd'
const { Content }= Layout
import ContentName from "../Content/ContentName"
import ContentReq from "../Content/ContentReq"
import ContentRes from "../Content/ContentRes"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './MockContent.css';
import $ from 'jquery'

let ruleName2rules = {};
let rule2ruleName = {};

class MockContent extends Component {

  constructor(props) {
      super(props);
      this.state = {
        rulename: "",
        projname: "",
        reqVal: {},
        resVal: {},
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
  reqSave = () => {
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
    }else if(this.state.reqVal.$m == undefined || this.state.reqVal.$m == ""){
      this.error("Method");
      this.setState({
        sendAjax: false
      })
    }else if(this.state.reqVal.$c == undefined || this.state.reqVal.$c == ""){
      this.error('ContentType');
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

          $.ajax({
            url: '/saverules',
            type: 'POST',
            dataType: 'json',
            data: Object.assign({}, {ruleName:this.state.rulename}, {projectName:this.state.projname}, this.state.reqVal),
            success: data => {
              console.log(data);
              console.log("succeed!")
              this.setState({
                clearForm: false,
                rulename: "",
                projname: "",
                reqVal: {},
              })
            },
            error: err => {
              console.log(err);
              this.setState({
                clearForm: false,
                reqVal: {},
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
  }

  resSave = () => {

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
  }

  contentResVal = (value) => {
    this.setState({
      resVal: value
    }, () => {
      console.log(this.state.resVal," dddddddddddddddd")
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
          <ContentReq onReqSave={this.reqSave} onContentReq={this.contentReqVal} clearTag={this.state.clearForm}/>
        </div>

        <div className={s.contentRe}>
          <ContentRes onContentRes={this.contentResVal} clearTag={this.state.clearForm} />
        </div>

      </div>
    );
  }
}

export default withStyles(s)(MockContent);