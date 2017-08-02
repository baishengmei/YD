import React, { Component, PropTypes } from 'react';
import { Layout, Modal, Table, Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchRules.css';
import $ from 'jquery'

let keypath;
let allRules = [];
let oneRule = {};//读取到的一条规则
let oneRuleReq = {};
let oneRuleRes = {};//将读取到的一条规则信息，保存成Table可应用的数组；
let oneRuleReqArr = [];//将该条规则的请求保存到数组中；
class ShowDetailRules extends Component {

	constructor(props) {
		super(props);
		this.state = {
			oneRuleReqArr: [{a:1}, {b:2}],
			constrRes: [],
		}
	}

	componentDidMount() {
		keypath = localStorage.getItem("keypath");
		this.getOneDetailRule(keypath);
	}

	//将接收到的对象格式的规则，保存成数组形式，第一项对应url，第二项为Method，Header等

	getOneDetailRule = (keypath) => {
		allRules = JSON.parse(localStorage.getItem('allrules'));
		for(let i=0, len=allRules.length; i<len; i++){
			if(allRules[i].keypath == keypath){
				oneRule = allRules[i];
			}
		}
		console.log(oneRule, '打印接收到的所有规则');
		oneRuleReq = {};
		const reqHeader = this.changeToStr(oneRule.value.reqh);
		const reqQuery = this.changeToStr(oneRule.value.reqq);
		const reqBody = this.changeToStr(oneRule.value.reqb);
		const constrRes = oneRule.value.constrRes;
    	oneRuleReq = Object.assign(oneRuleReq, {Url:oneRule.keypath, Method:oneRule.value.reqm, "Header":reqHeader, "Query":reqQuery, "ContentType":oneRule.value.reqc, "Body":reqBody});
    	let saveG = [];
    	for(let i in oneRule.value){    		
    		if(/^G\d+$/.test(i)) {    			
    			saveG.push({[i]: oneRule.value[i]});            			
    		}
    	}
    	// console.log(saveG, "打印该项中的每一个值");
    	oneRuleReq = Object.assign(oneRuleReq, {Constraint: saveG});
    	oneRuleReqArr = Object.entries(oneRuleReq);
    	console.log(oneRuleReqArr, '打印出请求数组;sdkfa;')
    	this.setState({
    		oneRuleReqArr: oneRuleReqArr,
    		constrRes: constrRes,
    	})
	}

	//将rules中的reqh、reqq等，其值为对象时，进行JSON.stringify转化
	 changeToStr = (val) => {
	 	if(Object.prototype.toString.call(val).toLowerCase()=="[object object]"){
	 		return JSON.stringify(val);
	 	}else {
	 		return val;
	 	}
	 }

	isEmptyObject = (e) => {
     	if(Object.prototype.toString.call(e).toLowerCase()=="[object object]"){         
		  	let t; 
          	for (t in e) {
              	if(t.trim()=="" || t==undefined){
                  	return !0;
               	}else{
                 	return !1;
               	}
           }
           return !0 
     	}else if(Object.prototype.toString.call(e).toLowerCase()=="[object array]" && e.length==0){
         	return !0;
     	}else if(e==undefined || e=="" ){ 
			return !0;
		}else if(e == null){
			return !0;
		}else if(typeof(e) == "string" && e.length==0){
			return !0;
		}else {
			return !1;
		}
	}

	showResRuleItems = (resConstrRes) => {
		const resItems = resConstrRes.map((k, index) => {
			let oneConstrRes = {};
			let oneConstrResArr = [];
			const resBody = this.changeToStr(k.response);
			oneConstrRes = Object.assign(oneConstrRes, {"响应条件": k.condition, "Status Code": k.ressc, "Content-type": k.resc, "Body": resBody});
			oneConstrResArr = Object.entries(oneConstrRes);
			const oneResItems = this.ruleItems(oneConstrResArr);
			return (
				<table className={s.table}>
					<tbody>
						{oneResItems}
					</tbody>					
				</table>
			)
		})
		return resItems;
	}

	ruleItems = (reqorresArr) => {
		const reqorresItems = reqorresArr.map((k, index) => { 
			let value = this.isEmptyObject(k[1])?"":k[1];
			if(Object.prototype.toString.call(value).toLowerCase()=="[object array]"){
				value = JSON.stringify(value);
			}
	      	return (
	      		<tr className={s.tr} k={k[0]}>
	      			<td className={s.tdd1}>
	      				<span>{k[0]}:</span>
	      			</td>
	      			<td className={s.tdd2}>
	      				<span>{value}</span>
	      			</td>
	      		</tr>
	      	)
	    })
	    return reqorresItems;
	}

	render() {
	    return (
		    <div className={s.showdetailrules}>
		    	<div>
		    		<div className={s.showDetairulesTitle}>Request</div>
			      	<table className={s.table}>
			      		<tbody>
			      			{this.ruleItems(this.state.oneRuleReqArr)}
			      		</tbody>
			      	</table>
		    	</div>
		      	<div>
		      		<div className={s.showDetairulesTitle}>Response</div>
			      	{this.showResRuleItems(this.state.constrRes)}
		      	</div>
		      	
		    </div>
	    )
	}
}

export default withStyles(s)(ShowDetailRules);