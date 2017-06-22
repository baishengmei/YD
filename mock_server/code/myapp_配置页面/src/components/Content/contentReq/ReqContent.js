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
		this.props.onReqContent(this.state);
	}
	getM = (value) => {
		this.setState({
			$m: value
		}, () => {
			this.props.onReqContent(this.state);
		})	
	}
	getC = (value) => {
		this.setState({
			$c: value
		}, () => {
			this.props.onReqContent(this.state);
		})
	}
	getConstrain = (value) => {
		this.setState({
			$G: value
		}, () => {
			this.props.onReqContent(this.state);
		})
	}

	getP = (value) => {
		this.setState({
			$h: value.$h,
			$q: value.$q,
			$b: value.$b
		}, () => {
			this.props.onReqContent(this.state);
		})
		console.log(this.state, "header-->ReqContent.js")
	}

	render() {
		return ( 			
			<div className={s.reqContent}>
				<FormInputOnly name="Url" tag="$U" ref="aaaaaa" placeval="Url" formInputOnlyVal={this.getUrl} />
				<FormSelect name="Method" tag="$m" optval="GET,DELETE,Post,PUT,OPTIONS" formSelectVal={this.getM} />	
				<FormParams name="Header" tagsign="$h" tag="$h" formParamsVal={this.getP} />
				<FormParams name="Query" tagsign="$q" tag="$q" formParamsVal={this.getP} />
				<FormSelect name="ContentType" tag="$c" optval="application/json, application/xxx-w/text"  formSelectVal={this.getC} />
				<FormParams name="Body" tagsign="$b" tag="$b" formParamsVal={this.getP} />	
				<Constraint constraintVal={this.getConstrain} />		
			</div>
		);
	}
}

export default withStyles(s)(ReqContent);
