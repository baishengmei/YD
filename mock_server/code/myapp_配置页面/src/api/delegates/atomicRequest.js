import { api } from '../../config';
import http from '../../core/HttpServer';

export const getFinance = (accessId, user, timeout) => http.get(api.finance, {
  accessId,
  user,
  timeout,
  query: {
    condition: 'account'
  }
});

export const updateSponsorBudget = (accessId, user, timeout, dailyBudget) =>
http.patch(api.sponsorBudget, {
  accessId,
  user,
  timeout,
  query: {
    dailyBudget
  }
});

export const updateAdCampaignBudget = (accessId, user, timeout, data) =>
http.patch(api.adCampaignBudget, {
  accessId,
  user,
  timeout,
  query: {
    adCampaignId: data.adCampaignId,
    dailyBudget: data.dailyBudget,
  }
});

export const updateAdGroupBudget = (accessId, user, timeout, data) =>
http.patch(api.adGroupBudget, {
  accessId,
  user,
  timeout,
  query: {
    adGroupId: data.adGroupId,
    dailyBudget: data.dailyBudget,
  }
});

export const updateAdCampaignName = (accessId, user, timeout, data) =>
http.patch(api.adCampaignInfo, {
  accessId,
  user,
  timeout,
  query: {
    adCampaignId: data.adCampaignId,
    name: data.name,
  }
});

export const updateAdGroupName = (accessId, user, timeout, data) =>
http.patch(api.adGroupInfo, {
  accessId,
  user,
  timeout,
  query: {
    adGroupId: data.adGroupId,
    name: data.name,
  }
});

export const updateAdContentName = (accessId, user, timeout, data) =>
http.patch(api.adContentInfo, {
  accessId,
  user,
  timeout,
  query: {
    adContentId: data.adContentId,
    name: data.name,
  }
});

export const getSponsorInfo = (accessId, user, timeout) => http.get(api.sponsorInfo, {
  accessId,
  user,
  timeout,
  query: {
    condition: 'extends'
  }
});

export const getAdGroupCount = (accessId, user, timeout) => http.get(api.adGroupCount, {
  accessId,
  user,
  timeout,
  query: {
    condition: 'outOfBudget'
  }
});

export const getAdContentCount = (accessId, user, timeout) => http.get(api.adContentCount, {
  accessId,
  user,
  timeout,
  query: {
    condition: 'tobeAudit,invalid'
  }
});

export const getAdStats = (accessId, user, timeout, data) => http.get(api.adStats, {
  accessId,
  user,
  timeout,
  query: {
    timePeroidType: 'range',
    beginDateField: data.dateRange[0],
    endDateField: data.dateRange[1],
  }
});

// for quickSearch
export const getCampaignGroupSimpleList = (accessId, user, timeout, data) =>
http.get(api.campaignGroupSimpleList, {
  accessId,
  user,
  timeout,
  query: {
    keyword: data.keyword
  }
});

export const getAdContentListBase = (accessId, user, timeout, data) =>
http.get(api.adContentListBase, {
  accessId,
  user,
  timeout,
  query: {
    adCampaignId: data.adCampaignId,
    adGroupId: data.adGroupId,
    landingType: data.object,
    status: data.status,
    keyword: data.keyword,
    pageCapacity: data.pageSize,
    pageNo: data.pageNo,
  }
});

export const getAdContentListStat = (accessId, user, timeout, data) =>
http.get(api.adContentListStat, {
  accessId,
  user,
  timeout,
  query: {
    adContentIds: data.adContentIds,
    timePeroidType: 'range',
    beginDateField: data.startDate,
    endDateField: data.endDate,
  }
});

export const getAdGroupListBase = (accessId, user, timeout, data) =>
http.get(api.adGroupListBase, {
  accessId,
  user,
  timeout,
  query: {
    adCampaignId: data.adCampaignId,
    landingType: data.object,
    status: data.status,
    keyword: data.keyword,
    pageCapacity: data.pageSize,
    pageNo: data.pageNo,
  }
});

export const getAdGroupListStat = (accessId, user, timeout, data) =>
http.get(api.adGroupListStat, {
  accessId,
  user,
  timeout,
  query: {
    adGroupIds: data.adGroupIds,
    timePeroidType: 'range',
    beginDateField: data.startDate,
    endDateField: data.endDate,
  }
});

export const getAdCampaignListBase = (accessId, user, timeout, data) =>
http.get(api.adCampaignListBase, {
  accessId,
  user,
  timeout,
  query: {
    landingType: data.object,
    status: data.status,
    keyword: data.keyword,
    pageCapacity: data.pageSize,
    pageNo: data.pageNo,
  }
});

export const getAdCampaignListStat = (accessId, user, timeout, data) =>
http.get(api.adCampaignListStat, {
  accessId,
  user,
  timeout,
  query: {
    adCampaignIds: data.adCampaignIds,
    timePeroidType: 'range',
    beginDateField: data.startDate,
    endDateField: data.endDate,
  }
});
