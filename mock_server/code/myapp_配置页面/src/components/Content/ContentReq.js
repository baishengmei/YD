import React from 'react'
import ReHeader from "./contentReq/ReHeader"
import ReqContent from './contentReq/ReqContent'
import ReqSave from './contentReq/ReqSave'

class ContentReq extends React.Component {

	ContentReqSave = () => {
		console.log("ContentReq=>ReqSave:");
		this.props.onReqSave();
	}
	render() {
		return ( 
			<div>
				<ReHeader title="Request"/>
				<ReqContent />
				<ReqSave onReqSave={this.ContentReqSave}/>
			</div>
		);
	}
}

export default ContentReq;
