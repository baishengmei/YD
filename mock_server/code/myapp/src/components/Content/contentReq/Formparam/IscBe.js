import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import ParamInput from './ParamInput'
import { Row, Col, Modal } from 'antd'

class IscBe extends Component {

	constructor(props) {
		super(props);
		this.state = {
			//clearInput用来设置input框是否清空的标志，true表示清空
			clearInput: false,
			//iscBe用于保存整数范围、字符串范围、中文范围值
			iscBe: [-Math.pow(10, 6), Math.pow(10,6)],
		}
	}

	//错误提示框
	error = (errMsg) => {
	  	Modal.error({
	    	title: 'This is an error message',
	    	content: errMsg,
	  	});
	}

	//当value组件为整数范围、字符串范围、中文范围时，value组件的传值函数
	valBeISC_1 = (val) => {
		const tag = this.props.tag;
		const paramObj = this.props.paramObj;
		if(/^\d+$/.test(val) == false && val !== ""){
			this.setState({
				clearInput: true,
			}, () => {
				this.error("Your input isn't integer!");
			})
			
		}else{
			this.setState({
				clearInput: false,
				iscBe: [val, this.state.iscBe[1]],
			}, () => {
				this.val2obj(this.state.iscBe, paramObj, tag);
			})
		}		
	}
	valBeISC_2 = (val) => {
		const tag = this.props.tag;
		const paramObj = this.props.paramObj;
		if(/^\d+$/.test(val) == false && val !== ""){
			this.setState({
				clearInput: true,
			}, () => {
				this.error("Your input isn't integer!");
			})
		}else{
			this.setState({
				iscBe: [this.state.iscBe[0], val],
			}, () => {
				this.val2obj(this.state.iscBe, paramObj, tag);
			})
		}
	}

	val2obj = (val, obj, tag) => {
		this.props.toVal2Obj(val, obj, tag);
	}

	render() {

		return (
			<Row>
				<Col span={3}>
					<ParamInput clearInput={this.state.clearInput} placevalue="min" required="true" onChangeInput={this.valBeISC_1} />
				</Col>
				<Col span={1}>~</Col>
				<Col span={3}>
					<ParamInput clearInput={this.state.clearInput} placevalue="max" onChangeInput={this.valBeISC_2} />
				</Col>
				<Col className={s.noteTips_2}>{this.props.tips}</Col>
			</Row>
		)
	}
}

export default IscBe;