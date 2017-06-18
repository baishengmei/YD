import { Form, Input, Icon, Button, Row, Col } from 'antd';
const FormItem = Form.Item;
import React, { Component, PropTypes } from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'
 
let uuid = 1;
class inputComponentOnly extends Component {

  constructor(props) {
    super(props);
    this.state = {
      aaa: "aa",
      tag: "",
      placeholder: ""
    }
  }

  componentDidMount() {
    const { name, tag, placeval, thevalue } = this.props;
    if(tag == undefined){
      this.setState({
        tag: ""
      })
    }else{
      this.setState({
        tag: "("+tag+"):"
      })
    }
    if(placeval == undefined){
      this.setState({
        placeval: ""
      })
    }else{
      this.setState({
        placeval: placeval
      })
    }
    if(thevalue !== undefined){
      this.props.form.setFieldsValue({
        input: thevalue
      });
    }
  }

  changeBorder = (e) => {
    const { formInputOnlyVal } = this.props;
    formInputOnlyVal(e.target.value);
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { name, tag, placeval, tip, thevalue } = this.props;
    
    return (     
      <div>        
        <Row type="flex" justify="start">
          <Col span={3}>
            <p className={s.paramsLabel}>{`${name}  ${this.state.tag} `}</p>
          </Col>
          <Col span={19} offset={1}>
            <Col span={22}>
              <Form>
                <FormItem>
                  <Row type="flex" justify="start">
                    <Col span={18}>
                      {getFieldDecorator(`input`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: `Please input the legal ${name.toLowerCase()} or delete this field.`,
                       }],
                      })(
                        <Input placeholder={placeval} onChange={this.changeBorder} className={s.paramsInput} />
                      )}
                    </Col>                  
                  </Row>
                  <Row>{tip}</Row>
                </FormItem>
              </Form>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

const FormInputOnly = Form.create()(inputComponentOnly);
export default withStyles(s)(FormInputOnly);