import React, { Component, PropTypes } from 'react';
import { Layout, Modal } from 'antd'
const { Content }= Layout
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './SearchRules.css';
import $ from 'jquery'
import SearchIf from './SearchIf.js'
import SearchContent from './SearchContent.js'
import { Select } from 'antd'
const Option = Select.Option;

let allRules = []; 
let datasShowInTable = [];
let datasShowInProj = [];
let datasShowInRule = [];
//保存下拉框的options值
let projOptions = [];
let ruleOptions = [];

class SearchRules extends Component {

	constructor(props) {
		super(props);
		this.state ={			
			projname: "",
			rulename: "",
			datasShowInTable: [],
			datasShowInProj: [],
			datasShowInRule: [],
			projOptions: [],
			ruleOptions: [],
			isFirstMount: false,
			isDelete: false,
			isEmpty: false,
		}
	}

	componentDidMount() {
		this.setState({
			isFirstMount: true,
		}, () => {
			this.getDataFromMongod(this.state.projname, this.state.rulename, this.state.isFirstMount, this.state.isDelete);
		})
	}

	getDataFromMongod = (projname, rulename, isFirstMount, isDelete) => {
		const url = isDelete?'/mockserver/deldatafrommongod':"/mockserver/getdatafrommongod";
		$.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: {projname:projname, rulename: rulename},
            success: data => {
            	console.log("result:", data);
            	//将返回的数据进行格式处理，并将值保存到对应的三个state数组中,以及将result保存到数组中
            	if(this.state.isFirstMount == true) {
            		allRules = data;
            		[datasShowInTable, datasShowInProj, datasShowInRule] = this.datasInPage(data);
            		this.setState({
            			isFirstMount: false,
            			isEmpty: false,
            			datasShowInTable: datasShowInTable,
            			datasShowInProj: datasShowInProj,
            			datasShowInRule: datasShowInRule,
            		})
            	}else if(isDelete) {
            		if(data.length == 0){
            			allRules = [];
            			datasShowInTable = [];
            			datasShowInProj = [];
            			datasShowInRule = [];
            			this.setState({
	            			isFirstMount: false,
	            			isEmpty: false,
	            			datasShowInTable: [],
	            			datasShowInRule: [],
	            			datasShowInProj: [],
	            			isEmpty: false,
	            		})
            		}else {
            			allRules = [];
            			allRules = data;
            			[datasShowInTable, datasShowInProj, datasShowInRule] = this.datasInPage(data);
	            		this.setState({
	            			isFirstMount: false,
	            			isEmpty: false,
	            			datasShowInTable: datasShowInTable,
	            			datasShowInProj: datasShowInProj,
	            			datasShowInRule: datasShowInRule,
	            		})
            		}
            		
            	}else if(!isDelete) {
            		if(data.length == 0){
            			datasShowInTable = [];
            			datasShowInProj = [];
            			datasShowInRule = [];
            			this.setState({
	            			isFirstMount: false,
	            			datasShowInTable: [],
	            			datasShowInRule: [],
	            			datasShowInProj: [],
	            			isEmpty: false,
	            		})
            		}else {
            			this.setState({
	            			isFirstMount: false,
	            			isEmpty: false,
	            			datasShowInTable: this.datasInPage(data)[0],
	            			datasShowInRule: datasShowInRule,
	            			datasShowInProj: datasShowInProj,
		            	})
            		}            		        				            	
            	}            		
            	
            	ruleOptions = [];
            	projOptions = [];
            	projOptions = this.saveOptions(projOptions, datasShowInProj);
            	ruleOptions = this.saveOptions(ruleOptions, this.state.datasShowInRule);
            	this.setState({
            		projOptions: projOptions,
            		ruleOptions: ruleOptions,
            		projname: "",
            		rulename: "",
            		isFirstMount: false,
            		isDelete: false,
            	})          	
            },
            error: err => {
	            console.log(err);
            	
            }
        })
	}

	saveOptions = (optsArr, datasArr) => {
		for (let i=0; i<datasArr.length; i++) {
		  	optsArr.push(<Option key={datasArr[i]}>{datasArr[i]}</Option>);
		}
		return optsArr;
	}

	//将返回的result值，即规则s，写成表格显示以及页面需要的数组格式
	//表格显示需要的数组格式是[{projname: "……", rulename: "……", url: "……"}, {……}, {……}, ……]
	// 查询条件中projname中需要的数组格式是[proj_1, proj_2, ……]
	//同理，rulename需要的数组格式是[rulename_1, rulename_2, ……]
	datasInPage = (result) => {
		let datasShowInTable = [];
		let datasShowInProj = [];
		let datasShowInRule = [];
		if(result.length <= 0){
			console.log("不存在与之匹配的规则！");
		}else {
			for(let i=0, len=result.length; i<len; i++) {
				datasShowInTable[i] = {};
				datasShowInTable[i].projname = result[i].keypath.substring(1, result[i].keypath.lastIndexOf("\/"));
				datasShowInTable[i].rulename = result[i].value.rulename;
				datasShowInTable[i].url = result[i].keypath.substring(result[i].keypath.lastIndexOf("\/")+1, result[i].keypath.length);
				datasShowInProj[i] = result[i].keypath.substring(1, result[i].keypath.lastIndexOf("\/"));
				datasShowInRule[i] = result[i].value.rulename;
			}
			return [datasShowInTable, this.arrUnique(datasShowInProj), this.arrUnique(datasShowInRule)];
		}
	}

	//数组去重函数
	arrUnique = (arr) => {
		var res = [];
		var json = {};
		for(var i = 0; i < arr.length; i++){
		  	if(!json[arr[i]]){
		   		res.push(arr[i]);
		   		json[arr[i]] = 1;
			}
		}
		return res;
	}

	projSelChange = (value) => {
		let temp = 0;
		let tempRules = [];
		for(let i=0, len=datasShowInTable.length; i<len; i++){
			if(datasShowInTable[i].projname == value) {
				// datasShowInRule[temp] = this.state.datasShowInTable[i].rulename;
				tempRules[temp] = datasShowInTable[i].rulename;
				temp += 1;
			}
		}
		this.setState({
			datasShowInRule: this.arrUnique(tempRules),
			projname: value,
			rulename: "",
		}, () => {
			ruleOptions = [];
			ruleOptions = this.saveOptions(ruleOptions, this.state.datasShowInRule);
			this.setState({
				ruleOptions: ruleOptions,
			})
		})
	}

	search = (projname, rulename, isFirstMount) => {
		this.getDataFromMongod(projname, rulename, this.state.isFirstMount, this.state.isDelete);
	}

	delRow = (record) => {
		this.setState({
			isDelete: true,
			isEmpty: true,
		}, () => {
			this.getDataFromMongod(record.projname, record.rulename, this.state.isFirstMount, this.state.isDelete);
		})	

	}

	render() {
    	return (
      		<div className={s.searchRules}>
	        	<SearchIf isEmpty={this.state.isEmpty} isFirstMount={this.state.isFirstMount} projOptions={this.state.projOptions} ruleOptions={this.state.ruleOptions} onProjSelChange={this.projSelChange} onSearch={this.search}/>
	        	<SearchContent allRules={allRules} thedatasShowInTable={this.state.datasShowInTable} onDelete={this.delRow}/>
      		</div>
    	);
  	}
}

export default withStyles(s)(SearchRules);