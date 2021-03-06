import React, { Component, PropTypes } from 'react'
import { Form, Select, Input, Row, Col } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './ContentName.css'

const FormItem = Form.Item;
const Option = Select.Option;

class ContentNameform extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contentnameInput: "",
      contentnameSel: ""
    }
  }

  getInput = (event) => {
    this.setState({
      contentnameInput: event.target.value
    }, () => {
      console.log(this.props.clearTag,"clearTag in ContentName.js")
      this.props.form.setFieldsValue({
        rulename: this.state.contentnameInput
      })
      this.props.onSubmitSave(this.state.contentnameInput, this.state.contentnameSel);
    })
  }

  getSel = (value) => {
    this.setState({
      contentnameSel: value,
    }, () => {
      this.props.onSubmitSave(this.state.contentnameInput, this.state.contentnameSel);
    })   
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.clearTag) {
      this.props.form.resetFields();
    }
  }

  render() {

    const { getFieldDecorator, getFieldProps } = this.props.form;
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
                onChange: this.getInput
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={7} offset={10}>
            <FormItem label="项目名" {...formItemLayout}>
              {getFieldDecorator('projname', {
                rules: [{required: true, message: 'Please input the project name!' }],
                onChange: this.getSel
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