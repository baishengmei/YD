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
let k2key = {};//用于保存k值和key值得对应，避免input修改前后的值均被保存
let tagsignE;
let arrAttr = [];//用于存放参数类型为数组自定义时，子组件传过来的值保存到的数组；
let arrAttrObj = {};//当参数类型为数组时，子组件传来的值首先保存到数组中，最后保存到该对象中；
let arrTag = 0; //用于标注当前数组自定义处于第几级别
let objValFirst = {};//当类型为对象自定义时，保存最顶层的对象
let tagSignInObj;
class paramComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: true,
			datatype: "",
			indexTemp: [1],
			clearTag: false,
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log(paramObj, "组件刷新后显示componentDidUpdate")
	}

	//当第一级参数定义为“等于”类型时，value组件的传值函数
	valEq = (val) => {
		//val为第一级下拉框对应的value值；
		const tag = "value";
		this.val2obj(val, paramKey2ValObj, tag);
	}

	//将value组件值，保存到对象中
	val2obj = (val, obj, tag)=> {
		//val为第一级下拉框对应的value值，obj为{type: "neum", value: "apple, bananna"},tag为value字符串
		//旨在解决bool、地址、时间、url、ip情况下tag表示的问题
		// if(tag !== "noTag"){
		// 	obj[tag] = val;
		// }
		obj[tag] = val;
		//当为小数范围时，若配置页面未写入整数部分或小数部分时，会添加默认值
		if(this.state.datatype.trim() == "flBe"){
			if((Object.values(paramObj)[0]["value1"] !== "" || Object.values(paramObj)[0]["value1"] !== undefined) && (Object.values(paramObj)[0]["value"] == "" || Object.values(paramObj)[0]["value"] == undefined)){
				// Object.values(paramObj)[0].value == [-Math.pow(10, 6), Math.pow(10,6)];//不知道为什么该方法不能添加value属性
				for(let i in paramObj){
					paramObj[i].value = [-Math.pow(10, 6), Math.pow(10,6)];
				}
			}else if((Object.values(paramObj)[0]["value"] !== "" || Object.values(paramObj)[0]["value"] !== undefined) && (Object.values(paramObj)[0]["value1"] == "" || Object.values(paramObj)[0]["value1"] == undefined)){
				for(let i in paramObj){
					paramObj[i].value1 = [0, 6];
				}
			}
		}//else if(this.state.datatype.trim() == "arrBe"){//当为数组自定义时，若项数未定义，则设置默认值
		// 	if((Object.values(paramObj)[0]["itemNum"] == "" || Object.values(paramObj)[0]["itemNum"] == undefined)){
		// 		for(let i in paramObj){
		// 			paramObj[i].itemNum = [-Math.pow(10, 6), Math.pow(10,6)];
		// 		}
		// 	}
		// }
		this.props.onParamCompChange(paramObj, this.props.keyindex, tagsignE);
	}

	postVal = (val, tag) => {
		if(tag < arrAttr.length){
			if(val.type == 'arr' && val.itemNum !== undefined){
				arrAttr[tag] = this.deepCopy(val);
			}else {
				arrAttr[tag] = this.deepCopy(val);
				arrAttr = arrAttr.slice(0, tag+1);
			}
		}else if(tag == arrAttr.length){
			arrAttr[tag] = this.deepCopy(val);
		}
		arrAttrObj = this.arr2obj(arrAttr, arrAttrObj);
		for(let i in paramObj){
			paramObj[i] = this.deepCopy(arrAttrObj);
		}
		this.props.onParamCompChange(paramObj, this.props.keyindex, tagsignE);
	}

	//当参数类型为对象自定义时，将数组类型转为对象；
	postObjVal = (val, obj, tag) => {
		for(let i in obj){
			obj[i][tag] = {};
			obj[i][tag] = this.deepCopy(val);
		}
		// if(this.props.objTag == 0){
		// 	objValFirst = this.deepCopy(obj); 
		// }
		this.props.onParamCompChange(obj, this.props.keyindex, tagSignInObj);
	}

	//当参数类型为数组自定义时，将数组类型转为对象；
	arr2obj = (arr, x) => {
	    for(var i=arr.length-1; i>0; i--){
	        var obj = {};
	        if(i == arr.length-1){
	            obj.value = this.deepCopy(arr[i]);
	        }else{
	            obj.value = this.deepCopy(x);
	        }
	        x = Object.assign(x, arr[i-1], obj);
	    }
	    return x;
	}

	deepCopy = (source) => {
	    var result ={};
	    for(let key in source){
	      result[key]=typeof source[key] === 'object'?this.deepCopy(source[key]): source[key];
	    }
	    return result;
	}

	// 第一级参数定义为数组/对象范围时，对应的value布局
	DynamicFormArrObj = (k) => {
		switch(k){
			case "arrBe":
			return (
				<div>
					<ArrBe paramObj={paramKey2ValObj} arrTag={arrTag} postVal={this.postVal}/>
				</div>
			)
			break;
			case "objBe":			
			return (
				<div>
					<ObjBe objTag={this.props.objTag} clearTag={this.props.clearTag} postObjVal={this.postObjVal} paramObj={objValFirst} />
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
					<FlBe toVal2Obj={this.val2obj} paramObj={paramKey2ValObj} />
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
		//k, paramKeyObj分别是指下拉框相关的值，如：['bool', 'boolF']，{ type:"bool", value:"false" }
		if(/\w+Eq$/.test(k[1])){
			this.setState({
				datatype: "Eq",
			})
			paramKeyObj.type = k[0];
			delete paramKeyObj.value1;
			delete paramKeyObj.itemNum;
			delete paramKeyObj.contentType;
		}else if(/^intBe$|^strBe$/.test(k[1])){
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
			this.setState({
				datatype: "flBe"
			})
			paramKeyObj.type = k[0];
			delete paramKeyObj.itemNum;
			delete paramKeyObj.contentType;
		}else if(/^arrBe$/.test(k[1])){
			this.setState({
				datatype: "arrBe"
			})
			paramKeyObj.type = k[0];
			delete paramKeyObj.value1;
			delete paramKeyObj.contentType;
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			//注意，当为bool时，是需要传value值得，其他项不需要
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
			this.props.onParamCompChange(paramObj, this.props.keyindex, tagsignE);
		}else if(/^objBe$/.test(k[1])){
			this.setState({
				datatype: "objBe"
			})
			paramKeyObj.type=k[0];
			delete paramKeyObj.value1;
			delete paramKeyObj.itemNum;
			delete paramKeyObj.contentType;
			objValFirst = this.deepCopy(paramObj);
			if(this.props.objTag == 0){
				tagSignInObj = tagsignE;
			}
		}
	}

	changeInput = (val, tagsign)=>{
		//val, tagsign分别是每一项的key的值和标签值，如"name", $b
		tagsignE = tagsign;
		for(var key in paramObj){
			delete paramObj[key];
		}

		//val为相应的key值
		paramObj[val] = {};
		paramKey2ValObj = paramObj[val];

		if(this.isEmptyObject(paramObj) == true){
			this.setState({
				disabled: true,
				datatype: "",
				clearTag: true
			})
		}else{
			this.setState({
				disabled: false,
				clearTag: false,
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
	            	<ParamInput tagsign={this.props.tagsign} keyindex={this.props.keyindex} clearTag={this.props.clearTag} placevalue="key" onChangeInput={this.changeInput} />
	            </Col>
	            <Col span={19}>
	            	<Row>
		                <Col span={5}>
		                  	<ParamSel clearTag={this.props.clearTag || this.state.clearTag} paramseldisabled={this.state.disabled} onChangeSel={this.changeSel}/>		                  
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
