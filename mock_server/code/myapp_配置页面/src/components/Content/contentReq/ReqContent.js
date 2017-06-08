import React, { Component, PropTypes } from "react"
import FormInput from './forminput'
import FormSelect from './formselect'
import FormParams from './formparams'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'

class ReqContent extends Component {

	render() {
		return ( 
			
			<div className={s.reqContent}>
				<FormInput name="Url" tag="$U" />
				<FormSelect name="Method" tag="$M" optval="GET,DELETE,Post,PUT,OPTIONS" />	
				<FormParams name="Query" tag="$q" />			
			</div>
		);
	}
}

export default withStyles(s)(ReqContent);
