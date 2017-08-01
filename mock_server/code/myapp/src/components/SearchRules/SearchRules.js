import React, { Component, PropTypes } from 'react';
import { Layout, Modal } from 'antd'
const { Content }= Layout
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './SearchRules.css';
import $ from 'jquery'
import SearchIf from './SearchIf.js'
import SearchContent from './SearchContent.js'

class SearchRules extends Component {

  render() {
    return (
      <div className={s.searchRules}>
        <SearchIf />
        <SearchContent />
      </div>
    );
  }
}

export default withStyles(s)(SearchRules);