import React, { PropTypes, Component } from 'react';
import { Row, Col } from "antd"
import { Form, Cascader } from 'antd'
const FormItem = Form.Item
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import { options, allOptionItems } from '../Utilsvari'

class paramSel extends Component {

	onChangeParaDef = (value) => {
	    console.log("value:",value);
	    this.props.onChangeSel(value);
	}

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;

		return (
			<FormItem>
                <Cascader
                  	options={options}
                 	expandTrigger="hover"
                  	onChange={this.onChangeParaDef}
                  	className={s.paramsSelect}
                  	placeholder="Regex"
                />
            </FormItem>
		)
	}
}


const ParamSel = Form.create()(paramSel);
export default withStyles(s)(ParamSel);