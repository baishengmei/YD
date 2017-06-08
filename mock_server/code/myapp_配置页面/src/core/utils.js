import {
  AdHierarchy,
  AdTabTypes,
  BudgetRange,
} from '../constants/MenuTypes';

const { sponsor, adCampaign, adGroup, adContent } = AdHierarchy;
const {
  sponsorAdCampaign,
  sponsorAdGroup,
  sponsorAdContent,
  adCampaignAdGroup,
  adCampaignAdContent,
  adGroupAdContent,
} = AdTabTypes;

export function isValidBudget(budget) {
  return !isNaN(budget)
    && budget >= BudgetRange[0]
    && budget <= BudgetRange[1];
}

// similar function as array.filter
export function filterObject(o, filter) {
  const r = {};
  Object.keys(o).forEach((k) => {
    if (filter(o[k], k)) {
      r[k] = o[k];
    }
  });
  return r;
}

export function classnames(...args) {
  const ret = [];
  args.forEach((item) => {
    switch (typeof item) {
      case 'string':
        ret.push(item);
        break;
      case 'object': {
        Object.keys(item).forEach((key) => {
          if (item[key]) {
            ret.push(key);
          }
        });
        break;
      }
      default:
        if (item) {
          ret.push(String(item));
        }
    }
  });
  return ret.join(' ');
}

function NumberFormat(fractionDigits) {
  const that = typeof window === 'undefined' ? global : window;
  const sysFormater = that.Intl && that.Intl.NumberFormat && new that.Intl.NumberFormat('zh-Hans-CN', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  return sysFormater ? sysFormater.format : function format(n) {
    if (typeof n !== 'number' || (typeof n === 'string' && isNaN(parseFloat(n)))) {
      return 'NaN';
    }
    const numberArr = Number(n).toFixed(2).split('');
    for (let i = numberArr.length - 4, cnt = 0; i >= 0; i -= 1) {
      if (++cnt % 3 === 0 // eslint-disable-line no-plusplus
        && i - 1 >= 0
        && numberArr[i - 1] !== '-' // 当前位的前一位不是负号
      ) {
        numberArr.splice(i, 0, ',');
      }
    }
    return numberArr.join('');
  };
}

/**
 * 格式化数字为财务格式，保留2位小数
 *
 * @example
 * formatNumber(23283.892) => 23,283.89
 */
export const formatNumber = NumberFormat(2);

/**
 * 获取制定日期区间[start, end]的日期范围
 * @method getDateRange
 * @param  {Number}     start 开始日期相对今天的天数
 * @param  {Number}     end   结束日期相对今天的天数
 */
export function getDateRange(start, end) {
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(startDate.getDate() + start);
  endDate.setDate(endDate.getDate() + end);
  return `${startDate.yyyymmdd('-')},${endDate.yyyymmdd('-')}`;
}

export function updateComponentStateByKeys(keys) {
  return function updateComponentStateByProps(nextProps) {
    const nextState = {};
    keys.forEach((key) => {
      nextState[key] = nextProps[key];
    });
    this.setState(nextState);
  };
}

export function componentUpdateByState(nextProps, nextState) {
  const s = this.state;
  return Object.keys(s).some(key => s[key] !== nextState[key]);
}

/**
 * ad hierarchy ( ad level ) 与  ad tabtype 的转化
 */
export const getAdLevelFromAdTabType = (type) => {
  switch (type) {
    case sponsorAdCampaign:
      return adCampaign;
    case sponsorAdGroup:
    case adCampaignAdGroup:
      return adGroup;
    case sponsorAdContent:
    case adCampaignAdContent:
    case adGroupAdContent:
      return adContent;
    default:
      throw new Error(`无效的 AdTabTypes:${type}`);
  }
};

export const getAdParentLevelFromAdTabType = (type) => {
  switch (type) {
    case sponsorAdCampaign:
    case sponsorAdGroup:
    case sponsorAdContent:
      return sponsor;
    case adCampaignAdGroup:
    case adCampaignAdContent:
      return adCampaign;
    case adGroupAdContent:
      return adGroup;
    default:
      throw new Error(`无效的 AdTabTypes 参数: ${type}`);
  }
};

const getAdTabTypeFromAdLevel = (parent, level) => {
  switch (parent) {
    case sponsor:
      if (level === adCampaign) {
        return sponsorAdCampaign;
      } else if (level === adGroup) {
        return sponsorAdGroup;
      } else if (level === adContent) {
        return sponsorAdContent;
      }
      break;
    case adCampaign:
      if (level === adGroup) {
        return adCampaignAdGroup;
      } else if (level === adContent) {
        return adCampaignAdContent;
      }
      break;
    case adGroup:
      if (level === adContent) {
        return adGroupAdContent;
      }
      break;
    default:
  }
  throw new Error(`无效的 AdHierarchy 参数: ${parent} and ${level}`);
};

export const getSponsorTabTypeFromAdLevel = level => getAdTabTypeFromAdLevel(sponsor, level);
export const getAdCampaignTabTypeFromAdLevel = level => getAdTabTypeFromAdLevel(adCampaign, level);
export const getAdGroupTabTypeFromAdLevel = level => getAdTabTypeFromAdLevel(adGroup, level);

/**
 * 根据参数获取路径数组，主要为推广管理列表页面包屑服务
 */
export const getAdListPathArr = (adLevel, adCampaignId, adGroupId) => {
  const pathArr = [{
    id: sponsor,
    path: `/adManagement/${adCampaign}`,
  }];

  // "所有广告内容"一级
  if (adLevel === sponsor) {
    return pathArr;
  }

  pathArr.push({
    id: adCampaignId,
    path: `/adManagement/${adCampaign}/${adCampaignId}/${adGroup}`,
  });

  if (adLevel === adCampaign) {
    return pathArr;
  }

  pathArr.push({
    id: adGroupId,
    path: `${pathArr[1].path}/${adGroupId}/${adContent}`
  });

  if (adLevel === adGroup) {
    return pathArr;
  }

  throw new Error(`无效的 adLevel: ${adLevel}`);
};

// ---- 目前被 getAdListPathArr 取代，暂留
const reAll = new RegExp(`^/adManagement/(${adCampaign}|${adGroup}|${adContent})/?$`);
const reCampaign = new RegExp(`^/adManagement/${adCampaign}/[^/]+/(${adGroup}|${adContent})/?$`);
const reCampaignId = new RegExp(`^/adManagement/${adCampaign}/([^/]+)`);
const reGroupId = new RegExp(`^/adManagement/${adCampaign}/[^/]+/adGroup/([^/]+)`);

export function getAdListPathArr2(path) {
  const pathArr = [{
    id: sponsor,
    path: `/adManagement/${adCampaign}`,
  }];

  // "所有广告内容"一级
  if (reAll.test(path)) {
    return pathArr;
  }

  // 推广系列一级
  let match = path.match(reCampaignId);

  pathArr.push({
    id: match[1],
    path: `/adManagement/${adCampaign}/${match[1]}/${adGroup}`,
  });

  if (reCampaign.test(path)) {
    return pathArr;
  }

  // 推广组一级
  match = path.match(reGroupId);
  pathArr.push({
    id: match[1],
    path: `${pathArr[1].path}/${match[1]}/${adContent}`
  });

  return pathArr;
}
