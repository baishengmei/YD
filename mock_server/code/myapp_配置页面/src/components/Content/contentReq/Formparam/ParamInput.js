import React, { PropTypes, Component } from 'react';
import { Form, Input } from 'antd'
const FormItem = Form.Item
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'

class paramInput extends Component {

	// static propTypes = {
	// 	onChangeInput: React.PropTypes.fun,
	// 	placevalue: React.PropTypes.isRequired,
	// };

	onChangeInput = (e) => {
		const { clearState } = this.props;
		if(clearState == true){
			// console.log("输入错误格式数据")
		}else{
			
			// console.log(clearState, "clearState状态")
			this.props.onChangeInput(e.target.value);
		}		
	}

	componentWillReceiveProps (nextProps) {
    	if (nextProps.clearTag) {
    	  	this.props.form.resetFields();
    	}
  	}

	render() {

		const { getFieldDecorator, getFieldValue } = this.props.form;
		const placevalue = this.props.placevalue;

		return (
			<FormItem>
	            {getFieldDecorator(`input`, {
	              	rules: [{
		                whitespace: true,
		            }],
	            })(
	              	<Input onChange={this.onChangeInput} placeholder={placevalue} className={s.paramsInputShort} />
	            )}
	        </FormItem>
		)
	}
}


const ParamInput = Form.create()(paramInput);
export default withStyles(s)(ParamInput);