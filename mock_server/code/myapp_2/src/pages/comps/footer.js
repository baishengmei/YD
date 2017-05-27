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
			Mock Server© 2017 Created by baishm < /Footer>
		);
	}
}

export default footer;