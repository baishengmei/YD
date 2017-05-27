import React from "react"
import FormInput from './forminput'
import FormSelect from './formselect'
import FormParams from './formparams'

class ReqContent extends React.Component {

	render() {
		return ( 
			
			<div className="reqContent">
				<FormInput name="Url" tag="$U" />
				<FormSelect name="Method" tag="$M" optval="GET,DELETE,Post,PUT,OPTIONS" />	
				<FormParams name="Query" tag="$q" />			
			</div>
		);
	}
}

export default ReqContent;