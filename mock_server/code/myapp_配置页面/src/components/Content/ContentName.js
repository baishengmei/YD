import React, { Component, PropTypes } from 'react';
import { Form, Select, Input } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
import s from './ContentName.css'

class ContentNameform extends Component {

  render() {

    const { getFieldDecorator, getFieldProps } = this.props.form;
    // const changeRulename = this.props.changeRulename;
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      }

    return (
      <Form>
        <Row>
          <Col span={7}>
            <FormItem label="规则名" {...formItemLayout} {...this.props}>
              {getFieldDecorator('rulename', {
                rules: [{ required: true, message: 'Please input the rule name!' }],
                // onChange: changeRulename
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={7} offset={10}>
            <FormItem label="项目名" {...formItemLayout}>
              {getFieldDecorator('projname', {
                rules: [{required: true, message: 'Please input the project name!' }]
              })(
                <Select placeholder="Project name">
                  <Option value="xinzhixuan">xinzhixuan</Option>
                  <Option value="yadk">yadk</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

const ContentName = Form.create()(ContentNameform);

export default withStyles(s)(ContentName);