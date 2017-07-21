import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import ParamInput from './ParamInput'
import { Row, Col, Modal } from 'antd'
import IscBe from './IscBe'
import ParamSel from './ParamSel'
import FlBe from './FlBe'
// import ObjBe from './objBe'

let arrBe = {};//当type为arr时，和type处于同一级的value所对应的对象
let arrBeVal = {};//arrBe.value == arrBeVal
let flag = 0;
let flat = 0;
let linshi = {};

class ArrBe extends Component {

	constructor(props) {
		super(props);
		this.state = {
			datatype: "",
		}
		flat += 1;
		console.log(flat, flag, "第24行");
	}
	//传入三个参数，分别是value值(val)，存值对象(obj)，key值(tag)。用于项数值传递
	arrtoVal2Obj = (val, obj, tag) => {
		this.props.toVal2Obj(val, obj, tag);
	}

	valEq = (val) => {
		//val为第一级下拉框对应的value值；
		const tag = "value";
		this.val2obj(val, arrBeVal, tag);
		// this.props.onParamCompChange(paramObj, this.props.keyindex, tagsignE);
	}

	//将value组件值，保存到对象中
	val2obj = (val, obj, tag)=> {
		console.log(flag, "flag的值 第38行，点击下拉框则统计")
		console.log(flat, "flat的值，第39行")

		const tagE = "value";
		//val为第二级及多级下拉框对应的value值，obj为{type: "neum", value: "apple, bananna"},tag为value字符串
		if(tag !== "noTag"){
			obj[tag] = val;
		}
		// obj[tag] = val;
		//当为小数范围时，若配置页面未写入整数部分或小数部分时，会添加默认值
		if(val.type == undefined){
			if(this.state.datatype.trim() == "flBe"){
				if((arrBeVal.value == "" || arrBeVal.value == undefined)){
					arrBeVal.value = [-Math.pow(10, 6), Math.pow(10,6)];
				}else if((arrBeVal.value1 == "" || arrBeVal.value1 == undefined)){
					arrBeVal.value1 = [0, 6];
				}
			}else if(this.state.datatype.trim() == "arrBe"){//当为数组自定义时，若项数未定义，则设置默认值
				if((arrBeVal.itemNum == "" ||arrBeVal.itemNum == undefined)){
					arrBeVal.itemNum = [-Math.pow(10, 6), Math.pow(10,6)];
				}
			}else if(this.state.datatype.trim() !== "arrBe"){
				delete arrBeVal.itemNum;
			}
			this.props.toVal2Obj(arrBeVal, arrBe, tagE);
		}else {
			if(val.type.trim() == "flBe"){
				if((arrBeVal.value == "" || arrBeVal.value == undefined)){
					arrBeVal.value = [-Math.pow(10, 6), Math.pow(10,6)];
				}else if((arrBeVal.value1 == "" || arrBeVal.value1 == undefined)){
					arrBeVal.value1 = [0, 6];
				}
			}else if(val.type.trim() == "arr"){//党委数组自定义时，若项数未定义，则设置默认值
				if((arrBeVal.itemNum == "" ||arrBeVal.itemNum == undefined)){
					arrBeVal.itemNum = [-Math.pow(10, 6), Math.pow(10,6)];
				}
			}else if(val.type.trim() !== "arr"){
				delete arrBeVal.itemNum;
			}
			this.props.toVal2Obj(arrBeVal, arrBe, tagE);
		}		
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
					<IscBe tips="默认:-10^6 ~ 10^6" toVal2Obj={this.val2obj} paramObj={arrBeVal} tag="value" />
				</div>
			)
			break;
			case "flBe":
			return (
				<div>
					<FlBe toVal2Obj={this.val2obj} toVal2Obj={this.val2obj} paramObj={arrBeVal} />
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
					<ArrBe toVal2Obj={this.val2obj} paramObj={arrBeVal} flag={flag} flat={flat}/>
				</div>
			)
			break;
			case "objBe":			
			return (
				<div>
					<ObjBe toVal2Obj={this.val2obj} paramObj={arrBeVal} />
				</div>
			)
			break;
			default:
			return;
		}
	}

	changeSel = (k) => {
		// arrBe = this.deepCopy(this.props.paramObj);//当arrBe改变时，this.props.paramObj也随着改变了
		arrBe = this.props.paramObj;

		if(flat-1 !== flag){
			delete arrBe.type;
			if(arrBe.value !== undefined){
				delete arrBe.value;
				delete this.props.paramObj.value;
			}
			if(arrBe.contentType !== undefined){
				delete arrBe.contentType;
			}
			if(arrBe.value1 !== undefined){
				delete arrBe.value1;
			}
			this.transType(k, arrBe);			
		}else {
			arrBe.value = {};//当参数类型为数组自定义时，value对应的对象用arrBe.value来表示
			arrBeVal = arrBe.value;
			this.transType(k, arrBeVal)
		}
		// arrBe = this.props.paramObj;
		

		// flag = this.props.flag;
		flag += 1;
		console.log(flat, flag, '第143行');
		// this.transType(k, arrBeVal)
	}

	transType = (k, paramKeyObj) => {	
		linshi = this.deepCopy(arrBe);	
		if(flat-1 !== flag){
			arrBe = this.deepCopy(linshi);
			flag -= 1;
		}
		const tagE = "value";
		//k, paramKeyObj分别是指下拉框相关的值，如：['bool', 'boolF']，{ type:"bool", value:"false" }
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
				// this.props.toVal2Obj(paramKeyObj, this.props.paramObj, tagE);
				this.props.toVal2Obj(paramKeyObj, arrBe, tagE);
			})
			
		}else if(/^objBe$/.test(k[1])){
			this.setState({
				datatype: "objBe"
			}, () => {
				paramKeyObj.type=k[0];
				delete paramKeyObj.value1;
				delete paramKeyObj.itemNum;
				delete paramKeyObj.contentType;
			})			
		}
		
	}

	deepCopy = (source) => {
	    let result ={};
	    for(let key in source){
	      result[key]=typeof source[key] === 'object'?this.deepCopy(source[key]): source[key];
	    }
	    return result;
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
	                	<Col span={22} offset={2}>
	                		{this.DynamicFormArrObj(this.state.datatype)}
	               		</Col>
	                </Row>
				</Row>
			</div>
		)
	}
}

export default withStyles(s)(ArrBe);