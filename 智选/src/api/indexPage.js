import { Router } from 'express';
import { getIndexPageParams, getTimeout, isValidMenuParams } from '../core/APIParamsEncode';
import { totalReducer, detailReducer } from './delegates/indexPage';

const router = new Router();

router.get('*', async (req, res, next) => {
  try {
    let accessId = req._accessId;
    let query = req.query;
    let type = query.type;
    let params = query.menu && JSON.parse(query.menu) || '';
    let qparams = '';
    let ret;

    switch (type) {
      case 'indexPage_all':
      case 'indexPage_detail':
        qparams = getIndexPageParams(params);
        if ( !isValidMenuParams(qparams) ) {
          let err = new Error('查询时间格式不符合要求' + JSON.stringify(qparams))
          err.status = 403;
          sendOrErr({ err });
          return;
        }
        const reducer = {
          'indexPage_all': totalReducer,
          'indexPage_detail': detailReducer
        }[type];

        ret = await reducer({
          accessId,
          user: req.session.user,
          timeout: getTimeout(params),
          data: qparams
        });

        sendOrErr(ret);
        break;
      default:
        res.status(404).send('不存在的服务');
    }

  } catch (err) {
    next(err);
  }

  function sendOrErr(ret) {
    const { err, content } = ret;
    if (err) {
      next(err);
    } else {
      res.status(200).send(content);
    }
  }
});

export default router;
