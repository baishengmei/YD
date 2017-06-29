import React from 'react'
import { Button } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'

class ReSave extends React.Component {

	render() {
		return ( 
			<div className={s.reSave}>
				<Button size="large" type="primary" onClick={this.props.onReSave}>保存</Button>
    			<Button size="large">取消</Button>
			</div>
		);
	}
}

export default withStyles(s)(ReSave);
