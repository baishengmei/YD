import React, { PropTypes, Component } from 'react';
import { Row, Col, Form, Cascader, Modal } from 'antd'
const FormItem = Form.Item
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import { options, allOptionItems } from '../Utilsvari'

class paramSel extends Component {
	static propTypes = {
		paramseldisabled: PropTypes.bool.isRequired,
	};

	onChangeParaDef = (value) => {
	    this.props.onChangeSel(value);
	}

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;

		return (
			<FormItem>
                <Cascader
                	ref="sel1"
                  	options={options}
                 	expandTrigger="hover"
                  	onChange={this.onChangeParaDef}
                  	className={s.paramsSelect}
                  	placeholder="Regex"
                  	disabled={this.props.paramseldisabled}
                />
            </FormItem>
		)
	}
}


const ParamSel = Form.create()(paramSel);
export default withStyles(s)(ParamSel);