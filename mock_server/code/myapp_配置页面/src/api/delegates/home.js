import {
  getFinance,
  getAdGroupCount,
  getAdContentCount,
  getAdStats,
} from './atomicRequest';

async function allReducer({ accessId, user, timeout, data }) {
  const contentArr = await Promise.all([
    getAdContentCount(accessId, user, timeout),
    getAdGroupCount(accessId, user, timeout),
    getFinance(accessId, user, timeout),
    getAdStats(accessId, user, timeout * 2, data)
  ]);

  return {
    summary: mergeSummary(contentArr),
    detail: mergeDetail(contentArr[3], data.dateRange[0] === data.dateRange[1])
  };
}

async function detailReducer({ accessId, user, timeout, data }) {
  const content = await getAdStats(accessId, user, timeout * 2, data);
  return mergeDetail(content, data.dateRange[0] === data.dateRange[1]);
}

function mergeSummary(contentArr) {
  const {
    tobeAudit: toBeAudit = /* istanbul ignore next */ 0,
    invalid: unpass = /* istanbul ignore next */ 0,
  } = contentArr[0];

  const {
    outOfBudget = /* istanbul ignore next */ 0,
  } = contentArr[1];

  const {
    balance = 0,
    sponsorTodayConsumption: todayConsumption = /* istanbul ignore next */ 0,
  } = contentArr[2];

  return {
    account: {
      balance,
      todayConsumption,
    },
    ad: {
      toBeAudit,
      unpass,
      outOfBudget,
    },
  };
}

function mergeDetail(content, oneDay = false) {
  const {
    totalImpr: impressions = /* istanbul ignore next */ 0,
    totalClick: clickNum = /* istanbul ignore next */ 0,
    totalClickRate: clickRate = /* istanbul ignore next */ 0,
    totalConsumption: consumption = /* istanbul ignore next */ 0,
    totalCostPerClick: cpc = /* istanbul ignore next */ 0,
    axisMap: detailMap = {
      [oneDay ? 'hour' : 'xDays']: []
    }
  } = content;

  const detail = detailMap[oneDay ? 'hour' : 'xDays'].map((x, i) => ({
    x,
    consumption: detailMap.consumption[i],
    impressions: detailMap.imprNum[i],
    clickNum: detailMap.clickNum[i],
    clickRate: detailMap.clickRate[i],
    cpc: detailMap.costPerClick[i],
  }));

  return {
    summary: {
      impressions,
      clickNum,
      clickRate,
      consumption,
      cpc,
    },
    detail
  };
}

export {
  allReducer,
  detailReducer
};
