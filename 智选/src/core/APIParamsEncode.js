import { TimeMenuValuesForFE } from '../constants/MenuTypes';

//向 java 发送的 menu 与 node给web用的有些不同，
//发送数据前，需要进行转化
export {
  getIndexPageParams,
  menuToStr,
  getDateRangeByDateParams,
  isValidMenuParams,
  getTimeout,
  isToday,
  isOneDay
};

// 根据menus请求参数获取超时时间
function getTimeout(menus) {
  return 5000;
}

function getDateString(d) {
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

/////////////////////////////
// 现有需求，只有时间选择今天，          //
// 或者选择日期控件，起始时间为今天的       //
// 这两种情况下，会去查询实时库          //
// 即查询时间就是今天的会去查询实时库       //
// 时间包含今天的或者不包含今天的，都不查询实时库 //
/////////////////////////////

// 判断时间 menu 选择是否为"今天"
function isToday(menus) {
  try {
    let menu = menus.length > 0 && menus.filter( o => o.type === 'TIME' )[0];
    if ( menu && menu.value === 'today' ) return true;
    if ( menu && menu.value === 'custom') {
      let { start } = menu.dateRange;
      let today = getDateString(new Date);
      return today == start;
    }
    return false;
  } catch (e) {
    return false;
  }
}

// 判断时间 menu 选择的是否是一天
function isOneDay(menus) {
  try {
    let menu = menus.length > 0 && menus.filter( o => o.type === 'TIME' )[0];
    if ( menu && menu.value === 'today' ) return true;
    if ( menu && menu.value === 'custom') {
      let { start, end } = menu.dateRange;
      return end == start;
    }
    return false;
  } catch (e) {
    return false;
  }
}

function getIndexPageParams(menu) {
  return menuToStr(menu);
}


/********* 各接口参数说明 **************

1. consumeReportNew.s
dcType  0 ：全部 1 ：web流量 2：Mobile流量
dcTimeType  0：今天 1：昨天 2：过去7天 3：过去30天  4：日期控件
dcIdType  0：分app分广告位 1：分网站/APP 2：分广告位 3：分cid（分广告系列） 4：分crid（分变体）
op  op = “download” 表示下载
pageSize  每页显示多少
pageIndex 第几页
startDay  开始时间（时间控件）
endDay  结束时间（时间控件）


2.其他接口类似

**************************************/

const simpleTimePeriodMap = {
  [TimeMenuValuesForFE.today]: 'today',
  [TimeMenuValuesForFE.yesterday]: 'yesterday',
  [TimeMenuValuesForFE.last7]: 'last7days',
  [TimeMenuValuesForFE.last14]: 'last14days',
  [TimeMenuValuesForFE.last30]: 'last30days'
};

const simpleTimePeriodArr = Object.keys(simpleTimePeriodMap);

function menuToStr(menu) {
  let params = {};
  const { type, value, dateRange } = menu;
  const { start, end } = dateRange || {};
  switch(type) {
    case 'TIME':
      let isSimple = simpleTimePeriodArr.includes(value);
      params['timePeroidType'] = isSimple ?
          'simpleTimePeriod' :
          value === TimeMenuValuesForFE.customDateRange && start && end ? 'range' : '';
      if ( isSimple ) {
        params['simpleTimePeriod'] = simpleTimePeriodMap[value];
      } else if ( start && end ) {
        params['beginDateField'] = dateFormat(start);
        params['endDateField'] = dateFormat(end);
      }
      break;
    default:
  }

  return params;
}

function isValidMenuParams(params) {
  let timeType = params['timePeroidType'];
  return 'simpleTimePeriod' === timeType
    || ( 'range' === timeType && 'beginDateField' in params && 'endDateField' in params);
}

function getDateRangeByDateParams(param) {
  const {
    timePeroidType,
    simpleTimePeriod
  } = param;
  let start, end;

  if ( timePeroidType === 'range' ) {
    start = new Date(param.beginDateField);
    end = new Date(param.endDateField);
  } else {
    switch(simpleTimePeriod) {
      case 'today':
        start = new Date();
        end = new Date();
        break;
      case 'yesterday':
        start = new Date();
        start.setDate(start.getDate() - 1);
        end = new Date(start);
        break;
      case 'last7days':
        start = new Date();
        start.setDate(start.getDate() - 7);
        end = new Date();
        end.setDate(end.getDate() - 1);
        break;
      case 'last14days':
        start = new Date();
        start.setDate(start.getDate() - 14);
        end = new Date();
        end.setDate(end.getDate() - 1);
        break;
      case 'last30days':
        start = new Date();
        start.setDate(start.getDate() - 30);
        end = new Date();
        end.setDate(end.getDate() - 1);
        break;
      default:
        throw new Error('位置时间参数: ' + simpleTimePeriod);
    }
  }

  return calcDateRange(start, end);

  function calcDateRange(start, end) {
    if ( start.getTime() === end.getTime() ) {
      return ' '.repeat(24).split('').map((_, index) => index);
    }
    let dateRange = [];
    for(let d = start; d <= end;) {
      dateRange.push(d.toISOString().substr(0, 10));
      d.setDate(d.getDate() + 1);
    }
    return dateRange;
  }
}

function dateFormat(date) {
  let d = date.split('/');
  return [d[0], zeroPad(d[1]), zeroPad(d[2])].join('-');

  function zeroPad(d) {
    return d > 9 ? d : ('0' + d);
  }
}
