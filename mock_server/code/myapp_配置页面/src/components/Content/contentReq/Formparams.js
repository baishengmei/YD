import React, { PropTypes, Component } from 'react';
import { Row, Col } from "antd"
import { Form, Input, Icon, Button, Select, Cascader } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'
import { options, allOptionItems } from './Utilsvari'


let uuid = 1;
class paramsComponent extends Component {
  constructor() {
    super();
  }
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one input
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
    console.log("keys:", keys);
  }

  changeBorder = (e) => {
    e.preventDefault();
    console.log("preventDefault");
  }

  firstSelChange = (value) => {
    console.log(value);
  }

  onChangeParaDef = (value) => {
    console.log(value[1]);
  }

  dynamicParamDef = () => {
    return (
      <span></span>
    )
  }

  // componentDidMount () {
    
  // }

  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    
    getFieldDecorator('keys', { initialValue: [1] });
    const keys = getFieldValue('keys');
    const { name, tag } = this.props;
    const optionItems2 = ["等于", "范围"]
    const paramOptions = allOptionItems.map((val, i)=>{
        return (
          <Option key={val}>{val}</Option>
        )
      })
    
    const formItems = keys.map((k, index) => { 

      return (
        <Form key={k}>
          <Row>
            <Col span={3}>
              <FormItem key={k}>
                {getFieldDecorator(`input-${k}`, {
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: `Please input the key name.`,
                  }],
                })(
                  <Input placeholder="key" className={s.paramsInputShort} />
                )}
              </FormItem>
            </Col>
            <Col span={19}>
                <Col span={5}>                  
                  <FormItem>
                    <Cascader
                      options={options}
                      expandTrigger="hover"
                      onChange={this.onChangeParaDef}
                      className={s.paramsSelect}
                      placeholder="Regex"
                    />
                  </FormItem>
                </Col>
                <Col span={17}>
                  { this.dynamicParamDef() }
                </Col>  
                
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
        </Form>      
      )
    });

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

const FormParams = Form.create()(paramsComponent);
export default withStyles(s)(FormParams);