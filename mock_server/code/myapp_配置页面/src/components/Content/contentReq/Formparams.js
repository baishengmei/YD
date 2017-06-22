import React, { PropTypes, Component } from 'react';
import { Row, Col } from "antd"
import { Form, Input, Icon, Button, Select, Cascader } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'
// import ParamComp from './Formparams/ParamComp'
import ParamComp from './Formparams/Example'

let uuid = 1;
let outKeyVals = {};
outKeyVals.$h = {};
outKeyVals.$b = {};
outKeyVals.$q = {};
outKeyVals.$p = {};
outKeyVals.$in = {};
let keyVals = {}; 
class paramsComponent extends Component {
  constructor() {
    super();
  }
  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

//将k值传进来，以及paramform的值
  paramCompChange = (paramform) => {
    const tagsign = this.props.tagsign;
    if(tagsign == "$h"){
      outKeyVals.$h = Object.assign(outKeyVals.$h, paramform);
    }else if(tagsign == "$q"){
      outKeyVals.$q = Object.assign(outKeyVals.$q, paramform);
    }else if(tagsign == "$b"){
      outKeyVals.$b = Object.assign(outKeyVals.$b, paramform);
    }else if(tagsign == "$p"){
      outKeyVals.$p = Object.assign(outKeyVals.$p, paramform);
    }else if(tagsign == "$in"){
      outKeyVals.$in = Object.assign(outKeyVals.$in, paramform);
    }
    this.props.formParamsVal(outKeyVals);    
  }

  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    
    getFieldDecorator('keys', { initialValue: [1] });
    const keys = getFieldValue('keys');
    const { name, tag } = this.props;
    const optionItems2 = ["等于", "范围"]
    
    const formItems = keys.map((k, index) => { 

      return (
        <div key={k}>
          <Row>
            <Col span={22}>
              <ParamComp onParamCompChange={this.paramCompChange}/>
            </Col>
            <Col span={1}>
              <Icon
                className={s.dynamic_delete_button}
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            </Col>
            <Col span={1}>
              <Icon className={s.dynamic_plus_button}
                type="plus-circle-o"
                onClick={this.add.bind(this)}
              />
            </Col>
          </Row> 
        </div>      
      )
    });

    if(tag == "" && name == ""){
      return (
        <div>
          <Col span={24}>
            {formItems}
          </Col>
        </div>
      )
    }else{
      return (     
        <div>        
          <Row type="flex" justify="start">
            <Col span={3}>
              <p className={s.paramsLabel}>{`${name} ( ${tag} ):`}</p>
            </Col>
            <Col span={19} offset={1}>
                {formItems}
            </Col>
          </Row>
        </div>
      );
    }    
  }
}

const FormParams = Form.create()(paramsComponent);
export default withStyles(s)(FormParams);