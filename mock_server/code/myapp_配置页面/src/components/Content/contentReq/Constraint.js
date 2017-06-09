import { Row, Col, Icon, Button, Input } from 'antd';
import React, { Component, PropTypes } from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'
 
class Constraint extends Component {

  render() {

    return (     
      <div>  
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
            <Button>+ 新增约束</Button>
          </Col>
        </Row>
        <Row className={s.constraintTips}>
          <Col span={18} offset={3}>
            <p><span className={s.constraintTipsT}>注1：</span>可使用参数约束："()"、"&&"(与)、"||"(或)、"regex"、"+"、"-"、"*"、"/"、"*"(任意)、"{}"(枚举,用','分隔)、">"、"&lt;"、"="、">="、"&lt;="、"~="(不等于)、"''"(空)。</p>
            <p><span className={s.constraintTipsT}>注2：</span>为了避免规则中出现的参数同名的情况，用前缀$u、$h、$p、$b分别表示url、header、parameter和body中的参数。</p>
          </Col>
        </Row>

        <Row>
          <Col span={18} offset={3}>
            <Row>
              <div className={s.g}>
                Group1($G1)
              </div>
              <div className={s.gDel}>
                <p>删除</p>
              </div>
            </Row>
            <Row>
              <div className={s.group}>
                <div className={s.groupIf}> 
                  <Col span={3}>
                    <p className={s.groupIfT}>约束条件:</p>
                  </Col>
                  <Col span={19} offset={1}>
                    <input className={s.groupIfInput}/>
                  </Col>
                </div>
                <div>
                  <Col span={3}>
                    <div className={s.groupExpT}>约束表达式:</div>
                  </Col>
                  <Col span={21}>
                    <Input className={s.groupExp} type="textarea" placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 6 }} />
                  </Col>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
  
      </div>
    );
  }
}

export default withStyles(s)(Constraint);
