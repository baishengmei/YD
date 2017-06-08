export const quickSearchList = [{
  id: 620012,
  name: '6.30-【iOS-201】惠惠助手',
  role: 'adCampaign',
  type: 'landingPage',
  children: [{
    id: 4738160,
    name: '衣服单品图',
    role: 'adGroup',
  }, {
    id: 4737960,
    name: '空调图',
    role: 'adGroup',
  }]
}, {
  id: 620044,
  name: '6.30-【iOS-202】易信信息流',
  role: 'adCampaign',
  type: 'download',
  children: [{
    id: 4738244,
    name: '手机图-信息流',
    role: 'adGroup',
  }, {
    id: 4738198,
    name: '空调图-信息流',
    role: 'adGroup',
  }, {
    id: 4738046,
    name: '秒杀图-信息流',
    role: 'adGroup',
  }]
}, {
  id: 620106,
  name: '6.30-【iOS-203】美柚',
  role: 'adCampaign',
  type: '',
  children: [{
    id: 4738334,
    name: '手机图',
    role: 'adGroup',
  }, {
    id: 4738310,
    name: '衣服单品图',
    role: 'adGroup',
  }]
}];

export const regionList = [{
  name: '北京',
  value: 'beijing',
  children: [{
    name: '海淀区',
    value: 'haidian',
  }, {
    name: '昌平区',
    value: 'changping',
  }],
}, {
  name: '天津',
  value: 'tianjin',
  children: [{
    name: '和平区',
    value: 'heping',
  }, {
    name: '河东',
    value: 'hedong',
  }, {
    name: '南开',
    value: 'nankai',
  }],
}, {
  name: '重庆',
  value: 'chongqing',
  children: [],
}];

export const adCampaignList = {
  total: 3,
  list: [{
    adCampaign: {
      id: 231212,
      name: 'campaign-测试123',
    },
    status: 'pause',
    object: '落地页',
    budget: 1218923.90,
    consumption: 2312.02,
    impressions: 2381,
    clickNum: 23812,
    clickRate: 5.2,
    cpc: 11.5,
    conversion: 112,
    conversionRate: 12.2,
  }, {
    adCampaign: {
      id: 4545412,
      name: 'campaign-测玩家哦发哦俄方哇阿文放假哦问佛我为哦微',
    },
    status: 'open',
    object: 'download',
    budget: 1218923.90,
    consumption: 9912.02,
    impressions: 2381,
    clickNum: 23812,
    clickRate: 5.2,
    cpc: 11.5,
    conversion: 112,
    conversionRate: 12.2,
  }, {
    adCampaign: {
      id: 923821,
      name: 'campaign-测试789',
    },
    status: 'pause',
    object: '',
    budget: 1218923.90,
    consumption: 92378.02,
    impressions: 2381,
    clickNum: 23812,
    clickRate: 5.2,
    cpc: 11.5,
    conversion: 112,
    conversionRate: 12.2,
  }]
};

export const adGroupList = {
  total: 3,
  list: [{
    adGroup: {
      id: 354534,
      name: 'group-测试1234',
    },
    adCampaign: {
      id: 231212,
      name: '测试1234',
    },
    status: 'pause',
    price: {
      type: 'cpc',
      value: 0.30,
    },
    budget: 1218923.90,
    consumption: 23012.02,
    impressions: 2381,
    clickNum: 23812,
    clickRate: 5.2,
    cpc: 11.5,
    conversion: 112,
    conversionRate: 12.2,
  }, {
    adGroup: {
      id: 4545412,
      name: 'group-测玩家哦发哦俄方哇阿文放假哦问佛我为哦微',
    },
    adCampaign: {
      id: 289121,
      name: '测玩家哦发哦俄方哇阿文放假哦问佛我为哦微',
    },
    status: 'open',
    price: {
      type: 'cpc',
      value: 0.50,
    },
    budget: 1218923.90,
    consumption: 23012.02,
    impressions: 2381,
    clickNum: 23812,
    clickRate: 5.2,
    cpc: 11.5,
    conversion: 112,
    conversionRate: 12.2,
  }, {
    adGroup: {
      id: 923821,
      name: 'group-测试789',
    },
    adCampaign: {
      id: 2378137,
      name: '测试789',
    },
    status: 'pause',
    price: {
      type: 'cpc',
      value: 1.80,
    },
    budget: 1218923.90,
    consumption: 23012.02,
    impressions: 2381,
    clickNum: 23812,
    clickRate: 5.2,
    cpc: 11.5,
    conversion: 112,
    conversionRate: 12.2,
  }]
};

export const adContentList = {
  total: 3,
  list: [{
    adContent: {
      id: 231212,
      name: 'content-测试123',
    },
    adGroup: {
      id: 281291,
      name: '测试123',
    },
    adCampaign: {
      id: 32812089,
      name: '测试123',
    },
    status: 'pause',
    consumption: 23012.02,
    impressions: 2381,
    clickNum: 23812,
    clickRate: 5.2,
    cpc: 11.5,
    conversion: 112,
    conversionRate: 12.2,
  }, {
    adContent: {
      id: 4545412,
      name: 'content-测玩家哦发哦俄方哇阿文放假哦问佛我为哦微',
    },
    adGroup: {
      id: 23118892,
      name: '测玩家哦发哦俄方哇阿文放假哦问佛我为哦微',
    },
    adCampaign: {
      id: 78236129,
      name: '测玩家哦发哦俄方哇阿文放假哦问佛我为哦微',
    },
    status: 'open',
    consumption: 23012.02,
    impressions: 2381,
    clickNum: 23812,
    clickRate: 5.2,
    cpc: 11.5,
    conversion: 112,
    conversionRate: 12.2,
  }, {
    adContent: {
      id: 923821,
      name: 'content-测试789',
    },
    adGroup: {
      id: 1738891,
      name: '测试789',
    },
    adCampaign: {
      id: 8937812,
      name: '测试789',
    },
    status: 'pause',
    consumption: 23012.02,
    impressions: 2381,
    clickNum: 23812,
    clickRate: 5.2,
    cpc: 11.5,
    conversion: 112,
    conversionRate: 12.2,
  }]
};
