import React from "react"
import { Form, Select } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
import { Row, Col } from 'antd'

class formselect extends React.Component {

	constructor(props) {
		super(props);
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
					<Col span={4}>
						<p className="paramsLabel">{`${name} ( ${tag} ):`}</p>
					</Col>
					<Col span={12} offset={1}>
						<Form>
					        <FormItem>
					          {getFieldDecorator(name.toLowerCase(), {
					            rules: [{ required: true, message: `Please input the legal ${name.toLowerCase()}!` }],
					          })(
					            <Select placeholder={name} className="paramsSelect"> 
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
export default FormSelect;