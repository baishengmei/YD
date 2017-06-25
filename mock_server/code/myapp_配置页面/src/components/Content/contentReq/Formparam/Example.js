import React, { PropTypes, Component } from 'react';
import { Row, Col, Icon } from "antd"
import { Form, Input, Cascader } from 'antd'
const FormItem = Form.Item
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import { options, allOptionItems } from '../Utilsvari'
import ParamInput from './ParamInput'
import ParamSel from './ParamSel'
import IscBe from './IscBe'
import FlBe from './FlBe'
import ArrBe from './ArrBe'
import ObjBe from './ObjBe'

//paramObj对象的key有type、value、value1、itemNum、contentType
let paramObj = {};
let paramKey2ValObj = {};//paramObj对象的key所对应的value对象
class paramComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: true,
			datatype: "",
			indexTemp: [1],
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log(paramObj, "组件刷新后显示componentDidUpdate")
	}

	//当第一级参数定义为“等于”类型时，value组件的传值函数
	valEq = (val) => {
		const tag = "value";
		this.val2obj(val, paramKey2ValObj, tag);
		this.props.onParamCompChange(paramObj);
	}

	//将value组件值，保存到对象中
	val2obj = (val, obj, tag)=> {
		obj[tag] = val;
		this.props.onParamCompChange(paramObj);
	}

	// 第一级参数定义为数组/对象范围时，对应的value布局
	DynamicFormArrObj = (k) => {
		switch(k){
			case "arrBe":
			return (
				<div>
					<ArrBe toVal2Obj={this.val2obj} paramObj={paramKey2ValObj} />
				</div>
			)
			break;
			case "objBe":			
			return (
				<div>
					<ObjBe toVal2Obj={this.val2obj} paramObj={paramKey2ValObj} />
				</div>
			)
			break;
			default:
			return;
		}
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
					<IscBe tips="默认:-10^6 ~ 10^6" toVal2Obj={this.val2obj} paramObj={paramKey2ValObj} tag="value" />
				</div>
			)
			break;
			case "flBe":
			return (
				<div>
					<FlBe toVal2Obj={this.val2obj} toVal2Obj={this.val2obj} paramObj={paramKey2ValObj} />
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

	//第一级参数定义变化时，设置this.state.datatype。
	changeSel = (k) => {
		this.transType(k, paramKey2ValObj);
	}

	transType = (k, paramKeyObj) => {
		if(/\w+Eq$/.test(k[1])){
			console.log("changeSel:等於");
			this.setState({
				datatype: "Eq",
			})
			paramKeyObj.type = k[0];
			delete paramKeyObj.value1;
			delete paramKeyObj.itemNum;
			delete paramKeyObj.contentType;
		}else if(/^intBe$|^strBe$/.test(k[1])){
			console.log("changeSel:整數、str和中文的范围", k);
			//注意：：：这里实际并没有引入中文的情况，如若添加，可在此加入
			this.setState({
				datatype: "iscBe"
			})
			if(k[0]=="str"){
				paramKeyObj.type = "string"
				console.log("strrrrrrrrrrrrrrrrrrrrrrrrrr")
			}else{
				paramKeyObj.type = k[0];
				console.log("not not not not strttttttttttttttt")
			}
			delete paramKeyObj.value1;
			delete paramKeyObj.itemNum;
			delete paramKeyObj.contentType;
		}else if(/^floatBe$/.test(k[1])){
			console.log("changeSel:小数范围", k);
			this.setState({
				datatype: "flBe"
			})
			paramKeyObj.type = k[0];
			delete paramKeyObj.itemNum;
			delete paramKeyObj.contentType;
		}else if(/^arrBe$/.test(k[1])){
			console.log("changeSel:数组自定义", k);
			this.setState({
				datatype: "arrBe"
			})
			paramKeyObj.type = k[0];
			delete paramKeyObj.value1;
			delete paramKeyObj.contentType;
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			//注意，当为bool时，是需要传value值得，其他项不需要
			console.log("changeSsel:bool/email/ip/url/address/thedate", k)
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
			this.props.onParamCompChange(paramObj);
		}else if(/^objBe$/.test(k[1])){
			console.log("changeSel:对象自定义", k);
			this.setState({
				datatype: "objBe"
			})
			paramKeyObj.type=k[0];
			delete paramKeyObj.value1;
			delete paramKeyObj.itemNum;
			delete paramKeyObj.contentType;
		}
	}

	changeInput = (val)=>{
		for(var key in paramObj){
			delete paramObj[key];
		}
		//val为相应的key值
		paramObj[val] = {};
		paramKey2ValObj = paramObj[val];
		if(this.isEmptyObject(paramObj) == true){
			this.setState({
				disabled: true
			})
		}else{
			this.setState({
				disabled: false
			})
		}
	}

	componentWillReceiveProps (nextProps) {
    	if (nextProps.clearTag) {
    	  this.setState({
    	  	disabled: true,
    	  	datatype: ""
    	  })
    	}
  	}

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		return (
			<div>
				<Col span={3}>
	            	<ParamInput clearTag={this.props.clearTag} placevalue="key" onChangeInput={this.changeInput} />
	            </Col>
	            <Col span={19}>
	            	<Row>
		                <Col span={5}>
		                  	<ParamSel clearTag={this.props.clearTag} paramseldisabled={this.state.disabled} onChangeSel={this.changeSel}/>		                  
		                </Col>
		                <Col span={17}>
		                  <div>{this.DynamicFormSome(this.state.datatype)}</div>
		                </Col>
	               	</Row>
	               	<Row>
		               	<Col span={24}>
		               		{this.DynamicFormArrObj(this.state.datatype)}
		               	</Col>
	               	</Row>
	            </Col>
            </div>
		)
	}

	//判断对象是否为空
	isEmptyObject = (e) => {  
	    let t;  
	    for (t in e) {
	    	if(t.trim()=="" || t==undefined){
	    		return !0;
	    	}else{
	    		return !1;
	    	}
	    }
	    return !0  
	} 
	
}
const ParamComp = Form.create()(paramComp);
export default withStyles(s)(ParamComp);
