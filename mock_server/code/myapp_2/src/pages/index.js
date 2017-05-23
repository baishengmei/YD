import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import Header from './comps/nav-bar'
import MockContent from './comps/content'
import Footer from './comps/footer'
import { Layout } from 'antd'

class Mockserver extends React.Component {

  	render() {
	  	return (
	  		<div>
	  			<Layout className="layout">
	  				<Header />
	  				<MockContent />
	  				<Footer />
	  			</Layout>
	  		</div>
  		)
  	}
}

export default Mockserver;
