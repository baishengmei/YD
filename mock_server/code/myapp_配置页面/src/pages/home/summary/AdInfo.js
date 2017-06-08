import React, { Component, PropTypes } from 'react';
import s from './Summary.css';
import Link from '../../../components/Link';

class AdInfo extends Component {
  static propTypes = {
    toBeAudit: PropTypes.number.isRequired,
    unpass: PropTypes.number.isRequired,
    outOfBudget: PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const {
      toBeAudit,
      unpass,
      outOfBudget
    } = this.props;

    return toBeAudit !== nextProps.toBeAudit
      || unpass !== nextProps.unpass
      || outOfBudget !== nextProps.outOfBudget;
  }

  render() {
    const {
      toBeAudit,
      unpass,
      outOfBudget
    } = this.props;

    return (
      <div className={`${s.summaryInfo} ${s.ad}`}>
        <header className={s.info__title}>广告统计</header>
        <section className={s.info__card}>
          <Link
            className={s.card__item}
            to={'/adManagement/adContent?filter=toBeAudit'}
          >
            <div className={s.item__title}>
              <span className={s.title__text}>待审核</span>
            </div>
            <div className={s.item__content}>
              {toBeAudit}
            </div>
          </Link>
          <span className={s.splitter} />
          <Link
            className={s.card__item}
            to={'/adManagement/adContent?filter=unpass'}
          >
            <div className={s.item__title}>
              <span className={s.title__text}>未通过</span>
            </div>
            <div className={s.item__content}>
              {unpass}
            </div>
          </Link>
          <span className={s.splitter} />
          <Link
            className={s.card__item}
            to={'/adManagement/adGroup?filter=outOfBudget'}
          >
            <div className={s.item__title}>
              <span className={s.title__text}>预算不足</span>
            </div>
            <div className={s.item__content}>
              {outOfBudget}
            </div>
          </Link>
        </section>
      </div>
    );
  }
}

export default AdInfo;
