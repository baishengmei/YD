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
		}, () => {
			this.props.onReqContent(this.state);
		})		
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
	}
	componentWillReceiveProps (nextProps) {
    	if (nextProps.clearTag) {
    	  	this.setState({
    	  		$u: "",//url
				$c: "",//contentType
				$m: "",//method
				$h: {},//header
				$q: {},//query
				$b: {},//body
				$G: {}//constraint
    	  	});
    	  	// this.props.onChangeInput(this.state.paraminput, this.props.tagsign);
    	}
  	}
	render() {
		const clearTag = this.props.clearTag;
		return ( 			
			<div className={s.reqContent}>
				<FormInputOnly clearTag={this.props.clearTag} name="Url" tag="$U" ref="aaaaaa" placeval="Url" formInputOnlyVal={this.getUrl} redtag="true"/>
				<FormSelect clearTag={this.props.clearTag} name="Method" tag="$m" optval="GET,DELETE,Post,PUT,OPTIONS" formSelectVal={this.getM} />	
				<FormParams clearTag={this.props.clearTag} name="Header" tagsign="$h" tag="$h" formParamsVal={this.getP} />
				<FormParams clearTag={this.props.clearTag} name="Query" tagsign="$q" tag="$q" formParamsVal={this.getP} />
				<FormSelect clearTag={this.props.clearTag} name="ContentType" tag="$c" optval="application/json, application/xxx-w/text, text/javascript, text/json"  formSelectVal={this.getC} />
				<FormParams clearTag={this.props.clearTag} name="Body" tagsign="$b" tag="$b" formParamsVal={this.getP} />	
				<Constraint clearTag={this.props.clearTag} constraintVal={this.getConstrain} />		
			</div>
		);
	}
}

export default withStyles(s)(ReqContent);
