import React, { PropTypes } from 'react';
import s from './DataStatistics.css';
import { formatNumber } from '../../../core/utils';

function StatisticsSummary({ consumption, impressions, clickNum, clickRate, cpc }) {
  return (
    <section className={s.summaryContainer}>
      <div className={s.summary__item}>
        <div className={s.item__title}>总花费 (元)</div>
        <div className={s.item__content}>{formatNumber(consumption)}</div>
      </div>
      <div className={s.splitter} />
      <div className={s.summary__item}>
        <div className={s.item__title}>展示数</div>
        <div className={s.item__content}>{formatNumber(impressions)}</div>
      </div>
      <div className={s.splitter} />
      <div className={s.summary__item}>
        <div className={s.item__title}>点击数</div>
        <div className={s.item__content}>{formatNumber(clickNum)}</div>
      </div>
      <div className={s.splitter} />
      <div className={s.summary__item}>
        <div className={s.item__title}>点击率</div>
        <div className={s.item__content}>{clickRate}%</div>
      </div>
      <div className={s.splitter} />
      <div className={s.summary__item}>
        <div className={s.item__title}>平均点击单价（元）</div>
        <div className={s.item__content}>{cpc}</div>
      </div>
    </section>
  );
}

StatisticsSummary.propTypes = {
  consumption: PropTypes.number.isRequired,
  impressions: PropTypes.number.isRequired,
  clickNum: PropTypes.number.isRequired,
  clickRate: PropTypes.number.isRequired,
  cpc: PropTypes.number.isRequired,
};

export default StatisticsSummary;
