import React from 'react'
import ReHeader from "./contentReq/ReHeader"
import ReqContent from './contentReq/ReqContent'
import ReqSave from './contentReq/ReqSave'

class ContentReq extends React.Component {

	ContentReqSave = () => {
		console.log("ContentReq=>ReqSave:");
		this.props.onReqSave();
	}

	reqContentData = (value) => {
		this.props.onContentReq(value);
	}
	render() {
		return ( 
			<div>
				<ReHeader title="Request" />
				<ReqContent clearTag={this.props.clearTag} onReqContent={this.reqContentData} />
				<ReqSave onReqSave={this.ContentReqSave} />
			</div>
		);
	}
}

export default ContentReq;
