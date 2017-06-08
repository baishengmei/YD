import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Summary.css';
import AccountInfo from './AccountInfo';
import AdInfo from './AdInfo';

class Summary extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    ad: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    const {
      account,
      ad,
    } = this.props;

    return account !== nextProps.account || ad !== nextProps.ad;
  }

  render() {
    const {
      account,
      ad,
    } = this.props;

    return (
      <section className='root'>
        <div className={s.summaryContainer}>
          <AccountInfo {...account} />
          <span className={s.space} />
          <AdInfo {...ad} />
        </div>
      </section>
    );
  }
}

export default withStyles(s)(Summary);
