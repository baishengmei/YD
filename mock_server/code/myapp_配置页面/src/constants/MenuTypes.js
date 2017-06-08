const MenuTypes = {
  DATERANGE: 'DATERANGE',
  NOTIFICATION: 'NOTIFICATION'
};

const MenuTypeArr = Object.keys(MenuTypes).map(t => MenuTypes[t]);

/**
 * 用于页面和 node 通信的参数传递
 */
const dateRangeValues = {
  今天: 'today',
  昨天: 'yesterday',
  过去7天: 'last7',
  过去30天: 'last30',
};

/**
 * 首页查询日期菜单
 */
const DateRangeItems = [{
  name: '今天',
  range: [0, 0],
}, {
  name: '昨天',
  range: [-1, -1],
}, {
  name: '过去7天',
  range: [-7, -1],
}, {
  name: '过去30天',
  range: [-30, -1],
}].map(item => ({
  ...item,
  key: dateRangeValues[item.name],
  value: dateRangeValues[item.name],
}));

/**
 * 广告层级
 */
const AdHierarchy = {
  sponsor: 'sponsor',
  adCampaign: 'adCampaign',
  adGroup: 'adGroup',
  adContent: 'adContent',
};

/**
 * 推广管理列表页各广告tab的层级关系类型
 */
const AdTabTypes = {
  sponsorAdCampaign: 'sponsorAdCampaign',
  sponsorAdGroup: 'sponsorAdGroup',
  sponsorAdContent: 'sponsorAdContent',
  adCampaignAdGroup: 'adCampaignAdGroup',
  adCampaignAdContent: 'adCampaignAdContent',
  adGroupAdContent: 'adGroupAdContent',
};

/**
 * 推广管理列表页不同层级的 tabs
 */
const AdTabItems = {
  [AdHierarchy.sponsor]: [{
    key: AdTabTypes.sponsorAdCampaign,
    name: '推广系列',
  }, {
    key: AdTabTypes.sponsorAdGroup,
    name: '推广组',
  }, {
    key: AdTabTypes.sponsorAdContent,
    name: '创意',
  }],
  [AdHierarchy.adCampaign]: [{
    key: AdTabTypes.adCampaignAdGroup,
    name: '推广组',
  }, {
    key: AdTabTypes.adCampaignAdContent,
    name: '创意',
  }],
  [AdHierarchy.adGroup]: [{
    key: AdTabTypes.adGroupAdContent,
    name: '创意',
  }],
};

/**
 * 推广管理查询条件中广告状态的前端对照关系
 */
const AdEntityStatusMapListForFE = {
  全部: 'all',
  暂停: 'pause',
  投放中: 'running',
  投放结束: 'stopRunning',
  预算不足: 'outOfBudget',
  余额不足: 'outOfBalance',
  未删除: 'notDeleted',
  已删除: 'deleted',
  待审核: 'toBeAudited',
  审核不通过: 'unpass',
};

/**
 * 推广管理查询条件中广告状态菜单
 *
 * @Reference {Link} https://dev.corp.youdao.com/outfoxwiki/EADDataStatus
 * @Reference {Link} https://note.youdao.com/share/?token=5E6BEA9EAB2E4E43B458BF1C0AD2AA04&gid=44793458#/
 */
const AdCampaignGroupStatusList = [
  '全部',
  '暂停',
  '投放中',
  '投放结束',
  '预算不足',
  '余额不足',
  '未删除',
  '已删除',
].map(key => ({
  name: key,
  value: AdEntityStatusMapListForFE[key],
}));

const AdContentStatusList = [
  '全部',
  '待审核',
  '审核不通过',
  '暂停',
  '投放中',
  '投放结束',
  '预算不足',
  '余额不足',
  '未删除',
  '已删除',
].map(key => ({
  name: key,
  value: AdEntityStatusMapListForFE[key],
}));

/**
 * 推广管理查询条件中广告状态菜单的映射关系
 */
const AdStates = {
  [AdTabTypes.sponsorAdCampaign]: AdCampaignGroupStatusList,
  [AdTabTypes.sponsorAdGroup]: AdCampaignGroupStatusList,
  [AdTabTypes.sponsorAdContent]: AdContentStatusList,
  [AdTabTypes.adCampaignAdGroup]: AdCampaignGroupStatusList,
  [AdTabTypes.adCampaignAdContent]: AdContentStatusList,
  [AdTabTypes.adGroupAdContent]: AdContentStatusList,
};

