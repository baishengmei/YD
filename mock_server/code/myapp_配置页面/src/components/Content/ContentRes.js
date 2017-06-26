import React, { PropTypes, Component } from 'react';
import { Form, Button } from 'antd'
// const FormItem = Form.Item
import ReHeader from "./contentReq/ReHeader"
import FormInput from './contentReq/Forminput'
import FormInputOnly from './contentReq/ForminputOnly'
import FormSelect from './contentReq/Formselect'
import FormParams from './contentReq/Formparams.js'
import Constraint from './contentReq/Constraint'
import ReqSave from './contentReq/ReqSave'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReq/contentReqCss/ContentReqCss.css'

let uuid = 1;
class contentres extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			cutoff: false
		}
	}

	getResIf = () => {

	}

	remove = (k) => {
	    const { form } = this.props;
	    const keys = form.getFieldValue('keys');
	    if (keys.length === 1) {
	      return;
	    }
	    form.setFieldsValue({
	      keys: keys.filter(key => key !== k),
	    });
	}

	add = () => {
	    uuid++;
	    const { form } = this.props;
	    const keys = form.getFieldValue('keys');
	    const nextKeys = keys.concat(uuid);
	    form.setFieldsValue({
	      keys: nextKeys,
	    });
	    this.setState({
    		cutoff: true
    	})
	}

	addOneRes = () => {
	  	this.add();
	  	console.log("点击了")
	}

	cutoff = (hasCutoff) => {
		if(hasCutoff){
			return(
				<div className={s.cutoff}></div>
			)
		}
	}

  	render() {

  		const { getFieldDecorator, getFieldValue } = this.props.form;   
	    getFieldDecorator('keys', { initialValue: [1] });
	    const keys = getFieldValue('keys');

  		const addResponses = keys.map((k, index) => {
  			return(
  				<div key={k}>
  					<FormInputOnly clearTag={this.props.clearTag} name="响应条件:" placeval="例：$G1 && $G2" tip="注：若无约束条件，默认为true" formInputOnlyVal={this.getResIf} />
					<FormInputOnly clearTag={this.props.clearTag} name="Status Code" thevalue="200" formParamsVal={this.getSC} formInputOnlyVal={this.getResIf} />
					<FormSelect clearTag={this.props.clearTag} name="ContentType" tag="$c" optval="application/json, application/xxx-w/text, text/javascript, text/json"  formSelectVal={this.getC} />
					<FormParams clearTag={this.props.clearTag} name="Body" tagsign="$b" tag="$b" formParamsVal={this.getP} />
  					<ReqSave />
  					{this.cutoff(this.state.cutoff)}
  				</div>
  			)
  		})
    	return (
	    	<div>
	      		<div className={s.addRes}>
	      			<Button type="dashed" onClick={this.addOneRes}>+新增响应</Button>
	      		</div>
	      		<ReHeader title="Response"/>
	        	<div className={s.reqContent}>
					{addResponses}
				</div>				
	    	</div>
    	);
  	}
}
const ContentRes = Form.create()(contentres);
export default withStyles(s)(ContentRes);