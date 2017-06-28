import { Row, Col, Input, Button } from 'antd';
import React, { Component, PropTypes } from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'

class Formgroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			consIf: "",
			consExp: ""
		}
	}

	componentWillReceiveProps (nextProps) {
	    if (nextProps.clearTag) {
	      this.setState({
	      	consIf: "",
	      	consExp: "",
	      })
	    }
	}

	handleTagRemove = () => {
		const k = this.props.keyindex;
		this.props.tapRemove(k);
	}

	getIf = (e) => {
		const k = this.props.keyindex;
		this.setState({
			consIf: e.target.value
		}, () => {
			if(this.state.consExp == ""){
				this.props.onConstraintChange(k, this.state.consIf, true);
			}else{
				this.props.onConstraintChange(k, this.state.consIf, this.state.consExp);
			}
			
		})
	}

	getExp = (e) => {
		const k = this.props.keyindex;
		this.setState({
			consExp: e.target.value
		}, () => {
			if(this.state.consIf == ""){
				this.props.onConstraintChange(k, true, this.state.consExp);
			}else{
				this.props.onConstraintChange(k, this.state.consIf, this.state.consExp);
			}			
		})
	}

	render() {

		const {k} = this.props.keyindex;

		return (
			<div key={k}>
				<FormInputOnly clearTag={this.props.clearTag} name="响应条件:" placeval="例：$G1 && $G2" tip="注：若无约束条件，默认为true" formInputOnlyVal={this.getResIf} />
				<FormInputOnly clearTag={this.props.clearTag} name="Status Code" thevalue="200" formParamsVal={this.getSC} formInputOnlyVal={this.getResCode} />
				<FormSelect clearTag={this.props.clearTag} name="ContentType" tag="$c" optval="application/json, application/xxx-w/text, text/javascript, text/json"  formSelectVal={this.getC} />
				<FormParams clearTag={this.props.clearTag} name="Body" tagsign="$resB" tag="$b" formParamsVal={this.getP} />
				<div className={s.resDel}>
                	<Button type="primary" disabled={k===1} onClick={()=>{this.delBtn(k)}}>
      					删除
      				</Button>
              	</div>
				{this.cutoff(this.state.cutoff, k)}
  			</div>
		)
	}
}

export default withStyles(s)(Formgroup);