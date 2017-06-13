import React, { PropTypes, Component } from 'react';
import { Row, Col } from "antd"
import { Form, Input } from 'antd'
const FormItem = Form.Item
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'

class paramInput extends Component {

	render() {

		const { getFieldDecorator, getFieldValue } = this.props.form;
		const placevalue = this.props.placevalue;

		return (
			<FormItem>
	            {getFieldDecorator(`input`, {
	              	rules: [{
		                required: true,
		                whitespace: true,
		                message: `Please input the ${placevalue}.`,
		            }],
	            })(
	              	<Input placeholder={placevalue} className={s.paramsInputShort} />
	            )}
	        </FormItem>
		)
	}
}


const ParamInput = Form.create()(paramInput);
export default withStyles(s)(ParamInput);