/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

export default class NotFoundPage extends Component {
  constructor() {
    super();
    this.title = 'Page Not Found';
  }

  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.context.setTitle(this.title)
  }

  render() {
    return (
      <div>
        <h1>{this.title}</h1>
        <p>Sorry, but the page you were trying to view does not exist.</p>
      </div>
    );
  }

}
