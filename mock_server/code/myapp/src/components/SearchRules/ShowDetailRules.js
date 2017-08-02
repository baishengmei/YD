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
		}
	}

	componentDidMount() {
		keypath = localStorage.getItem("keypath");
		this.getOneDetailRule(keypath);
	}

	//将接收到的对象格式的规则，保存成数组形式，第一项对应url，第二项为Method，Header等

	getOneDetailRule = (keypath) => {
		allRules = JSON.parse(localStorage.getItem('allrules'));
		// console.log(allRules, '打印接收到的所有规则');
		for(let i=0, len=allRules.length; i<len; i++){
			if(allRules[i].keypath == keypath){
				oneRule = allRules[i];
			}
		}

		oneRuleReq = {};
    	oneRuleReq = Object.assign(oneRuleReq, {Url:oneRule.keypath, Method:oneRule.value.reqm, "Header":oneRule.value.reqh, "Query":oneRule.value.reqq, "ContentType":oneRule.value.reqc, "Body":oneRule.value.reqb});
    	let saveG = [];
    	for(let i in oneRule.value){
    		if(/^G\d+$/.test(i)) {
    			saveG.push({[i]: oneRule.value[i]});            			
    		}
    	}
    	oneRuleReq = Object.assign(oneRuleReq, {Constraint: saveG});
    	oneRuleReqArr = Object.entries(oneRuleReq);
    	console.log(oneRuleReqArr, '打印出请求数组;sdkfa;')
    	this.setState({
    		oneRuleReqArr: oneRuleReqArr,
    	})
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

		// const reqItems = this.state.oneRuleReqArr.map((k, index) => { 
		// 	let value = this.isEmptyObject(k[1])?"":k[1];
		// 	if(Object.prototype.toString.call(value).toLowerCase()=="[object array]"){
		// 		value = JSON.stringify(value);
		// 	}
	 //      	return (
	 //      		<tr className={s.tr} k={k[0]}>
	 //      			<td className={s.tdd1}>
	 //      				<span>{k[0]}:</span>
	 //      			</td>
	 //      			<td className={s.tdd2}>
	 //      				<span>{value}</span>
	 //      			</td>
	 //      		</tr>
	 //      	)
	 //    })

	    return (
		    <div className={s.showdetailrules}>
		      	<div>Request</div>
		      	<table className={s.table}>
		      		<tbody>
		      			{this.ruleItems(this.state.oneRuleReqArr)}
		      		</tbody>
		      	</table>
		      	<div>Response</div>
		      	
		    </div>
	    )
	}
}

export default withStyles(s)(ShowDetailRules);