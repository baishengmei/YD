import React from "react"
import { Form, Input } from 'antd'
const FormItem = Form.Item;
import { Row, Col } from 'antd'

class Formx extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const { name, tag } = this.props;
		const { getFieldDecorator } = this.props.form;

		return (
			<div>
				
				<Row type="flex" justify="start">
					<Col span={4}>
						<p className="paramsLabel">{`${name} ( ${tag} ):`}</p>
					</Col>
					<Col span={12} offset={2}>
						<Form>
					        <FormItem>
					          {getFieldDecorator(name.toLowerCase(), {
					            rules: [{ required: true, message: `Please input the legal ${name.toLowerCase()}!` }],
					          })(
					            <Input placeholder={name} className="paramsInput" />
					          )}
					        </FormItem>
					    </Form>
					</Col>

				</Row>
			</div>
		)
	}
}

const FormInput = Form.create()(Formx);
export default FormInput;