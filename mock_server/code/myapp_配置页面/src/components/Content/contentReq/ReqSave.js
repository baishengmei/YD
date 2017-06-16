import React from 'react'
import { Button } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'

class ReqSave extends React.Component {

	render() {
		return ( 
			<div className={s.reqSave}>
				<Button type="primary" onClick={this.props.onReqSave}>保存</Button>
    			<Button>取消</Button>
			</div>
		);
	}
}

export default withStyles(s)(ReqSave);
