import React from 'react'
import { Form, Select, Input } from 'antd'
import { Row, Col } from 'antd'
const FormItem = Form.Item;
const option = Select.Option;

class ContentNameform extends React.Component {


	render() {

		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	    	labelCol: { span: 4 },
	    	wrapperCol: { span: 14 },
	    };
		//获取从父组件传递过来的 mockName，即规则名/项目名
		const mockNames = this.props.mockNames;
		return (
			<Form>
				<Row>
					<Col span={8}>
						<FormItem label="规则名" {...formItemLayout}>
							{getFieldDecorator('rulename', {
								rules: [{ required: true, message: 'Please input the rule name!' }]
							})(
								<Input />
							)}
						</FormItem>
					</Col>
					<Col span={8} offset={8}>
						<FormItem label="项目名" {...formItemLayout}>
							{getFieldDecorator('projname', {
								rules: [{required: true, message: 'Please input the project name!' }]
							})(
								<Select placeholder="Project name">
									<Option value="xinzhixuan">xinzhixuan</Option>
									<Option value="yadk">yadk</Option>
								</Select>
							)}
						</FormItem>
					</Col>
				</Row>
			</Form>
		)
	}
}

const ContentName = Form.create()(ContentNameform);

export default ContentName;