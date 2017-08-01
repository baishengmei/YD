import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import { Row, Col, Icon } from 'antd'
import ObjFormParams from '../ObjFormParam'

let objVal = {};//将数组类型转成对象类型，如[{type: "int", value: [1,100]}, {type:"bool"}]变成{{type: "int", value: [1,100]}, {type:"bool"}}
let linshi = {};
class ObjBe extends Component {

	getO = (value) => {
		console.log(this.props.objTag);
		const tag = "value";
		const paramObj = this.props.paramObj;
		objVal = {};		
		for(let i=0; i<value.$in.length; i++){
			objVal = Object.assign(objVal, value.$in[i])
		}
		this.val2obj(objVal, linshi, tag);
	}
	componentDidMount() {
		objVal = {};
		if(this.props.objTag == 0){
			linshi = this.props.paramObj;
		}
	}

	val2obj = (val, obj, tag) => {
		this.props.postObjVal(val, linshi, tag);
	}

	render() {
	    return (
	    	<div>
	    		<ObjFormParams clearTag={this.props.clearTag} name="" tagsign="$in" tag="" formParamsVal={this.getO} objTag={this.props.objTag+1}/>
	    	</div>
	    )
	}
}

export default withStyles(s)(ObjBe);