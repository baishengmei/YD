import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import ParamInput from './ParamInput'
import { Row, Col, Modal } from 'antd'
import IscBe from './IscBe'
import ParamSel from './ParamSel'
import FlBe from './FlBe'

let arrBe = {};//value所对应的对象
class ArrBe extends Component {

	constructor(props) {
		super(props);
		this.state = {
			datatype: "",
		}
	}
	//传入三个参数，分别是value值(val)，存值对象(obj)，key值(tag)
	arrtoVal2Obj = (val, obj, tag) => {
		this.props.toVal2Obj(val, obj, tag)
	}

	changeSel = (k) => {
		this.transType(k, arrBe)		
	}

	valEq = ( val) => {
		const tag = "value";
		const paramObj = this.props.paramObj;
		arrBe.value = val;
		this.val2obj(arrBe, paramObj, tag);
	}

	val2objBe = (val, obj, tagg) => {
		const tag = "value";
		const paramObj = this.props.paramObj;
		obj[tagg] = val;
		this.val2obj(arrBe, paramObj, tag)
	}

	val2obj = (val, obj, tag) => {
		this.props.toVal2Obj(val, obj, tag);
	}

	// 第一级参数定义为除了数组/对象外的其他数据类型时，如regex、float、int、日期、时间等，对应的value布局
	DynamicFormSome = (k) => {

		switch(k){
			case "Eq":
			return (<Col span={5}><ParamInput placevalue="value" onChangeInput={this.valEq} /></Col>)
			break;
			case "iscBe":
			return (
				<div>
					<IscBe tips="默认:-10^6 ~ 10^6" toVal2Obj={this.val2objBe} paramObj={arrBe} tag="value" />
				</div>
			)
			break;
			case "flBe":
			return (
				<div>
					<FlBe toVal2Obj={this.val2obj} toVal2Obj={this.val2objBe} paramObj={arrBe} />
				</div>
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
			case "objBe":
			return (
				<Col></Col>
			)
			break;
		}
	}

	transType = (k, paramKeyObj) => {
		if(/\w+Eq$/.test(k[1])){
			console.log("changeSel_2:等於");
			this.setState({
				datatype: "Eq",
			})
			paramKeyObj.type = k[0];
			delete paramKeyObj.value1;
			delete paramKeyObj.itemNum;
			delete paramKeyObj.contentType;
		}else if(/^intBe$|^strBe$/.test(k[1])){
			console.log("changeSel_2:整數、str和中文的范围", k);
			//注意：：：这里实际并没有引入中文的情况，如若添加，可在此加入
			this.setState({
				datatype: "iscBe"
			})
			if(k[0]=="str"){
				paramKeyObj.type = "string"
			}else{
				paramKeyObj.type = k[0];
			}
			delete paramKeyObj.value1;
			delete paramKeyObj.itemNum;
			delete paramKeyObj.contentType;
		}else if(/^floatBe$/.test(k[1])){
			console.log("changeSel_2:小数范围", k);
			this.setState({
				datatype: "flBe"
			})
			paramKeyObj.type = k[0];
			delete paramKeyObj.itemNum;
			delete paramKeyObj.contentType;
		}else if(/^arrBe$/.test(k[1])){
			console.log("changeSel_2:数组自定义", k);
			this.setState({
				datatype: "arrBe"
			})
			paramKeyObj.type = k[0];
			delete paramKeyObj.value1;
			delete paramKeyObj.contentType;
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			//注意，当为bool时，是需要传value值得，其他项不需要
			console.log("changeSel_2:bool/email/ip/url/address/thedate", k)
			this.setState({
				datatype: "non"
			})
			paramKeyObj.type = k[0];
			if(paramKeyObj.type == "bool"){
				if(k[1].substring(k[1].length-1) == "T"){
					paramKeyObj.value = "true";
				}else if(k[1].substring(k[1].length-1) == "F"){
					paramKeyObj.value = "false";
				}else {
					paramKeyObj.value = "";
				}	
				delete paramKeyObj.contentType;		
			}else if(paramKeyObj.type == "address" || paramKeyObj.type == "thedate"){
				paramKeyObj.contentType = k[1];
				delete paramKeyObj.value;
			}else{
				delete paramKeyObj.value;
				delete paramKeyObj.contentType;
			}
			delete paramKeyObj.value1;
			delete paramKeyObj.itemNum;
		}else if(/^objBe$/.test(k[1])){
			console.log("changeSel_2:对象自定义", k);
			this.setState({
				datatype: "objBe"
			})
			paramKeyObj.type=k[0];
			delete paramKeyObj.value1;
			delete paramKeyObj.itemNum;
			delete paramKeyObj.contentType;
		}
	}

	render() {

		return (
			<div>
				<Row>
					<Col span={3} offset={1}>
						<div className={s.arrLabel}>项数：</div>
					</Col>
					<Col span={20}>
						<IscBe tips="项数/默认-10^6 ~ 10^6" tag="itemNum" toVal2Obj={this.arrtoVal2Obj} paramObj={this.props.paramObj}/>
					</Col>
				</Row>
				<Row>
					<Row>
						<Col span={3} offset={1}>
							<div className={s.arrLabel}>子项：</div>
						</Col>
					
						<Col span={5}>
							<ParamSel paramseldisabled={false}  onChangeSel={this.changeSel}/>
						</Col>
						<Col span={15}>
		                  {this.DynamicFormSome(this.state.datatype)}
		                </Col>
	                </Row>
	                <Row>
	                	<Col span={19} offset={4}>
	               		</Col>
	                </Row>
				</Row>
			</div>
		)
	}
}

export default withStyles(s)(ArrBe);