/**
 * 推广管理查询条件中推广标的菜单在前后端的对应关系
 */
const DeliveryObjectsMapListForFE = {
  不限: 'all',
  落地页: 'landingPage',
  应用下载: 'download',
};

/**
 * 推广管理查询条件中推广标的菜单
 */
const AdDeliveryObjectList = [
  '不限',
  '落地页',
  '应用下载',
].map(key => ({
  name: key,
  value: DeliveryObjectsMapListForFE[key],
}));

/**
 * 推广管理查询条件中批量操作菜单
 */
const AdMultipleOperationItems = [{
  name: '开启',
  value: 'open',
}, {
  name: '暂停',
  value: 'pause',
}, {
  name: '删除',
  value: 'delete',
}];

// antd pagination expect pagesize's type is array of string
// used in admanagement list
const AdPageSizeOptions = ['10', '20', '30', '40', '50'];

/**
 * 新建广告系列中子设置项
 */
const NewAdCampaignSettingItems = [{
  name: '基本设置',
  value: 'basicSetting',
}, {
  name: '时间设置',
  value: 'timeSetting',
}, {
  name: '地域设置',
  value: 'regionSetting',
}];

const NewAdGroupSettingItems = [{
  name: '链接设置',
  value: 'linkSetting',
}, {
  name: '广告位设置',
  value: 'adSlotSetting',
}, {
  name: '预算和出价设置',
  value: 'budgetBidSetting',
}];

const NewAdContentSettingItems = [{
  name: '创意设置',
  value: 'creativitySetting',
}];

const NewAdCampaignItemMapListForFE = {
  不限预算: 'no',
  设置每日预算: 'custom',
  仅移动端: 'mobile',
  仅电脑端: 'pc',
  即时开始: 'today',
  设置开始时间: 'custom',
  无结束时间: 'no',
  设置结束时间: 'custom',
  全时段投放: 'all',
  分时段投放: 'custom',
  不限地域: 'all',
  选择地域: 'custom',
};

const BudgetRange = [100, 1e7];

/**
 * 新建广告系列中的设置项
 */
const NewAdCampaignItems = {
  budget: ['不限预算', '设置每日预算'].map(key => ({
    name: key,
    value: NewAdCampaignItemMapListForFE[key],
  })),
  clientType: ['仅移动端', '仅电脑端'].map(key => ({
    name: key,
    value: NewAdCampaignItemMapListForFE[key],
  })),
  startDate: ['即时开始', '设置开始时间'].map(key => ({
    name: key,
    value: NewAdCampaignItemMapListForFE[key],
  })),
  endDate: ['无结束时间', '设置结束时间'].map(key => ({
    name: key,
    value: NewAdCampaignItemMapListForFE[key],
  })),
  runTimeRange: ['全时段投放', '分时段投放'].map(key => ({
    name: key,
    value: NewAdCampaignItemMapListForFE[key],
  })),
  region: ['不限地域', '选择地域'].map(key => ({
    name: key,
    value: NewAdCampaignItemMapListForFE[key],
  })),
};

const HelpMenuItems = [{
  name: '常见问题',
  value: 'qa'
}, {
  name: '在线教程',
  value: 'example'
}, {
  name: '反馈建议',
  value: 'feedback'
}];

const NotificationMenuItems = [{
  name: '全部消息',
  value: 'all'
}, {
  name: '系统信息',
  value: 'system'
}, {
  name: '账户信息',
  value: ['account', 'review']
}];

export {
  MenuTypes as default,
  MenuTypeArr,
  DateRangeItems,
  AdHierarchy,
  AdTabTypes,
  AdTabItems,
  AdEntityStatusMapListForFE,
  AdCampaignGroupStatusList,
  AdContentStatusList,
  AdStates,
  DeliveryObjectsMapListForFE,
  AdDeliveryObjectList,
  AdMultipleOperationItems,
  AdPageSizeOptions,
  NewAdCampaignSettingItems,
  NewAdGroupSettingItems,
  NewAdContentSettingItems,
  NewAdCampaignItemMapListForFE,
  BudgetRange,
  NewAdCampaignItems,
  HelpMenuItems,
  NotificationMenuItems
};
