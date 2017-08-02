import React, { Component, PropTypes } from 'react';
import { Layout, Modal, Table, Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchRules.css';
import $ from 'jquery'

let keypath;
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
		const url = '/mockserver/getonedetailrule';
		$.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: {keypath:keypath},
            success: data => {
            	console.log(data, '打印data的值')
            	if(data.length == 0){
            		oneRule = {};
            	}else {
            		oneRule = data[0];
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
            	console.log(oneRuleReqArr, 'dsldjlsljdfka;sdkfa;')
            	// this.setState({
            	// 	oneRuleReqArr: oneRuleReqArr,
            	// })
           			
            },
            error: err => {
	            console.log(err);            	
            }
        })
	}

	render() {

		const reqItems = oneRuleReqArr.map((k, index) => { 
	      	return (
	      		<tr className={s.tr}>
	      			<td>
	      				<span>k[0]</span>
	      			</td>
	      			<td>
	      				<span>k[1]</span>
	      			</td>
	      		</tr>
	      	)
	    })

	    return (
	      <div className={s.showdetailrules}>
	      	<table className={s.table}>
	      		<tbody>
	      		<tr className={s.tr}>
	      			<td>姓名</td>
	      			<td>白</td>
	      		</tr>
	      		<tr className={s.tr}>
	      			<td>姓名</td>
	      			<td>白</td>
	      		</tr>
	      		</tbody>
	      	</table>
	      </div>
	    )
	}
}

export default withStyles(s)(ShowDetailRules);