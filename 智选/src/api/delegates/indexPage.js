import http from '../../core/HttpDelegate';
import Promise from 'bluebird';
import { api } from '../../config';
import { getDateRangeByDateParams } from '../../core/APIParamsEncode';
import {
  IMPR,
  CLICK,
  CLICK_RATIO,
  COST,
  CPC,
  CONVERT,
  CONVERT_RATIO
} from '../../constants/ConsumptionTableHeader';

async function totalReducer({accessId, user, timeout, data}) {
  try {
    let contentArr = await Promise.all([
      http.get(api.adSlotSummary, {
        accessId,
        user,
        timeout
      }),
      http.get(api.finance, {
        accessId,
        user,
        timeout,
        query: {condition: 'account'}
      }),
      http.get(api.sponsor, {
        accessId,
        user,
        timeout,
        query: {condition: 'extends'}
      }),
      http.get(api.adsDetail, {
        accessId,
        user,
        timeout,
        query: data
      })
    ]);

    let ret = merge(contentArr);
    !ret.detail.chart && ( ret.detail.chart = calcDefaultChartData(data) );

    return {
      content: ret
    };
  } catch (err) {
    return { err };
  }
}

async function detailReducer({accessId, user, timeout, data}) {
  try {
    let content = await http.get(api.adsDetail, {
        accessId,
        user,
        timeout,
        query: data
      });

    let ret = merge([{}, {}, {}, content]);

    !ret.detail.chart && ( ret.detail.chart = calcDefaultChartData(data) );

    return {
      content: ret
    };
  } catch (err) {
    return { err };
  }
}

//////////////////////////////////////
/// http://nb269x.corp.youdao.com:10017/swagger-ui/index.html#/v1/sponsors
/////////////////////////////////////
function merge(contentArr) {
  const {
    stop: pause,
    tobeAudit: pending,
    invalid,
    active: traffickingIn,
    all: total
  } = contentArr[0];

  const {
    balance: accountBalance,
    sponsorTodayConsumption: todayConsumption,
    sponsorLastdayConsumption: yesterdayConsumption
  } = contentArr[1];

  const {
    dailyBudget: totalDailyBudget,
    leftBudgetUpdateTime: remainingEditTimes = 0,
    status: accountStatus
  } = (contentArr[2].completeSponsor || {});

  const {
    totalImpr: show = 0,
    totalClick: click = 0,
    totalClickRate: clickRate = 0,
    totalConsumption: consumption = 0,
    axisMap: chart = null
  } = contentArr[3];

  return {
    summary: {
      accountBalance,
      accountStatus,
      yesterdayConsumption,
      todayConsumption,
      pending,
      traffickingIn,
      pause,
      invalid,
      total
    },
    budget: {
      totalDailyBudget,
      remainingEditTimes
    },
    detail: {
      summary: {
        show,
        click,
        clickRate,
        consumption
      },
      chart: chart && convertDataKeys(chart)
    }
  };
}

const yaxisMap = {
  xDays: 'xDatas',
  imprNum: IMPR,
  clickNum: CLICK,
  clickRate: CLICK_RATIO,
  convertNum: CONVERT,
  convertRate: CONVERT_RATIO,
  costPerClick: CPC,
  consumption: COST
};

function convertDataKeys(data) {
  var ret = {};
  Object.keys(data).map(key => {
    ret[yaxisMap[key]] = data[key];
  });

  return ret;
}

function calcDefaultChartData(param) {
  var dateRange = getDateRangeByDateParams(param);
  var ret = {
    xDatas: dateRange
  };
  Object.values(yaxisMap).forEach(key => {
    ret[key] = dateRange.map( d => 0 );
  });

  return ret;
}

export {
  totalReducer,
  detailReducer
};
