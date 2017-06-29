import React from 'react'
import ReHeader from "./contentReq/ReHeader"
import ReqContent from './contentReq/ReqContent'

class ContentReq extends React.Component {

	reqContentData = (value) => {
		this.props.onContentReq(value);
	}
	render() {
		return ( 
			<div>
				<ReHeader title="Request" />
				<ReqContent clearTag={this.props.clearTag} onReqContent={this.reqContentData} />
			</div>
		);
	}
}

export default ContentReq;
