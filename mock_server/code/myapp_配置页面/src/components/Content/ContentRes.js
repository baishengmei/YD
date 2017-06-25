import React from 'react'
import ReHeader from "./contentReq/ReHeader"
import FormInput from './contentReq/Forminput'
import FormInputOnly from './contentReq/ForminputOnly'
import FormSelect from './contentReq/Formselect'
import FormParams from './contentReq/Formparams.js'
import Constraint from './contentReq/Constraint'
import ReqSave from './contentReq/ReqSave'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReq/contentReqCss/ContentReqCss.css'

class ContentRes extends React.Component {

  	render() {
    	return (
	    	<div>
	      		<div className={s.addRes}>+新增响应</div>
	      		<ReHeader title="Response"/>
	        	<div className={s.reqContent}>
					<FormInputOnly name="响应条件:" placeval="例：$G1 && $G2" tip="注：若无约束条件，默认为true" />
					<FormInputOnly name="Status Code" thevalue="200" />
					<FormSelect name="ContentType" tag="$c" optval="application/json, application/xxx-w/text" />
					// <FormParams name="Parameters" tag="$p" />
					// <FormParams name="Headers" tag="$h" />
					// <FormParams name="Body" tag="$b" />			
				</div>
				<ReqSave />
	    	</div>
    	);
  	}
}

export default withStyles(s)(ContentRes);