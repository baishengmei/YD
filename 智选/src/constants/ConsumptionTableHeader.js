/* is used for store and api/download ( csv title ) */

export const IMPR = 'impr';
export const CLICK = 'click';
export const CLICK_RATIO = 'clickRatio';
export const COST = 'cost';
export const CPC = 'cpc';
export const CONVERT = 'convert';
export const CONVERT_RATIO = 'convertRatio';
export const ECPM = 'ECPM';

const tableHeaderColsMap = {
  'day': {
    content: '时间',
  },
  'hour': {
    content: '时间'
  },
  'dcId': {
    content: '媒体ID'
  },
  'dcName': {
    content: '媒体'
  },
  'slotSize': {
    content: '尺寸'
  },
  'cid': {
    content: '广告系列'
  },
  'crid': {
    content: '广告变体'
  },
  [IMPR]: {
    content: '展示数'
  },
  [CLICK]: {
    content: '点击数'
  },
  [CLICK_RATIO]: {
    content: '点击率'
  },
  [CPC]: {
    content: '点击单价'
  },
  [CONVERT]: {
    content: '转化'
  },
  [CONVERT_RATIO]: {
    content: '转化率'
  },
  [COST]: {
    content: '消费'
  },
  [ECPM]: {
    content: 'ECPM'
  },
  'operation': {
    content: '操作'
  }
};


/**
 * 点击消费报表 table header 定义
 * all: 不分类 header
 * app: 分网站/分app
 * size: 分尺寸/分广告位
 * hour: app或者size的按小时显示的header
 * day: app或者size的按小时显示的header
 */
const tableHeaderColsSeqMap = {
  appsize: ['dcName', 'slotSize', IMPR, CLICK, CLICK_RATIO, CPC, COST, 'ECPM'],
  app: ['dcName', IMPR, CLICK, CLICK_RATIO, CPC, COST, 'ECPM', 'operation'],
  size: ['slotSize', IMPR, CLICK, CLICK_RATIO, CPC, COST, 'ECPM', 'operation'],
  cid: ['cid', IMPR, CLICK, CLICK_RATIO, CPC, COST, 'ECPM', 'operation'],
  crid: ['crid', IMPR, CLICK, CLICK_RATIO, CPC, COST, 'ECPM', 'operation'],
  hour: ['hour', IMPR, CLICK, CLICK_RATIO, CPC, COST, 'ECPM'],
  day: ['day', IMPR, CLICK, CLICK_RATIO, CPC, COST, 'ECPM']
};

export { tableHeaderColsMap, tableHeaderColsSeqMap };
