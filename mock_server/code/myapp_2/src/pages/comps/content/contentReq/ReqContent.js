import React from "react"
import FormX from "./formx"

class ReqContent extends React.Component {

	render() {
		return ( 
			// < div > {
			// 	this.props.mockNames_req.ruleName
			// } < /div>
			<div>
				<FormX type="input" name="Url" tag="$U" />
				<FormX type="select" name="Method" tag="$M" values="GET, PUT, POST, DELETE"
			</div>
		);
	}
}

export default ReqContent;