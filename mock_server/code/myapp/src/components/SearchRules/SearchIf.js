import React, { Component, PropTypes } from 'react'
import { Form, Select, Button, Row, Col } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './SearchRules.css'
import $ from 'jquery'

const FormItem = Form.Item;
const Option = Select.Option;

// let datasShowInTable = [];
// let datasShowInProj = [];
// let datasShowInRule = [];
//保存下拉框的options值
// let projOptions = [];
// let ruleOptions = [];

class selectSearchIf extends Component {

	constructor(props) {
		super(props);
		this.state = {
			projname: "",
			rulename: ""
		}
	}

	search = () => {
		this.props.onSearch(this.state.projname, this.state.rulename, this.state.isFirstMount)
		this.setState({
			projname: "",
			rulename: "",
		})
		this.props.form.resetFields();
	}

	getProjSel = (value) => {
		this.props.onProjSelChange(value);		
		const { setFieldsValue } = this.props.form;
		setFieldsValue({
			rulename: ""
		})
		this.setState({
			projname: value,
			rulename: "",
		})
	}

	getRuleSel = (value) => {
		this.setState({
			rulename: value,
		})
	}

	componentWillReceiveProps (nextProps) {
    	if (nextProps.isEmpty) {
    	  	this.props.form.resetFields();
    	}
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
			                	{ this.props.projOptions }
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
			                  	{ this.props.ruleOptions }
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