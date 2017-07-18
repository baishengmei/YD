import React, { PropTypes, Component } from 'react';
import { Form, Button } from 'antd'
import FormInputOnly from './ForminputOnly'
import FormSelect from './Formselect'
import FormParams from './Formparams.js'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'

class EachRes extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cutoff: true, //是否包含分割线
			$i: "true",//响应条件
			$sc: "200", //statue code状态码
			$c: "",//content-type
			// $resB: {},//body也就是parameters
			$resB1: {},
			$resB2: {},
			$resB3: {},
			$resB4: {},
			$resB5: {},
			$resB6: {},
			$resB7: {},
			$resB8: {},
			$resB9: {},
			$resB10: {}
		}
	}

	getResIf = (value) => {
		this.setState({
			$i: value || "true"
		}, () => {
			this.props.onContentRes(this.state, this.props.keyindex);
		});		
	}
	getResCode = (value) => {
		this.setState({
			$sc: value || "200"
		}, () => {
			this.props.onContentRes(this.state, this.props.keyindex);
		})		
	}
	getC = (value) => {
		this.setState({
			$c: value
		}, () => {
			this.props.onContentRes(this.state, this.props.keyindex);
		})		
	}
	getP = (value) => {
		for(let i in value){
			if(i.toString().match(/^\$\w+(\d+)$/) !== null){
				if(i.toString().match(/^\$\w+(\d+)$/)[1] == "1"){
					this.setState({
						$resB1: value.$resB1
					}, () => {
						this.props.onContentRes(this.state,this.props.keyindex)
					})
				}else if(i.match(/^\$\w+(\d+)$/)[1] == "2"){
					this.setState({
						$resB2: value.$resB2
					}, () => {
						this.props.onContentRes(this.state,this.props.keyindex)
					})
				}else if(i.match(/^\$\w+(\d+)$/)[1] == "3"){
					this.setState({
						$resB3: value.$resB3
					}, () => {
						this.props.onContentRes(this.state,this.props.keyindex)
					})
				}else if(i.match(/^\$\w+(\d+)$/)[1] == "4"){
					this.setState({
						$resB4: value.$resB4
					}, () => {
						this.props.onContentRes(this.state,this.props.keyindex)
					})
				}else if(i.match(/^\$\w+(\d+)$/)[1] == "5"){
					this.setState({
						$resB5: value.$resB5
					}, () => {
						this.props.onContentRes(this.state,this.props.keyindex)
					})
				}else if(i.match(/^\$\w+(\d+)$/)[1] == "6"){
					this.setState({
						$resB6: value.$resB6
					}, () => {
						this.props.onContentRes(this.state,this.props.keyindex)
					})
				}else if(i.match(/^\$\w+(\d+)$/)[1] == "7"){
					this.setState({
						$resB7: value.$resB7
					}, () => {
						this.props.onContentRes(this.state,this.props.keyindex)
					})
				}else if(i.match(/^\$\w+(\d+)$/)[1] == "8"){
					this.setState({
						$resB8: value.$resB8
					}, () => {
						this.props.onContentRes(this.state,this.props.keyindex)
					})
				}else if(i.match(/^\$\w+(\d+)$/)[1] == "9"){
					this.setState({
						$resB9: value.$resB9
					}, () => {
						this.props.onContentRes(this.state,this.props.keyindex)
					})
				}else if(i.match(/^\$\w+(\d+)$/)[1] == "10"){
					this.setState({
						$resB10: value.$resB10
					}, () => {
						this.props.onContentRes(this.state,this.props.keyindex)
					})
				}
			}			
		}
	}
	//response分割线设置
	cutoff = (hasCutoff, k) => {
		const keys = this.props.thekeys;
		if(keys.length == 1 || k == keys.length){
			return;
		}else{
			return(
				<div className={s.cutoff}></div>
			)
		}	
	}

	componentWillReceiveProps (nextProps) {
	    if (nextProps.clearTag) {
	      this.setState({
	      	$i: "",
	      	$sc: '200',
	      	$c: "",
	      	$resB1: {},
			$resB2: {},
			$resB3: {},
			$resB4: {},
			$resB5: {},
			$resB6: {},
			$resB7: {},
			$resB8: {},
			$resB9: {},
			$resB10: {}
	      });
	    }
	}

	delBtn = () => {
		const k = this.props.keyindex;
		this.props.tapRemove(k);
	}

	render() {

		const k = this.props.keyindex;

		return (
			<div>
				<FormInputOnly clearTag={this.props.clearTag} name="响应条件:" placeval="例：$G1 && $G2" tip="注：若无约束条件，默认为true" formInputOnlyVal={this.getResIf} />
				<FormInputOnly clearTag={this.props.clearTag} name="Status Code" thevalue="200" formParamsVal={this.getSC} formInputOnlyVal={this.getResCode} />
				<FormSelect clearTag={this.props.clearTag} name="ContentType" tag="$c" optval="application/json, application/xxx-w/text, text/javascript, text/json"  formSelectVal={this.getC} />
				<FormParams thekey={k} clearTag={this.props.clearTag} name="Body" tagsign="$resB" tag="$b" formParamsVal={this.getP} />
				<div className={s.resDel}>
                	<Button type="primary" disabled={k===1} onClick={this.delBtn}>
      					删除
      				</Button>
              	</div>
				{this.cutoff(this.state.cutoff, k)}
  			</div>
		)
	}
}

export default withStyles(s)(EachRes);