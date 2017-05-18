import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { mockHeader } from './header'

console.log(mockHeader)

class Mockserver extends Component {
	constructor(props){
		super(props)
	}

  	render() {
	  	return (
	  		<div className="container1">
				<mockHeader />
				<div>121212 contents mock_serv webpack okdjaf </div>
			</div>
  		)
  	}
}

export default Mockserver;