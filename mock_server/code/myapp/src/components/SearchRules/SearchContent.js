import React, { Component, PropTypes } from 'react';
import { Layout, Modal, Table, Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchRules.css';
import $ from 'jquery'

class SearchContent extends Component {

	columns = () => {
		// const columnsArr = [];
		const columnsArr = [{
			title: '项目组名',
			dataIndex: 'projname',
			key: 'projname',
			render: (text, record, index) => {
			  	return (
			  		<span>{text}</span>
			  	)
			},
		}, {
			title: '规则名',
			dataIndex: 'rulename',
			key: 'rulename',
		}, {
			title: 'URL',
			dataIndex: 'url',
			key: 'url',
		}, {
			title: '删除规则',
			key: 'delete',
			render: (text, record, index) => (
			    <span>
			      <a href="#" onClick={() => {this.props.onDelete(record);}}>删除</a>
			    </span>
			),
		}, {
			title: '查看详情',
			key: 'detail',
			dataIndex: 'detail',
			render: (text, record) => (
			    <span>
				    <a href="#" onClick={
				      	() => {
				      		// console.log(record, 'dsdssssssss')
				      		localStorage.setItem("keypath", "/"+record.projname+"/"+record.url);
				      		localStorage.setItem("allrules", JSON.stringify(this.props.allRules));
					      	// const detailUrl = `${window.location.origin}/showdetailrules?keypath=/${record.projname}/${record.url}endkeypath`;
					      	// console.log(detailUrl,"aaa");
					      	// console.log(this.props.allRules, '所有规则')
					      	window.open(`${window.location.origin}/showdetailrules`);
					    }
				    }>详情</a>
			    </span>
			),
		}];
		return columnsArr;
	}

	render() {

	  	const datasShowInTable = this.props.thedatasShowInTable;

	    return (
	      <div>
	      	<Table
	      		dataSource = {this.props.thedatasShowInTable}
	      		columns = {this.columns()}
	      		bordered
	      	/>
	      </div>
	    );
	}
}

export default withStyles(s)(SearchContent);