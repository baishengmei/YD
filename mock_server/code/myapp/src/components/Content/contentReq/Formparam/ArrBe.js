import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import ParamInput from './ParamInput'
import { Row, Col, Modal } from 'antd'
import IscBe from './IscBe'
import ParamSel from './ParamSel'
import FlBe from './FlBe'
import ObjBe from './objBe'

let arrBe = {};//是一个对象，包含属性type：arr
let objValFirst = {};
class ArrBe extends Component {

	constructor(props) {
		super(props);
		this.state = {
			datatype: "",
			selDisabled: true
		}
	}

	postVal = (val, tag) => {
		this.props.postVal(val, tag);
	}
	//传入三个参数，分别是value值(val)，存值对象(obj)，key值(tag)。用于项数值传递
	arrtoVal2Obj = (val, obj, tag) => {
		if(val!==undefined && val!=="" && val.length!==0){
			this.setState({
				selDisabled: false
			}, () => {
				obj[tag] = val;
				arrBe = this.deepCopy(obj);
				this.props.postVal(obj, this.props.arrTag);
			})
		}
		
	}

	valEq = (val) => {
		//val为第一级下拉框对应的value值；
		const tag = "value";
		arrBe.value = val;
		this.props.postVal(arrBe, this.props.arrTag+1);
	}

	//将value组件值，保存到对象中
	val2obj = (val, obj, tag)=> {
		//val为第二级及多级下拉框对应的value值，obj为{type: "neum", value: "apple, bananna"},tag为value字符串
		if(tag !== "noTag"){
			obj[tag] = val;
		}

		if(this.state.datatype.trim() == "flBe"){
			if(obj.value == "" || obj.value == undefined){
				obj.value = [-Math.pow(10, 6), Math.pow(10,6)];
			}
		}
		this.props.postVal(obj, this.props.arrTag+1);
	}

	componentDidMount() {
		arrBe = this.deepCopy(this.props.paramObj);
	}

	// 第二及更多级时参数定义为除了数组/对象外的其他数据类型时，如regex、float、int、日期、时间等，对应的value布局
	DynamicFormSome = (k) => {
		switch(k){
			case "Eq":
			return (<Col span={5}><ParamInput placevalue="value" onChangeInput={this.valEq} /></Col>)
			break;
			case "iscBe":
			return (
				<div>
					<IscBe tips="默认:-10^6 ~ 10^6" toVal2Obj={this.val2obj} paramObj={arrBe} tag="value" />
				</div>
			)
			break;
			case "flBe":
			return (
				<div>
					<FlBe toVal2Obj={this.val2obj} toVal2Obj={this.val2obj} paramObj={arrBe} />
				</div>
			)
			break;
			case "arrBe":
			case "non":
			case "objBe":
			return (
				<Col></Col>
			)
			break;
		}
	}

	// 第一级参数定义为数组、对象范围时，对应的value布局
	DynamicFormArrObj = (k) => {
		switch(k){
			case "arrBe":
			return (
				<div>
					<ArrBe toVal2Obj={this.val2obj} paramObj={arrBe} arrTag={this.props.arrTag+1} postVal={this.postVal}/>
				</div>
			)
			break;
			case "objBe":			
			return (
				<div>
					<ObjBe toVal2Obj={this.val2obj} paramObj={arrBe} />
				</div>
			)
			break;
			default:
			return;
		}
	}

	changeSel = (k) => {
		arrBe = {};
		arrBe = this.transType(k, {});
	}

	transType = (k, obj) => {	
		var paramKeyObj = this.deepCopy(obj);		
		if(/\w+Eq$/.test(k[1])){
			this.setState({
				datatype: "Eq",
			}, () => {
				paramKeyObj.type = k[0];
				delete paramKeyObj.value1;
				delete paramKeyObj.itemNum;
				delete paramKeyObj.contentType;
			})

			
		}else if(/^intBe$|^strBe$/.test(k[1])){
			//注意：：：这里实际并没有引入中文的情况，如若添加，可在此加入
			this.setState({
				datatype: "iscBe"
			}, () => {
				if(k[0]=="str"){
					paramKeyObj.type = "string"
				}else{
					paramKeyObj.type = k[0];
				}
				delete paramKeyObj.value1;
				delete paramKeyObj.itemNum;
				delete paramKeyObj.contentType;
			})
			
		}else if(/^floatBe$/.test(k[1])){
			this.setState({
				datatype: "flBe"
			}, () => {
				paramKeyObj.type = k[0];
				delete paramKeyObj.itemNum;
				delete paramKeyObj.contentType;
			})
			
		}else if(/^arrBe$/.test(k[1])){
			this.setState({
				datatype: "arrBe"
			}, () => {
				paramKeyObj.type = k[0];
				delete paramKeyObj.value1;
				delete paramKeyObj.contentType;
				// this.props.postVal(paramKeyObj, this.props.arrTag+1);
			})
			
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			//注意，当为bool时，是需要传value值得，其他项不需要
			this.setState({
				datatype: "non"
			}, () => {
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
				this.props.postVal(paramKeyObj, this.props.arrTag+1);
			})
			
		}else if(/^objBe$/.test(k[1])){
			this.setState({
				datatype: "objBe"
			}, () => {
				paramKeyObj.type=k[0];
				delete paramKeyObj.value1;
				delete paramKeyObj.itemNum;
				delete paramKeyObj.contentType;
				objValFirst = this.deepCopy(paramKeyObj);
			})			
		}
		return paramKeyObj;
		
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
							<ParamSel paramseldisabled={this.state.selDisabled}  onChangeSel={this.changeSel}/>
						</Col>
						<Col span={15}>
		                  {this.DynamicFormSome(this.state.datatype)}
		                </Col>
	                </Row>
	                <Row>
	                	<Col span={22} offset={2}>
	                		{this.DynamicFormArrObj(this.state.datatype)}
	               		</Col>
	                </Row>
				</Row>
			</div>
		)
	}

	deepCopy = (source) => {
	    let result ={};
	    for(let key in source){
	      result[key]=typeof source[key] === 'object'?this.deepCopy(source[key]): source[key];
	    }
	    return result;
	}

}

export default withStyles(s)(ArrBe);