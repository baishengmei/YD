import React, { Component, PropTypes } from 'react';
import s from './Summary.css';
import iconConsume from './ic_consume.png';
import iconSum from './ic_sum.png';
import { formatNumber } from '../../../core/utils';

class AccountInfo extends Component {
  static propTypes = {
    balance: PropTypes.number.isRequired,
    todayConsumption: PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const {
      balance,
      todayConsumption,
    } = this.props;

    return balance !== nextProps.balance
      || todayConsumption !== nextProps.todayConsumption;
  }

  render() {
    const {
      balance,
      todayConsumption
    } = this.props;

    return (
      <div className={`${s.summaryInfo} ${s.account}`}>
        <header className={s.info__title}>账户信息</header>
        <section className={s.info__card}>
          <div className={s.card__item}>
            <div className={s.item__wrapper}>
              <div className={s.item__title}>
                <img className={s.subLogo} src={iconConsume} alt='' />
                <span className={s.title__text}>今日账户消耗</span>
              </div>
              <div className={s.item__content}>
                {formatNumber(todayConsumption)}
              </div>
            </div>
          </div>
          <span className={s.splitter} />
          <div className={s.card__item}>
            <div className={s.item__wrapper}>
              <div className={s.item__title}>
                <img className={s.subLogo} src={iconSum} alt='' />
                <span className={s.title__text}>账户总余额</span>
              </div>
              <div className={s.item__content}>
                {formatNumber(balance)}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AccountInfo;
