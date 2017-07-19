import { sendOrErr } from './helper';

export async function read(req, res, next) {
  try {
    const accessId = req._accessId; // eslint-disable-line
    const ret = {
      content: [{
        id: 289392239,
        content: '中秋节有道放假',
        type: 'system',
        time: new Date('2016/11/2')
      }, {
        id: 289392389,
        content: '您的广告今日消费已达预算上限',
        type: 'account',
        time: new Date('2016/10/23')
      }, {
        id: 90290121,
        content: '您的推广组 test 未通过审核',
        adGroupId: 1,
        type: 'review',
        time: new Date('2016/07/26')
      }, {
        id: 90290124,
        content: '您的创意 好好学英语 未通过审核',
        adContentId: 1,
        type: 'review',
        time: new Date('2016/07/26')
      }, {
        id: 239802,
        content: '您申请的发票已寄出，发的是【中通快递】，快递单号【ZT12345678】，请您近期注意查收。',
        type: 'account',
        time: new Date('2016/06/30')
      }]
    };

    sendOrErr(ret);
  } catch (err) {
    next(err);
  }
}

export async function mark(req, res, next) {
  try {
    const accessId = req._accessId; // eslint-disable-line
    const data = req.body;
    const notificationId = data.notificationId; // eslint-disable-line

    sendOrErr({
      content: {
        errcode: 0,
        errmsg: ''
      }
    });
  } catch (err) {
    next(err);
  }
}
