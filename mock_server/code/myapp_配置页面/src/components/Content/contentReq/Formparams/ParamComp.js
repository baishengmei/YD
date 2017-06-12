import React, { PropTypes, Component } from 'react';
import { Row, Col } from "antd"
import { Form, Input, Cascader } from 'antd'
const FormItem = Form.Item
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import { options, allOptionItems } from '../Utilsvari'
import ParamInput from './ParamInput'
import ParamSel from './ParamSel'

class paramComp extends Component {

	changeSel = (k) => {
		console.log("event.target.value", k);
	}
	
	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		return (
			<div>
				<Col span={3}>
	            	<ParamInput />
	            </Col>
	            <Col span={19}>
	                <Col span={5}>
	                  <ParamSel onChangeSel={this.changeSel}/>
	                </Col>
	                <Col span={17}>
	                  <div>hello</div>
	                </Col>                  
	            </Col>
            </div>
		)
	}
}
const ParamComp = Form.create()(paramComp);
export default withStyles(s)(ParamComp);