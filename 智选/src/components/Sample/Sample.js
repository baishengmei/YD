import React, { PropTypes, Component } from 'react';
import styles from './Sample.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

@withStyles(styles)
class Sample extends Component {
  constructor() {
    super();
  }

  static propTypes = {};

  static contextTypes = {};

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  render() {
    return (
      <div className='sample' ref="sample">
      </div>
    );
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}
}

export default Sample;
