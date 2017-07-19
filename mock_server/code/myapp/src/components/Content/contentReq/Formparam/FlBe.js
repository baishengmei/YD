import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import ParamInput from './ParamInput'
import { Row, Col, Modal } from 'antd'

class FlBe extends Component {

	constructor(props) {
		super(props);
		this.state = {
			//clearInput用来设置input框是否清空的标志，true表示清空
			clearInput: false,
			//iscBe用于保存整数范围、字符串范围、中文范围值
			flBeInte: [-Math.pow(10, 6), Math.pow(10,6)],
			flBeDeci: [0, 6]
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
	valBeFin_1 = (val) => {
		const paramObj = this.props.paramObj;
		const tag = "value";
		if(/^\d+$/.test(val) == false && val !== ""){
			this.setState({
				clearInput: true,
			}, () => {
				this.error("Your input isn't integer!");
			})
			
		}else{
			this.setState({
				clearInput: false,
				flBeInte: [val, this.state.flBeInte[1]],
			}, () => {
				// for(let i in paramObj){
				// 	this.val2obj(this.state.flBeInte, paramObj[i], tag);
				// }
				this.val2obj(this.state.flBeInte, paramObj, tag);
			})
		}		
	}

	valBeFin_2 = (val) => {
		const paramObj = this.props.paramObj;
		const tag = "value";
		if(/^\d+$/.test(val) == false && val !== ""){
			this.setState({
				clearInput: true,
			}, () => {
				this.error("Your input isn't integer!");
			})
			
		}else{
			this.setState({
				clearInput: false,
				flBeInte: [this.state.flBeInte[0], val],
			}, () => {
				// for(let i in paramObj){
				// 	this.val2obj(this.state.flBeInte, paramObj[i], tag);
				// }
				this.val2obj(this.state.flBeInte, paramObj, tag);
			})
		}		
	}

	valBeFde_1 = (val) => {
		const paramObj = this.props.paramObj;
		const tag = "value1";
		if(/^\d+$/.test(val) == false && val !== ""){
			this.setState({
				clearInput: true,
			}, () => {
				this.error("Your input isn't integer!");
			})
			
		}else{
			this.setState({
				clearInput: false,
				flBeDeci: [val, this.state.flBeDeci[1]],
			}, () => {
				// for(let i in paramObj){
				// 	this.val2obj(this.state.flBeDeci, paramObj[i], tag);
				// }
				this.val2obj(this.state.flBeDeci, paramObj, tag);
			})
		}	
	}

	valBeFde_2 = (val) => {
		const paramObj = this.props.paramObj;
		const tag = "value1";
		if(/^\d+$/.test(val) == false && val !== ""){
			this.setState({
				clearInput: true,
			}, () => {
				this.error("Your input isn't integer!");
			})
			
		}else{
			this.setState({
				clearInput: false,
				flBeDeci: [this.state.flBeDeci[1], val],
			}, () => {
				// for(let i in paramObj){
				// 	this.val2obj(this.state.flBeDeci, paramObj[i], tag);
				// }
				this.val2obj(this.state.flBeDeci, paramObj, tag);
			})
		}	
	}

	val2obj = (val, obj, tag) => {
		this.props.toVal2Obj(val, obj, tag);
	}

	render() {

		return (
			<Col>
				<Row>
					<Col span={3}>
						<ParamInput clearInput={this.state.clearInput} placevalue="min" onChangeInput={this.valBeFin_1} />
					</Col>
					<Col span={1}>~</Col>
					<Col span={3}>
						<ParamInput clearInput={this.state.clearInput} placevalue="max" onChangeInput={this.valBeFin_2} />
					</Col>
					<Col className={s.noteTips}>整数部分范围(默认)10^6 ~ 10^6</Col>
				</Row>
				<Row>
					<Col span={3}>
						<ParamInput clearInput={this.state.clearInput} placevalue="min" onChangeInput={this.valBeFde_1} />
					</Col>
					<Col span={1}>~</Col>
					<Col span={3}>
						<ParamInput clearInput={this.state.clearInput} placevalue="max" onChangeInput={this.valBeFde_2} />
					</Col>
					<Col className={s.noteTips}>小数部分范围(默认)0~6</Col>
				</Row>
			</Col>
		)
	}
}

export default withStyles(s)(FlBe);