const MenuTypes = {
  TIME: 'TIME',
  NOTIFICATION: 'NOTIFICATION'
};

const MenuTypeArr = Object.keys(MenuTypes);

/**
 * 用于页面和 node 通信的参数传递
 */
const TimeMenuValuesForFE = {
  today: 'today',
  yesterday: 'yesterday',
  last7: 'last7',
  last14: 'last14',
  last30: 'last30',
  customDateRange: 'custom'
};

const TimeMenuItems = [{
  name: '今天',
  value: TimeMenuValuesForFE.today,
}, {
  name: '昨天',
  value: TimeMenuValuesForFE.yesterday
}, {
  name: '过去7天',
  value: TimeMenuValuesForFE.last7
}, {
  name: '过去14天',
  value: TimeMenuValuesForFE.last14
}, {
  name: '过去30天',
  value: TimeMenuValuesForFE.last30
}, {
  name: '自定义时间',
  value: TimeMenuValuesForFE.customDateRange
}];

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
  TimeMenuValuesForFE,
  TimeMenuItems,
  HelpMenuItems,
  NotificationMenuItems
};
