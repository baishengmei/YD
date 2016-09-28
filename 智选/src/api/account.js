import { Router } from 'express';
import http from '../core/HttpDelegate';
import { api } from '../config';
import { getAccountParams } from '../core/APIParamsEncode';
import { totalReducer as accountTotalReducer, detailReducer as accountDetailReducer } from '../apiDelegates/account';

const router = new Router();

// 账户管理
// - 财务
// - dsp配置
router.get('/', async (req, res, next) => {
  try {
    let accessId = req._accessId;
    let query = req.query;
    let type = query.type;
    let url;
    let ret;

    switch (type) {
      case 'finance_all':
      case 'finance_table':
        let reducer = {
          'finance_all': accountTotalReducer,
          'finance_table': accountDetailReducer
        }[type];
        let params = query.params && JSON.parse(query.params) || '';
        let qparams = getAccountParams(params, query.pageSize, query.pageIndex);
        url = `${api['finance']}?${qparams}`;

        ret = await reducer(accessId, url, req.session.user, 10000);

        sendOrErr(ret);
        break;
      case 'dspConfig':
        url = api['configInfo'];
        ret = await http.get(accessId, api['configInfo'], req.session.user);
        res.status(200).send({
          status: 0,
          encryptionKey: ret.encryptionKey,
          qps: ret.qps,
          bidUrl: ret.bidUrl
        });
        break;
      case 'saveDSPConfig':
        url = `${api['configModify']}?qps=${query.qps}`;
        //因为服务器都在内网中，所以不用post，也不会有什么问题
        ret = await http.get(accessId, url, req.session.user);
        res.status(200).send(ret.status == 0 ? { status: 0 } : ret);
        break;
      default:
        res.status(404).send();
    }

  } catch (err) {
    next(err);
  }

  function sendOrErr(ret) {
    if ( ret.err ) {
      next(err);
    } else {
      res.status(200).send(ret.content);
    }
  }
});

export default router;
