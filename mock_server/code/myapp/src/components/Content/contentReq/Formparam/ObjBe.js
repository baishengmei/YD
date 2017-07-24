import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import { Row, Col, Icon } from 'antd'
import FFormP from '../FormParams'

let uuid = 1;
let objBe = {};//value所对应的对象
let objBeV = {};//value中包含若干key->value键值对，其中每一项key对应的value值
class ObjBe extends Component {

	getO = (value) => {
		const tag = "value";
		// const paramObj = this.props.paramObj;
		console.log(value.$in, "dddddddddddddddddddddddd")
		// this.val2obj(value.$in, paramObj, tag);
	}

	val2obj = (val, obj, tag) => {
		this.props.toVal2Obj(val, obj, tag);
	}

	render() {
	    return (
	    	<div>
	    		<FFormP clearTag={this.props.clearTag} name="" tagsign="$in" tag="" formParamsVal={this.getO} />
	    	</div>
	    )
	}
}

export default withStyles(s)(ObjBe);