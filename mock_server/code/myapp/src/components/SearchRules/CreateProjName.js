import React, { Component, PropTypes } from 'react';
import { Input, Button, Modal } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchRules.css';
import $ from 'jquery'

class CreateProjName extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projname: "",
		}
	}

	inputChange = (e) => {
		this.setState({
			projname: e.target.value,
		}, () => {
			console.log(this.state.projname, '编辑框中projname的值')
		})
	}
	error = (errMsg) => {
	    Modal.error({
	      	title: 'this is a warning message!',
	      	content: errMsg,
	    })
	}

	create = () => {
		const url = '/mockserver/createprojname';
		const projname = this.state.projname;
		this.setState({
			projname: "",
		}, () => {
			console.log(typeof projname, projname.length , 'bbbbbbb')
			if(projname.length == 0){
				this.error("Please input the '项目组名'");
			}else {
				console.log(projname, 'ajax中projname的值');
				$.ajax({
					url: url,
		            type: 'POST',
		            dataType: 'json',
		            data: {projname: projname},
		            success: data => {

		            	console.log("保存数据返回成功");
		            	// this.setState({
		            	// 	projname: ""
		            	// })
		            },
		            error: err => {
		            	console.log(err);
		            }
				})
			}
			
		})
		
	}

	render() {
	    return (
		    <div className={s.showdetailrules}>
		    	<div className={s.inputname}>
			    	<Input addonBefore="项目组名：" placeholder="projname" value={this.state.projname} onChange={this.inputChange}/>
			    </div>
			    <div className={s.createbtn}>
			    	<Button type="primary" onClick={this.create}>创建</Button>
			    </div>
		    </div>
	    )
	}
}

export default withStyles(s)(CreateProjName);