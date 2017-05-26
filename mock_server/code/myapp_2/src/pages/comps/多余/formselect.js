import React from "react"
import { Form, Select, Input, Icon } from 'antd'
const FormItem = Form.Item;
import { Row, Col } from 'antd'

let uuid = 1;

class selectcomponent extends React.Component {

	constructor(props) {
		super(props);
	}

	remove (k)  {
	    const { form } = this.props;
	    // can use data-binding to get
	    const keys = form.getFieldValue('keys');
	    // We need at least one passenger
	    if (keys.length === 1) {
	      return;
	    }

	    // can use data-binding to set
	    form.setFieldsValue({
	      keys: keys.filter(key => key !== k),
	    });
	  }

	  add () {
	    uuid++;
	    const { form } = this.props;
	    // can use data-binding to get
	    const keys = form.getFieldValue('keys');
	    const nextKeys = keys.concat(uuid);
	    // can use data-binding to set
	    // important! notify form to detect changes
	    form.setFieldsValue({
	      keys: nextKeys,
	    });
	    console.log("keys:", keys);
	  }

	render() {

		const { getFieldDecorator, getFieldValue } = this.props.form;
		const { name, tag } = this.props;
		getFieldDecorator('keys', { initialValue: [1] });
		const keys = getFieldValue('keys');

		const formItems = keys.map((k, index) => {
	      return (
	        <FormItem
	          {...formItemLayout}
	          label=''
	          required={false}
	          key={k}
	        >
	          {getFieldDecorator(`names-${k}`, {
	            validateTrigger: ['onChange', 'onBlur'],
	            rules: [{
	              required: true,
	              whitespace: true,
	              message: `Please input the legal ${name.toLowerCase()}!`,
	            }],
	          })(
	            <Input placeholder={name} className="paramsInput" />
	          )}
	          <Icon
	            className="dynamic-delete-button"
	            type="minus-circle-o"
	            disabled={keys.length === 1}
	            onClick={() => this.remove(k)}
	          />
	          <Icon className="dynamic-plus-button"
	          type="plus-circle-o"
	          onClick={this.add.bind(this)}
	          />
	        </FormItem>
	      );
	    });

		return (
			<div>	
				<Row type="flex" justify="start">
					<Col span={4}>
						<p className="paramsLabel">{`${name} ( ${tag} ):`}</p>
					</Col>
					<Col span={12} offset={2}>
						<Form>
							{formItems}
					    </Form>
					</Col>
				</Row>
			</div>
		)
	}
}

const FormSelect = Form.create()(selectcomponent);
export default FormSelect;