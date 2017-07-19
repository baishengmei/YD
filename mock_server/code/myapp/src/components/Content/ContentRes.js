import React, { PropTypes, Component } from 'react';
import { Form, Button } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReq/contentReqCss/ContentReqCss.css'
import EachRes from './contentReq/EachRes'
import ReHeader from './contentReq/ReHeader'

let uuid = 1;
let resDate=[];//response的所有数据
let resB = {};//resB1-10的值
class contentres extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			keys: [1],
			resDate: [],
		}
	}
	
	remove = (k) => {
	    const keys = this.state.keys;
	    if (keys.length === 1) {
	      return;
	    };
	    const arrkeys = [];
	    for(let temp=1; temp<=keys.length-1; temp++){
	      arrkeys.push(temp);
	    }
	    this.setState({
	      keys: arrkeys,
	    });
	    if(keys.indexOf(k) !== -1){
	    	resDate.splice(k,1)
	    }
	}
  	add = () => {
	    const keys = this.state.keys;
	    uuid = keys.length +1;
	    const nextKeys = keys.concat(uuid);
	    this.setState({
	      keys: nextKeys
	    });
  	}
  	deepCopy = (source) => {
  		var result ={};
  		for(let key in source){
  			result[key]=typeof source[key] === 'object'?this.deepCopy(source[key]): source[key];
  		}
  		return result;
  	} 
	ContentRes = (value, k) => {
		resDate[k-1] = value;
		resB = this.deepCopy(resDate[k-1])
		for(let i in resDate[k-1]){
			if(i.toString().match(/^\$\w+(\d+)$/) !== null && i.toString().match(/^\$\w+(\d+)$/)[1] !== k){				
				delete resDate[k-1][i];
			}
		}
		resDate[k-1][`$resB${k}`] = this.deepCopy(resB[`$resB${k}`]);
		delete resDate[k-1].cutoff;
		this.setState({
			resDate: resDate
		}, () => {
			this.props.onContentRes(this.state.resDate);
		})
		
	}

	componentWillReceiveProps (nextProps) {
	    if (nextProps.clearTag) {
	      this.setState({
	      	keys:[1],
	      	resDate: []
	      });
	    }
	}

	render() {

  		const keys = this.state.keys;

  		const addResponses = keys.map((k, index) => {
  			return(
  				<EachRes clearTag={this.props.clearTag} thekeys={this.state.keys} key={k} tapRemove={()=>this.remove(k)} keyindex={k} onContentRes={this.ContentRes} />
  			)
  		})
    	return (
	    	<div>
	      		<div className={s.addRes}>
	      			<Button type="dashed" onClick={()=>this.add()}>+新增响应</Button>
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