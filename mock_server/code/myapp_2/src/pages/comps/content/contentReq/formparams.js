import React, { PropTypes, Component } from 'react';
import { Row, Col } from "antd"
import { Form, Input, Icon, Button, Select, Cascader } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
 
let uuid = 1;
class paramsComponent extends Component {
  constructor() {
    super();
  }
  remove (k) {
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

  add () {
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

  changeBorder (e) {
    e.preventDefault();
    console.log("preventDefault");
  }

  firstSelChange (value) {
    console.log(value);
  }



  onChangeParaDef (value) {
    console.log(value[1]);
  }

  dynamicParamDef () {
    return (
      <span>hellohellohello</span>
    )
  }

  render() {

    const options = [{
      value: "regex",
      label: "Regex",
      children: [{
        value: "regexEq",
        label: "等于"
      }]
    }, {
      value: 'neum',
      label: '枚举',
      children: [{
        value: 'neumEq',
        label: '等于'
      }]
    }, {
      value: 'int',
      label: '整数',
      children: [{
        value: 'intEq',
        label: '等于'
      }, {
        value: "intBe",
        label: "范围"
      }]
    }, {
      value: 'float',
      label: '小数',
      children: [{
        value: 'floatEq',
        label: '等于'
      }, {
        value: "floatBe",
        label: "范围"
      }]
    }, {
      value: 'bool',
      label: '布尔',
      children: [{
        value: 'boolAny',
        label: '任意'
      }, {
        value: "boolT",
        label: "True"
      }, {
        value: "boolF",
        label: "False"
      }]
    }, {
      value: 'str',
      label: 'String',
      children: [{
        value: 'strEq',
        label: '等于'
      }, {
        value: "strBe",
        label: "范围"
      }]
    }, {
      value: 'chinese',
      label: '中文',
      children: [{
        value: 'chineseEq',
        label: '等于'
      }, {
        value: "chineseBe",
        label: "范围"
      }]
    }, {
      value: 'email',
      label: 'Email',
    }, {
      value: 'ip',
      label: 'Ip',
    }, {
      value: 'url',
      label: 'Url',
    }, {
      value: 'thedate',
      label: '日期',
      children: [{
        value: 'date',
        label: 'Date'
      }, {
        value: "time",
        label: "Time"
      }, {
        value: "datetime",
        label: "Datetime"
      }]
    }, {
      value: 'address',
      label: '地址',
      children: [{
        value: 'region',
        label: 'Region'
      }, {
        value: "province",
        label: "Province"
      }, {
        value: "city",
        label: "City"
      }, {
        value: "country",
        label: "country"
      }, {
        value: "zip",
        label: "Zip"
      }]
    }, {
      value: "obj",
      label: "Object",
      children: [{
        value: "objEq",
        label: "等于"
      }, {
        value: "objBe",
        label: "范围"
      }]
    }, {
      value: "arr",
      label: "Array",
      children: [{
        value: "arrEq",
        label: "等于"
      }, {
        value: "arrBe",
        label: "范围"
      }]
    }];

    const { getFieldDecorator, getFieldValue } = this.props.form;
    
    getFieldDecorator('keys', { initialValue: [1] });
    const keys = getFieldValue('keys');
    const { name, tag } = this.props;
    const allOptionItems = ["Regex", "枚举", "整数", "小数", "布尔", "String", "中文", "Email", "Ip", "Url", "Array", "Object", "日期", "地址"];    
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
            <Col span={4}>
              <FormItem key={k}>
                {getFieldDecorator(`input-${k}`, {
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: `Please input the key name.`,
                  }],
                })(
                  <Input placeholder="key" className="paramsInputShort" />
                )}
              </FormItem>
            </Col>
            <Col span={18}>
                <Col span={7}>                  
                  <FormItem>
                    <Cascader
                      options={options}
                      expandTrigger="hover"
                      onChange={this.onChangeParaDef}
                      className="paramsSelect"
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
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            </Col>
            <Col span={1}>
              <Icon className="dynamic-plus-button"
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
          <Col span={4}>
            <p className="paramsLabel">{`${name} ( ${tag} ):`}</p>
          </Col>
          <Col span={17} offset={1}>
              {formItems}
          </Col>
        </Row>
      </div>
    );
  }
}

const FormParams = Form.create()(paramsComponent);
export default FormParams;