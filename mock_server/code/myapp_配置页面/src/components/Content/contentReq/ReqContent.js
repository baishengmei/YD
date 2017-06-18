import React, { Component, PropTypes } from "react"
import FormInput from './Forminput'
import FormInputOnly from './ForminputOnly'
import FormSelect from './Formselect'
import FormParams from './Formparams'
import Constraint from './Constraint'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'

class ReqContent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			$u: "",//url
			$c: "",//contentType
			$m: "",//method
			$h: {},//header
			$q: {},//query
			$b: {},//body
			$G: {}//constraint
		}
	}

	getUrl = (value) => {
		this.setState({
			$u: value
		})
	}
	getM = (value) => {
		this.setState({
			$m: value
		})
	}
	getC = (value) => {
		this.setState({
			$c: value
		})
	}
	getConstrain = (value) => {
		this.setState({
			$G: value
		})
		console.log("value:::::::",this.state.$G)
	}

	render() {
		return ( 			
			<div className={s.reqContent}>
				<FormInputOnly name="Url" tag="$U" ref="aaaaaa" placeval="Url" formInputOnlyVal={this.getUrl} />
				<FormSelect name="Method" tag="$M" optval="GET,DELETE,Post,PUT,OPTIONS" formSelectVal={this.getM} />	
				<FormParams name="Header" tag="$h" />
				<FormParams name="Query" tag="$q" />
				<FormSelect name="ContentType" tag="$c" optval="application/json, application/xxx-w/text"  formSelectVal={this.getC} />
				<FormParams name="Body" tag="$b" />	
				<Constraint constraintVal={this.getConstrain} />		
			</div>
		);
	}
}

export default withStyles(s)(ReqContent);
