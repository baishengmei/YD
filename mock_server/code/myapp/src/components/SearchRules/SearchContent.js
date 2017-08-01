import React, { Component, PropTypes } from 'react';
import { Layout, Modal } from 'antd'
const { Content }= Layout
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './SearchRules.css';
import $ from 'jquery'

class SearchContent extends Component {

  render() {
    return (
      <div>
      	i love you too.
      </div>
    );
  }
}

export default withStyles(s)(SearchContent);