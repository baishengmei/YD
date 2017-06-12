import { Row, Col, Icon, Button, Input } from 'antd';
import React, { Component, PropTypes } from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'
import Formgroup from './Formgroup'

let uuid = 1;
class Constraint extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keys: [1],
    }
  }

  remove = (k) => {
    const keys = this.state.keys;
    if (keys.length === 1) {
      return;
    };console.log(keys);
    // if(k !== Math.max.apply(null, keys)){
    //   return;
    // }
    const arrkeys = [];
    for(let temp=1; temp<=keys.length-1; temp++){
      arrkeys.push(temp);
    }
    this.setState({
      keys: arrkeys,
    });
    // this.setState({
    //   keys: keys.filter(key => key !== k),
    // });
  }

  add = () => {
    // uuid++;
    const keys = this.state.keys;
    uuid = keys.length +1;
    const nextKeys = keys.concat(uuid);
    this.setState({
      keys: nextKeys
    });
    console.log("keys:", keys);
  }

  render() {

    const keys = this.state.keys;

    const formgroup = keys.map((k, index) => {
      return (
        <Formgroup key={k} tapRemove={()=>this.remove(k)} keyindex={k} />
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
