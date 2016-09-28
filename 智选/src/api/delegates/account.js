import http from '../core/HttpDelegate';

async function totalReducer(accessId, baseUrl, user, timeout) {
  try {
    let sign = baseUrl.indexOf('?') !== -1 ? '&' : '?';
    let contentArr = await Promise.all([
      http.get(accessId, `${baseUrl}${sign}opType=0`, user, timeout),
      http.get(accessId, `${baseUrl}${sign}opType=1`, user, timeout),
      http.get(accessId, `${baseUrl}${sign}opType=2`, user, timeout),
      http.get(accessId, `${baseUrl}${sign}opType=3`, user, timeout)
    ]);
    console.log('total', contentArr)

    return {
      content: merge(contentArr)
    };
  } catch (err) {
    return { err };
  }
}

async function detailReducer(accessId, baseUrl, user, timeout) {
  try {
    let sign = baseUrl.indexOf('?') !== -1 ? '&' : '?';
    let content = await http.get(accessId,`${baseUrl}${sign}opType=3`, user, timeout);

    return {
      content: {
        table: merge([ {}, {}, {} ,content ]).table
      }
    };
  } catch (err) {
    return { err };
  }
}

//////////////////////////////////////
/// opType 参考文档：
/// http://note.youdao.com/share/?id=2da01e1adf6eb917701dcb8267fbf813&type=note#/
///
/// 财务信息 opType 含义说明：
/// 0 - 本月消费
/// 1 - 本月充值
/// 2 - 账户余额
/// 3 - table 数据(入资与消费)
///
/// 注：table 总条数和 detail 信息一起返回，
/// 是因为detail中的消费和充值是读取两个数据源；
/// 要获取分页数据，首先先要merge，获取到数据总数，
/// 然后再分页，所以总数的获取不用单开一个接口
/////////////////////////////////////
function merge(contentArr) {
  return {
    summary: {
      curMonthConsumes: contentArr[0].curMonthConsumes,
      curMonthRecharges: contentArr[1].curMonthRecharges,
      balance: contentArr[2].accountBalances
    },
    table: {
      data: contentArr[3].accountFinance,
      total: contentArr[3].total
    }
  };
}

export { totalReducer, detailReducer };
