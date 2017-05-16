import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import header from './header.js'

class Mockserver extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			todoList: [],
			showTooltip: false  // 控制 tooltip 的显示隐藏
		}
	}

  	render() {
	  	return (
	  		<div className="container">
				<header></header>
				<div>contents mock_server gengxin</div>
			</div>
  		)
  	}
}

export default Mockserver;