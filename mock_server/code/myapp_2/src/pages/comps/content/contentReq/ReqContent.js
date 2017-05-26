import React from "react"
import FormInput from './forminput'
import FormSelect from './formselect'

class ReqContent extends React.Component {

	render() {
		return ( 
			
			<div className="reqContent">
				<FormInput name="Url" tag="$U" />
				<FormSelect name="Method" tag="$M" optval="GET,DELETE,POST,PUT,OPTIONS" />				
			</div>
		);
	}
}

export default ReqContent;