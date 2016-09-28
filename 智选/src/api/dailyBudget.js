import http from '../core/HttpDelegate';
import { api } from '../config';

export default async (req, res, next) => {
  try {
    let accessId = req._accessId;
    let data = req.body;
    let dailyBudget = data.budget;

    // check validity
    let ret = checkValidity(dailyBudget);

    if ( !ret.valid ) {
      let err = new Error(ret.errmsg);
      err.status = errcode;
      sendOrErr({ err });
      return;
    }

    ret = await http.patch(api.configSponsor, {
      accessId,
      user: req.session.user,
      query: {
        dailyBudget
      }
    });

    sendOrErr({
      content: {
        errcode: 0,
        errmsg: ''
      }
    });

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

  function checkValidity(budget) {
    let ret = {
      valid: true,
      errmsg: ''
    };

    if ( isNaN(budget - 0) || budget < 50 || budget > 1e7 ) {
      ret.errcode = 403;
      ret.errmsg = '预算数值不合法';
    }

    return ret;
  }
};
