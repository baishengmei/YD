// maybe it's eslint bug
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { Component, PropTypes, Children } from 'react';
// maybe it's eslint bug
// eslint-disable-next-line import/no-extraneous-dependencies
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../../containers/Header';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  static contextTypes = {
    path: PropTypes.string.isRequired,
  };

  render() {
    const { path } = this.context;

    return (
      <div>
        <Header />
        {Children.only(this.props.children)}
      </div>
    );
  }
}

export default withStyles(s)(Layout);
