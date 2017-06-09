import React, { Component, PropTypes } from "react"
import FormInput from './Forminput'
import FormSelect from './Formselect'
import FormParams from './Formparams'
import Constraint from './Constraint'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'

class ReqContent extends Component {

	render() {
		return ( 
			
			<div className={s.reqContent}>
				<FormInput name="Url" tag="$U" />
				<FormSelect name="Method" tag="$M" optval="GET,DELETE,Post,PUT,OPTIONS" />	
				<FormParams name="Header" tag="$h" />
				<FormParams name="Query" tag="$q" />
				<FormSelect name="ContentType" tag="$c" optval="application/json, application/xxx-w/text" />
				<FormParams name="Body" tag="$b" />	
				<Constraint />		
			</div>
		);
	}
}

export default withStyles(s)(ReqContent);
