import React, { PropTypes, Component } from 'react';
import { Row, Col, Form, Cascader, Modal } from 'antd'
const FormItem = Form.Item
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import { options, allOptionItems } from '../Utilsvari'

class paramSel extends Component {

	//当key值输入不正确或者为空，选择select框时，提示需首先输入key值才可进行操作
	error = () => {
	  Modal.error({
	    title: 'This is an error message',
	    content: 'Please input the key first...',
	  });
	}

	//判断对象是否为空
	isEmptyObject = (e) => {  
	    let t;  
	    console.log(e, "eeeeeeeeeeee")
	    for (t in e) {
	    	if(t.trim()=="" || t==undefined){
	    		return !0;
	    	}else{
	    		return !1;
	    	}
	    }

	        // return !1;  
	    return !0  
	} 

	onChangeParaDef = (value) => {

		const { keyval } = this.props;
		console.log(keyval,this.isEmptyObject(keyval),"dddddddddddddd")
		if(this.isEmptyObject(keyval) == true){
			this.error();
			console.log("trueeeeeeeeeee")
			this.props.onChangeSel(["", ""]);
		}else{
			this.props.onChangeSel(value);
		}
	    
	}

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;

		return (
			<FormItem>
                <Cascader
                	ref="sel1"
                  	options={options}
                 	expandTrigger="hover"
                  	onChange={this.onChangeParaDef}
                  	className={s.paramsSelect}
                  	placeholder="Regex"
                />
            </FormItem>
		)
	}
}


const ParamSel = Form.create()(paramSel);
export default withStyles(s)(ParamSel);