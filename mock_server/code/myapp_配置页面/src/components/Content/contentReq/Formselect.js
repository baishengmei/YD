import React from "react"
import { Form, Select } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
import { Row, Col } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'

class formselect extends React.Component {

	constructor(props) {
		super(props);
	}

	getSelVal = (value) => {
		const { formSelectVal } = this.props;
    	formSelectVal(value);
	}

	componentWillReceiveProps (nextProps) {
	    if (nextProps.clearTag) {
	      this.props.form.resetFields();
	    }
    }

	render() {

		const { name, tag, optval } = this.props;
		const { getFieldDecorator } = this.props.form;

		const formOptions = optval.split(",").map((val, i) => {
        	return (
        		<Option key={val} value={val.toUpperCase()}>{val.toUpperCase()}</Option>
        	)
      	})

		return (
			<div>				
				<Row type="flex" justify="start">
					<Col span={3}>
						<p className={s.paramsLabel}>{`${name} ( ${tag} ):`}</p>
					</Col>
					<Col span={13} offset={1}>
						<Form>
					        <FormItem>
					          {getFieldDecorator(name.toLowerCase(), {
					          	validateTrigger: ['onChange', 'onBlur'],
					            rules: [{ required: true, message: `Please input the legal ${name.toLowerCase()}!` }],
					            
					          })(
					            <Select placeholder={name} className={s.paramsSelect} onChange={this.getSelVal}> 
					            	{ formOptions }
					            </Select>
					          )}
					        </FormItem>
					    </Form>
					</Col>
				</Row>
			</div>
		)
	}
}

const FormSelect = Form.create()(formselect);
export default withStyles(s)(FormSelect);