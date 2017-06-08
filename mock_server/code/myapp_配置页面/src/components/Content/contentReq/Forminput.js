import { Form, Input, Icon, Button } from 'antd';
const FormItem = Form.Item;
import React, { Component, PropTypes } from "react"
import { Row, Col } from "antd"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'
 
let uuid = 1;
class inputComponent extends Component {
  remove (k)  {
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

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    
    getFieldDecorator('keys', { initialValue: [1] });
    const keys = getFieldValue('keys');
    const { name, tag } = this.props;
    const formItems = keys.map((k, index) => {
      
      return (
        <Col span={24} key={k}>
          <Col span={22}>
              <Form>
                <FormItem key={k}>
                  <Row type="flex" justify="start">
                    <Col span={18}>
                      {getFieldDecorator(`input-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: `Please input the legal ${name.toLowerCase()} or delete this field.`,
                       }],
                      })(
                        <Input onChange={this.changeBorder} placeholder={name} className={s.paramsInput} />
                      )}
                    </Col>                  
                  </Row>
                </FormItem>
              </Form>
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
        </Col>
      );
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

const FormInput = Form.create()(inputComponent);
export default withStyles(s)(FormInput);