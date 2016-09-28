var pro = 'production';
var dev = 'development';
var env = process.env.NODE_ENV || pro;


// 参数说明：
// nodeHost:
//   本机作为公网服务的域(hostname + port)
//   如果端口是80，则不写
//   如果端口不是80，需要写全
//
// nodePort:
//   node 服务的启动端口
//
// javaHost:
//   规则同 nodeHost
//
var environment = {
  [dev]: {
    nodeHost: 'zx.youdao.com:3000',
    nodePort: 5000,
    javaHost: 'qt106x.corp.youdao.com:19500' // 'nb269x.corp.youdao.com:10017'
  },
  [pro]: {
    nodeHost: 'zx.youdao.com:5000',
    nodePort: 5000,
    javaHost: 'nb269x.corp.youdao.com:10017'
  }
}[env];

var javaServer = 'http://' + environment.javaHost;

var apiServer = javaServer + '/v1';

exports.api = {
  // 财务信息
  finance: apiServer + '/sponsors/{sponsorId}/finance',
  // 首页广告整体详细数据
  adsDetail: apiServer + '/sponsors/{sponsorId}/stats',
  // 广告位 summary 信息，如有效广告数，未审核广告数
  adSlotSummary: apiServer + '/sponsors/{sponsorId}/ads-summary',
  // sponsor 信息
  sponsor: apiServer + '/sponsors/{sponsorId}',
  // 修改 sponsor 的配置信息，如每日预算
  configSponsor: apiServer + '/sponsors/{sponsorId}/config'
};

exports.nodeHost = environment.nodeHost;
exports.nodePort = environment.nodePort;

if ( env === dev ) {
  exports.testUser = {
    email: 'test@163.com',
    sponsorId: 1
  };
}