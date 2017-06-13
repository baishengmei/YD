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

	constructor(props) {
		super(props);
		this.state = {
			datatype: 0,
			datatype2: 0
		}
	}

	DynamicFormArr = (k) => {
		switch(k){
			case "arrBe":
			return (
				<div>
					<Row>
						<Col span={3} offset={1}>
							<div className={s.arrLabel}>项数：</div>
						</Col>
						<Col span={4}>
							<ParamInput placevalue="min"/>
						</Col>
						<Col span={1}>~</Col>
						<Col span={4}>
							<ParamInput placevalue="max"/>
						</Col>
						<Col className={s.noteTips}>(array项数)</Col>
					</Row>
					<Row>
						<Col span={3} offset={1}>
							<div className={s.arrLabel}>子项：</div>
						</Col>
						<Col span={6}>
							<ParamSel onChangeSel={this.changeSel2} />
						</Col>
						<Col>
		                  <div>{this.DynamicFormSome(this.state.datatype2)}</div>
		                </Col>
					</Row>
				</div>
			)
			break;
		}
	}

	DynamicFormSome = (k) => {
		switch(k){
			case "Eq":
			return (<Col span={5}><ParamInput placevalue="value"/></Col>)
			break;
			case "iscBe":
			return (
				<div>
					<Col span={3}>
						<ParamInput placevalue="min"/>
					</Col>
					<Col span={1}>~</Col>
					<Col span={3}>
						<ParamInput placevalue="max"/>
					</Col>
				</div>
			)
			break;
			case "flBe":
			return (
				<Col>
					<Row>
						<Col span={3}>
							<ParamInput placevalue="min"/>
						</Col>
						<Col span={1}>~</Col>
						<Col span={3}>
							<ParamInput placevalue="max"/>
						</Col>
						<Col className={s.noteTips}>(整数部分取值范围)</Col>
					</Row>
					<Row>
						<Col span={3}>
							<ParamInput placevalue="min"/>
						</Col>
						<Col span={1}>~</Col>
						<Col span={3}>
							<ParamInput placevalue="max"/>
						</Col>
						<Col className={s.noteTips}>(小数部分取值范围)</Col>
					</Row>
				</Col>
			)
			break;
			case "arrBe":
			return (
				<div></div>
			)
			break;
			case "non":
			return (
				<div></div>
			)
			break;
		}
	}

	changeSel = (k) => {
		console.log("select.value", k[1]);
		if(/\w+Eq$/.test(k[1])){
			console.log("等於");
			this.setState({
				datatype: "Eq"
			})
		}else if(/^intBe$|^strBe$|^chineseBe$/.test(k[1])){
			console.log("整數、str和中文的范围");
			this.setState({
				datatype: "iscBe"
			})
		}else if(/^floatBe$/.test(k[1])){
			console.log("小数范围");
			this.setState({
				datatype: "flBe"
			})
		}else if(/^arrBe$/.test(k[1])){
			console.log("数组范围");
			this.setState({
				datatype: "arrBe"
			})
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			this.setState({
				datatype: "non"
			})
		}
	}

	changeSel2 = (k) => {
		console.log("select.value", k[1]);
		if(/\w+Eq$/.test(k[1])){
			console.log("等於");
			this.setState({
				datatype2: "Eq"
			})
		}else if(/^intBe$|^strBe$|^chineseBe$/.test(k[1])){
			console.log("整數、str和中文的范围");
			this.setState({
				datatype2: "iscBe"
			})
		}else if(/^floatBe$/.test(k[1])){
			console.log("小数范围");
			this.setState({
				datatype2: "flBe"
			})
		}else if(/^arrBe$/.test(k[1])){
			console.log("数组范围");
			this.setState({
				datatype2: "arrBe"
			})
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			this.setState({
				datatype2: "non"
			})
		}
	}
	
	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		return (
			<div>
				<Col span={3}>
	            	<ParamInput placevalue="key" />
	            </Col>
	            <Col span={19}>
	            	<Row>
		                <Col span={5}>
		                  	<ParamSel onChangeSel={this.changeSel}/>		                  
		                </Col>
		                <Col span={17}>
		                  <div>{this.DynamicFormSome(this.state.datatype)}</div>
		                </Col>
	               	</Row>
	               	<Row>
		               	<Col span={16}>
		               		{this.DynamicFormArr(this.state.datatype)}
		               	</Col>
	               	</Row>
	            </Col>
            </div>
		)
	}
}
const ParamComp = Form.create()(paramComp);
export default withStyles(s)(ParamComp);