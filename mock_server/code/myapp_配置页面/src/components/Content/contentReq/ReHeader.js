import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'

class ReqHeader extends Component {
	
	render () {
		return (
		<div className={s.conreq_hd}>
				<div className={s.conreq_ti}>
					<h3 className={s.conreq_ti_h}>{this.props.title}</h3>
				</div>
			</div>
		)
	}
}

export default withStyles(s)(ReqHeader);
