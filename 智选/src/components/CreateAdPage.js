import React, { PropTypes, Component } from 'react';
import styles from './CreateAdPage.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

@withStyles(styles)
class CreateAdPage extends Component {
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
      <div className='createAdPage' ref="createAdPage">
      </div>
    );
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}
}

export default CreateAdPage;
