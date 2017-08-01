import React, { Component, PropTypes } from 'react'
import { Form, Select, Button, Row, Col } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './SearchRules.css'
import $ from 'jquery'

const FormItem = Form.Item;
const Option = Select.Option;

let datasShowInTable = [];
let datasShowInProj = [];
let datasShowInRule = [];
//保存下拉框的options值
let projOptions = [];
let ruleOptions = [];
let datasShowInProjStatic = [];//保留完整的rules值；
let datasShowInRuleStatic = [];

class selectSearchIf extends Component {

	constructor(props) {
		super(props);
		this.state ={			
			projname: "",
			rulename: "",
			datasShowInTable: [],
			datasShowInProj: [],
			datasShowInRule: [],
			result: [],
			projOptions: [],
			ruleOptions: [],
			isFirstMount: false,
		}
	}

	saveOptions = (optsArr, datasArr) => {
		for (let i=0; i<datasArr.length; i++) {
		  	optsArr.push(<Option key={datasArr[i]}>{datasArr[i]}</Option>);
		}
		return optsArr;
	}

	componentDidMount() {
		this.setState({
			isFirstMount: true,
		}, () => {
			this.getDataFromMongod(this.state.projname, this.state.rulename, this.state.isFirstMount);
		})
	}

	search = () => {
		this.getDataFromMongod(this.state.projname, this.state.rulename, this.state.isFirstMount);
		this.props.form.resetFields();
	}

	getDataFromMongod = (projname, rulename, isFirstMount) => {
		$.ajax({
            url: '/mockserver/getdatafrommongod/',
            type: 'GET',
            dataType: 'json',
            data: {projname:projname, rulename: rulename},
            success: data => {
            	console.log("result:", data);
            	//将返回的数据进行格式处理，并将值保存到对应的三个state数组中,以及将result保存到数组中
            	if(this.state.isFirstMount == true){
            		[datasShowInTable, datasShowInProj, datasShowInRule] = this.datasInPage(data);
            		this.setState({
            			isFirstMount: false,
            			datasShowInTable: datasShowInTable,
            			datasShowInProj: datasShowInProj,
            			datasShowInRule: datasShowInRule,
            		})
            	}else {
            		this.setState({
            			isFirstMount: false,
            			datasShowInTable: this.datasInPage(data)[0],
            			// datasShowInProj: datasShowInProj,
            			datasShowInRule: datasShowInRule,
            			datasShowInProj: datasShowInProj,
            		})
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
            	})          	
            },
            error: err => {
	            console.log(err);
            	
            }
        })
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

	getProjSel = (value) => {
		let temp = 0;
		let tempRules = [];
		for(let i=0, len=datasShowInTable.length; i<len; i++){
			if(datasShowInTable[i].projname == value) {
				// datasShowInRule[temp] = this.state.datasShowInTable[i].rulename;
				tempRules[temp] = datasShowInTable[i].rulename;
				temp += 1;
			}
		}
		const { setFieldsValue } = this.props.form;
		setFieldsValue({
			rulename: ""
		})
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

	getRuleSel = (value) => {
		this.setState({
			rulename: value,
		})
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

	render() {

	  	const { getFieldDecorator, getFieldProps } = this.props.form;
	    const formItemLayout = {
	        labelCol: { span: 8 },
	        wrapperCol: { span: 16 },
	    }

	    return (
		    <Form onSubmit={this.handleSubmit}>
		        <div className={s.searchif}>
			        <div className={s.projname}>
			            <FormItem label="项目组名" {...formItemLayout} {...this.props}>
			              {getFieldDecorator('projname', {
			                onChange: this.getProjSel
			            })(
			                <Select placeholder="Project name">
			                	{ this.state.projOptions }
			                </Select>
			              )}
			            </FormItem>
			        </div>
			        <div className={s.rulename}>
			            <FormItem label="规则名" {...formItemLayout}>
			              {getFieldDecorator('rulename', {
			                onChange: this.getRuleSel
			            })(
			                <Select placeholder="rule name">
			                  	{ this.state.ruleOptions }
			                </Select>
			              )}
			            </FormItem>
			        </div>
			        <div className={s.searchBtn}>
				        <FormItem>
				          	<Button type="primary" onClick={this.search}>查询</Button>
				        </FormItem>		            
			        </div>
			    </div>
		    </Form>
	    );
  	}
}

const SearchIf = Form.create()(selectSearchIf);

export default withStyles(s)(SearchIf);