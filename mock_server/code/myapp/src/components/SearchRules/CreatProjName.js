import React, { Component, PropTypes } from 'react';
import { Layout, Modal, Table, Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchRules.css';
import $ from 'jquery'

class ShowDetailRules extends Component {

	render() {
	    return (
		    <div className={s.showdetailrules}>
		    	helloword
		    </div>
	    )
	}
}

export default withStyles(s)(ShowDetailRules);