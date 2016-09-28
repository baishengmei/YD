import {
  REMOVE_NOTIFICATION,
  MARK_NOTIFICATION_READ,
  MARK_NOTIFICATION_READ_SUCCESS,
  MARK_NOTIFICATION_READ_FAIL,
} from '../../constants/ActionTypes'

const initialState = [{
  id: 289392239,
  content: '中秋节有道放假',
  type: 'system',
  time: new Date()
}, {
  id: 289392389,
  content: '您的广告今日消费已达预算上限',
  type: 'account',
  time: new Date()
}, {
  id: 90290121,
  content: '您的推广组 test 未通过审核',
  adGroupId: 1,
  type: 'review',
  time: new Date('2016/07/26')
},{
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

const notification = (state = initialState, action) => {
  const { type, index } = action;

  switch(type) {
    case REMOVE_NOTIFICATION:
      return state.slice(0, index).concat(state.slice(index + 1))
    default:
      return state
  }
}

export default notification
