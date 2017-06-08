import React from 'react'
import ReqHeader from "./contentReq/ReqHeader"
import ReqContent from './contentReq/ReqContent'

class ContentReq extends React.Component {

	render() {
		return ( 
			<div>
				<ReqHeader />
				<ReqContent />
			</div>
		);
	}
}

export default ContentReq;
