const pro = 'production';
const dev = 'development';
const test = 'test';
const env = process.env.NODE_ENV || pro;

// 智选未登录首页地址
const indexPage = 'http://zhixuan.yoouuddaaoo.com';

/**
 * 参数说明：
 * nodeHost:
 *   本机作为公网服务的域(hostname + port)
 *   如果端口是80，则不写
 *   如果端口不是80，需要写全
 *
 * nodePort:
 *   node 服务的启动端口
 *
 * javaHost:
 *   规则同 nodeHost
 */
const environment = {
  [test]: {
    nodeHost: 'zx.yoouuddaaoo.com:3000',
    nodePort: 5000,
    javaHost: 'nb080x.corp.yoouuddaaoo.com:10017'
  },
  [dev]: {
    nodeHost: 'zx.yoouuddaaoo.com:3000',
    nodePort: 5000,
    javaHost: 'nb080x.corp.yoouuddaaoo.com:10017'
  },
  [pro]: {
    nodeHost: 'zx.yoouuddaaoo.com:5000',
    nodePort: 5000,
    javaHost: 'nb269x.corp.yoouuddaaoo.com:10017'
  }
}[env];

const javaServer = `http://${environment.javaHost}`;
const apiVersion = 'v1.0.0';
const apiServer = `${javaServer}/${apiVersion}`;

exports.indexPage = indexPage;
exports.nodeHost = environment.nodeHost;
exports.nodePort = environment.nodePort;
exports.api = {
  /**
   * 账户财务信息，账户消费、余额等
   * @method GET
   * @param {Long} sponsorId 账户 ID
   * @param {String} condition 单选(account,abstract,invoices),abstract为摘要信息
   */
  finance: `${apiServer}/sponsors/{sponsorId}/finance`,
  /**
   * 更改 sponsor 每日预算
   * @method PATCH
   * @param {Number} dailyBudget
   */
  sponsorBudget: `${apiServer}/sponsors/{sponsorId}/config`,
  /**
   * 获取 sponsor 信息
   * @method GET
   * @param {String} condition 单选(extends,info),extends包含账户状态和预算值，info为全部注册信息
   */
  sponsorInfo: `${apiServer}/sponsors/{sponsorId}`,
  /**
   * 推广管理中获取推广系列、组包含关系的数据（左侧搜索部分）
   * @method GET
   * @param {Long} sponsorId 账户 ID
   * @param {String} keyword 搜索关键字
   */
  campaignGroupSimpleList: `${apiServer}/sponsors/{sponsorId}/adsummary`,
  /**
   * 修改 sponsor 的配置信息，如每日预算
   * @method PATCH
   * @param {String} dailyBudget 非负数
   */
  configSponsor: `${apiServer}/sponsors/{sponsorId}/config`,
  /**
   * 广告变体统计信息，如待审核数、未通过数
   * @method GET
   * @param {String} condition 取值为 active,tobeAudit,invalid,stop，可多选
   */
  adContentCount: `${apiServer}/adContent/count`,
  /**
   * 推广管理中根据查询条件获取创意列表的基础内容
   * @method GET
   * @param {Long} adCampaignId
   * @param {Long} adGroupId
   * @param {String} landingType 取值 all,download,webpage，单选
   * @param {String} status 取值 all,stop,active,delete,undelete,outOfBudget,
   * outOfBalance,upToEnddate,tobeAudit,invalid，单选
   * @param {String} keyword 关键字
   * @param {Number} pageCapacity 每页条数
   * @param {Number} pageNo 页数，从 1 开始
   */
  adContentListBase: `${apiServer}/adContent/abstract`,
  /**
   * 推广管理中根据查询条件获取创意列表的统计数据
   * @method GET
   * @param {String} adContentIds 输入多个变体id，用英文逗号隔开
   * @param {String} timePeroidType 取值 range,simpleTimePeriod，单选
   * @param {String} simpleTimePeriod 取值 today,yesterday,last7days, last14days,last30days，单选
   * @param {Number} beginDateField yyyy-MM-dd
   * @param {Number} endDateField yyyy-MM-dd
   */
  adContentListStat: `${apiServer}/adContent/stat`,
  /**
   * 广告组统计信息，如预算不足的个数
   * @method GET
   * @param {String} condition 取值为 outOfBudget，可多选
   */
  adGroupCount: `${apiServer}/adGroup/count`,
  /**
   * 推广管理中根据查询条件获取推广组列表的基础内容
   * @method GET
   * @param {Long} adCampaignId
   * @param {String} landingType 取值 all,download,webpage，单选
   * @param {String} status 取值 all,stop,active,delete,undelete,outOfBudget,
   * outOfBalance,upToEnddate，单选
   * @param {String} keyword 关键字
   * @param {Number} pageCapacity 每页条数
   * @param {Number} pageNo 页数，从 1 开始
   */
  adGroupListBase: `${apiServer}/adGroup/abstract`,
  /**
   * 推广管理中根据查询条件获取推广组列表的统计数据
   * @method GET
   * @param {String} adGroupIds 输入多个变体id，用英文逗号隔开
   * @param {String} timePeroidType 取值 range,simpleTimePeriod，单选
   * @param {String} simpleTimePeriod 取值 today,yesterday,last7days, last14days,last30days，单选
   * @param {Number} beginDateField yyyy-MM-dd
   * @param {Number} endDateField yyyy-MM-dd
   */
  adGroupListStat: `${apiServer}/adGroup/stat`,
  /**
   * 推广管理中根据查询条件获取推广系列列表的基础内容
   * @method GET
   * @param {String} landingType 取值 all,download,webpage，单选
   * @param {String} status 取值 all,stop,active,delete,undelete,outOfBudget,
   * outOfBalance,upToEnddate，单选
   * @param {String} keyword 关键字
   * @param {Number} pageCapacity 每页条数
   * @param {Number} pageNo 页数，从 1 开始
   */
  adCampaignListBase: `${apiServer}/adCampaigns/abstract`,
  /**
   * 推广管理中根据查询条件获取推广系列列表的统计数据
   * @method GET
   * @param {String} adCampaignIds 输入多个变体id，用英文逗号隔开
   * @param {String} timePeroidType 取值 range,simpleTimePeriod，单选
   * @param {String} simpleTimePeriod 取值 today,yesterday,last7days, last14days,last30days，单选
   * @param {Number} beginDateField yyyy-MM-dd
   * @param {Number} endDateField yyyy-MM-dd
   */
  adCampaignListStat: `${apiServer}/adCampaigns/stat`,
  /**
   * 获取广告的整体数据
   * @method GET
   * @param {String} timePeroidType 单选range,simpleTimePeriod, range需要填开始或结束时间
   * @param {String} simpleTimePeriod 单选today,yesterday,last7days, last14days,last30days等
   * @param {String} beginDateField 开始日期，yyyy-MM-dd
   * @param {String} endDateField 结束日期，yyyy-MM-dd
   * @param {String} pageSize 每页容量，当查询天数过多时最好指定，否则默认会全部查出
   * @param {String} pageNo 第几页，默认为1
   *
   */
  adStats: `${apiServer}/sponsors/{sponsorId}/stats`,
};

if (env !== pro) {
  exports.testUser = {
    email: 'test@163.com',
    sponsorId: 1//285842
  };
}
