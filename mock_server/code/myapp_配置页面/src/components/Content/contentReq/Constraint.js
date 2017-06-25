import { Row, Col, Icon, Button, Input } from 'antd';
import React, { Component, PropTypes } from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'
import Formgroup from './Formgroup'

let uuid = 1;
let constraintObj = {};
class Constraint extends Component {

  constructor(props) {
    super(props);
    //将约束保存到对象constraint中，{"$G1":"blablabla", "$G2":"blablabla"}
    this.state = {
      keys: [1],
      constraint: {}
    }
  }

  remove = (k) => {
    const keys = this.state.keys;
    if (keys.length === 1) {
      return;
    };
    const arrkeys = [];
    for(let temp=1; temp<=keys.length-1; temp++){
      arrkeys.push(temp);
    }
    this.setState({
      keys: arrkeys,
    });
  }

  add = () => {
    const keys = this.state.keys;
    uuid = keys.length +1;
    const nextKeys = keys.concat(uuid);
    this.setState({
      keys: nextKeys
    });
  }

  contains = (arr, obj) => {  
    let i = arr.length;  
    while (i--) {  
        if (arr[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
  } 

  componentDidUpdate() {
    for(let i in constraintObj){
      if(this.contains(this.state.keys, parseInt(i.substring(2))) == false){
        delete constraintObj["$G"+i.substring(2)];
      }
    }
  }

  constraintChange = (k, consif, consexp) => {
    constraintObj["$G"+k] = "("+consif+")"+"&("+consexp+")";
    this.setState({
      constraint: constraintObj
    }, () => {
      this.props.constraintVal(this.state.constraint);
    })
  }

  render() {

    const keys = this.state.keys;
    const formgroup = keys.map((k, index) => {
      return (
        <Formgroup clearTag={this.props.clearTag} ref="formgroup" key={k} tapRemove={()=>this.remove(k)} keyindex={k} onConstraintChange={this.constraintChange} />
      )
    })

    return (     
      <div ref="constraint">
        <Row className={s.divLine}>
          <b className={s.divLineb}></b>
        </Row>
        <Row type="flex" justify="start">
          <Col span={3}>
            <p className={s.constraintLabel}>
              Constraint:
            </p>
          </Col>
          <Col span={1} offset={18}>
            <Button onClick={()=>this.add()}>+ 新增约束</Button>
          </Col>
        </Row>
        <Row className={s.constraintTips}>
          <Col span={18} offset={3}>
            <p><span className={s.constraintTipsT}>注1：</span>可使用参数约束："()"、"&&"(与)、"||"(或)、"regex"、"+"、"-"、"*"、"/"、"*"(任意)、"{}"(枚举,用','分隔)、">"、"&lt;"、"="、">="、"&lt;="、"~="(不等于)、"''"(空)。</p>
            <p><span className={s.constraintTipsT}>注2：</span>为了避免规则中出现的参数同名的情况，用前缀$u、$h、$p、$b分别表示url、header、parameter和body中的参数。</p>
          </Col>
        </Row>
        {formgroup}
      </div>
    );
  }
}

export default withStyles(s)(Constraint);
