import {
  AdHierarchy,
} from '../../constants/MenuTypes';
import {
  getFinance,
  updateSponsorBudget,
  updateAdCampaignBudget,
  updateAdGroupBudget,
  updateAdCampaignName,
  updateAdGroupName,
  updateAdContentName,
  getSponsorInfo,
  getCampaignGroupSimpleList,
  getAdCampaignListBase,
  getAdCampaignListStat,
  getAdGroupListBase,
  getAdGroupListStat,
  getAdContentListBase,
  getAdContentListStat,
} from './atomicRequest';
import {
  getStatusForFE,
  getStatusForBE,
  getObjectForFE,
  getObjectForBE,
} from '../translateParams';
import { quickSearchList, regionList, adCampaignList, adGroupList, adContentList } from '../mock';

// for 列表页
export async function financeBudgetReducer({ accessId, user, timeout }) {
  const contentArr = await Promise.all([
    getFinance(accessId, user, timeout)
    .then(data => ({
      balance: data.balance,
      todayConsumption: data.sponsorTodayConsumption,
    })),
    getSponsorInfo(accessId, user, timeout)
    .then(({ completeSponsor }) => ({
      dailyBudget: completeSponsor.dailyBudget === null ? 1e7 : completeSponsor.dailyBudget - 0,
      remainingBudgetSettingTimes: completeSponsor.leftBudgetUpdateTime,
    }))
  ]);

  return {
    ...contentArr[0],
    ...contentArr[1],
  };
}

export async function updateSponsorBudgetReducer({ accessId, user, timeout, dailyBudget }) {
  await updateSponsorBudget(accessId, user, timeout, dailyBudget);
}

export async function updateAdEntityNameReducer({ accessId, user, timeout, type, data }) {
  const fn = type === AdHierarchy.adCampaign // eslint-disable-line no-nested-ternary
    ? updateAdCampaignName
    : type === AdHierarchy.adGroup
      ? updateAdGroupName
      : updateAdContentName;
  await fn(accessId, user, timeout, data);
}

export async function quickSearchListReducer({ accessId, user, timeout, data }) {
  const content = await getCampaignGroupSimpleList(accessId, user, timeout, data)
    .then(({ campaigns }) => campaigns);
  return content.map(c => ({
    id: c.campaignId,
    name: c.campaignName,
    role: 'adCampaign',
    type: getObjectForFE(c.landingType) || c.landingType,
    children: c.groups.map(g => ({
      id: g.groupId,
      name: g.groupName,
      role: 'adGroup',
    }))
  }));
}

export async function queryAdCampaignListReducer({ accessId, user, timeout, data }) {
  data.status = getStatusForBE(data.status); // eslint-disable-line no-param-reassign
  data.object = getObjectForBE(data.object); // eslint-disable-line no-param-reassign
  const base = await getAdCampaignListBase(accessId, user, timeout, data);
  const { adCampaignId } = base;
  const ret = {
    total: 0,
    list: [],
  };
  if (adCampaignId.length > 0) {
    const stat = await getAdCampaignListStat(accessId, user, timeout, {
      ...data,
      adCampaignIds: adCampaignId.join(',')
    });
    ret.total = base.total;
    ret.list = adCampaignId.map((id, index) => {
      const status = getStatusForFE(base.status[index]) || base.status[index];
      const object = getObjectForFE(base.landingType[index]) || base.landingType[index];
      return {
        switch: base.switch[index],
        adCampaign: {
          id: base.adCampaignId[index],
          name: base.adCampaignName[index],
        },
        status,
        object,
        budget: base.budget[index],
        consumption: stat.consumption[index] || 0,
        impressions: stat.imprNum[index] || 0,
        clickNum: stat.clickNum[index] || 0,
        clickRate: stat.clickRate[index] || 0,
        cpc: stat.costPerClick[index] || 0,
        conversion: stat.convertNum[index] || 0,
        conversionRate: stat.convertRate[index] || 0,
      };
    });
    return ret;
  }
  return ret;
}

export async function queryAdGroupListReducer({ accessId, user, timeout, data }) {
  data.status = getStatusForBE(data.status); // eslint-disable-line no-param-reassign
  data.object = getObjectForBE(data.object); // eslint-disable-line no-param-reassign
  const base = await getAdGroupListBase(accessId, user, timeout, data);
  const { adGroupId } = base;
  const ret = {
    total: 0,
    list: [],
  };

  if (adGroupId.length > 0) {
    const stat = await getAdGroupListStat(accessId, user, timeout, {
      ...data,
      adGroupIds: adGroupId.join(',')
    });
    ret.total = base.total;
    ret.list = adGroupId.map((id, index) => {
      const status = getStatusForFE(base.status[index]) || base.status[index];
      return {
        switch: base.switch[index],
        adGroup: {
          id: base.adGroupId[index],
          name: base.adGroupName[index],
        },
        adCampaign: {
          id: base.adCampaignId[index],
          name: base.adCampaignName[index],
        },
        status,
        price: {
          type: 'CPC',
          value: base.price[index],
        },
        budget: base.budget[index],
        consumption: stat.consumption[index] || 0,
        impressions: stat.imprNum[index] || 0,
        clickNum: stat.clickNum[index] || 0,
        clickRate: stat.clickRate[index] || 0,
        cpc: stat.costPerClick[index] || 0,
        conversion: stat.convertNum[index] || 0,
        conversionRate: stat.convertRate[index] || 0,
      };
    });
    return ret;
  }
  return ret;
}

export async function queryAdContentListReducer({ accessId, user, timeout, data }) {
  data.status = getStatusForBE(data.status); // eslint-disable-line no-param-reassign
  data.object = getObjectForBE(data.object); // eslint-disable-line no-param-reassign
  const base = await getAdContentListBase(accessId, user, timeout, data);
  const { adContentId } = base;
  const ret = {
    total: 0,
    list: [],
  };

  if (adContentId.length > 0) {
    const stat = await getAdContentListStat(accessId, user, timeout, {
      ...data,
      adContentIds: adContentId.join(',')
    });
    ret.total = base.total;
    ret.list = adContentId.map((id, index) => {
      const status = getStatusForFE(base.status[index]) || base.status[index];
      return {
        switch: base.switch[index],
        adContent: {
          id,
          name: base.adContentName[index],
        },
        adGroup: {
          id: base.adGroupId[index],
          name: base.adGroupName[index],
        },
        adCampaign: {
          id: base.adCampaignId[index],
          name: base.adCampaignName[index],
        },
        status,
        consumption: stat.consumption[index] || 0,
        impressions: stat.imprNum[index] || 0,
        clickNum: stat.clickNum[index] || 0,
        clickRate: stat.clickRate[index] || 0,
        cpc: stat.costPerClick[index] || 0,
        conversion: stat.convertNum[index] || 0,
        conversionRate: stat.convertRate[index] || 0,
      };
    });
    return ret;
  }
  return ret;
}

// for 新建页面
export async function regionListReducer({ accessId, user, timeout, data }) {
  return regionList;
}

export async function newAdCampaignReducer({ accessId, user, timeout, data }) {
  return 1;
}
