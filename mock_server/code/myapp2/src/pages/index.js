import React, { Component, PropTypes } from 'react'
// import ReactDOM from 'react-dom'
import mockHeader from './header.js'

class Mockserver extends React.Component {

  	render() {
	  	return (
	  		<div className="container">
				<mockHeader />
				<div>121212contents mock_serv webpack okdjaf</div>
			</div>
  		)
  	}
}

export default Mockserver;