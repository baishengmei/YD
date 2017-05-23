import React from 'react';
import { Layout } from 'antd';
const { Footer} = Layout;
import 'antd/dist/antd.less'

class footer extends React.Component {

	render() {
		return ( < Footer style = {
				{
					textAlign: 'center'
				}
			} >
			Ant Design© 2016 Created by Ant UED < /Footer>
		);
	}
}

export default footer;