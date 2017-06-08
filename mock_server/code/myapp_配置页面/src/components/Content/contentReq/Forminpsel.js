//<FormInpSel type="Select" name="Method" tag="$M" optval="GET,DELETE,POST,PUT,OPTIONS" />
//通过上面的方式进行使用
import { Form, Select, Icon, Button, Input } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import React from "react"
import { Row, Col } from "antd"
 
let uuid = 1;
class inputselectComponent extends React.Component {
  remove (k)  {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one select
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

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [1] });
    const keys = getFieldValue('keys');
    // const { name, tag, type, optval } = this.props;
    const { name, tag, type } = this.props;

    if(type.toLowerCase() === "select"){
      var optval = this.props.optval;
      var formOptions = optval.split(",").map((val, i) => {
        return (
        <Option key={i} value={val}>{val.toUpperCase()}</Option>
        )
      })
    }

    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...formItemLayout}
          label=''
          required={false}
          key={k}
        >
        <Row type="flex" justify="start">
        <Col span={20}>
          {getFieldDecorator(`names-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            }],
          })(
            (type.toLowerCase()==="input" ? 
              <Input placeholder={name} className="paramsInput" /> : 
              <Select placeholder={optval.split(",")[0]} className="paramSelect">
                {formOptions}
              </Select>
            )
          )}
          </Col>
          <Col span={1} offset={2}>
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
        </FormItem>
      );
    });
    return (
      
      <div>        
        <Row type="flex" justify="start">
          <Col span={4}>
            <p className="paramsLabel">{`${name} ( ${tag} ):`}</p>
          </Col>
          <Col span={18} offset={2}>
            <Form>
              {formItems}
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const FormInpSel = Form.create()(inputselectComponent);
export default FormInpSel;