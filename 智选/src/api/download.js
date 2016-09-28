import { Router } from 'express';
import http from '../core/HttpDelegate';
import { api } from '../config';
import { menuToStr, getTimeout, isOneDay } from '../core/APIParamsEncode';
import { tableHeaderColsMap, tableHeaderColsSeqMap } from '../constants/ConsumptionTableHeader';
import { formatDate } from '../core/serverUtils';
import excel from 'node-xlsx';
//import iconv from 'iconv-lite';

// 保存为 csv 文件的问题是 编码
// windows 下 Excel 默认用 ANSI
// 编码打开 csv 文件，导致 header 是乱码
// 解决方案是： 先用文本编辑器保存 csv 为 ANSI 编码
// 再用 Excel 打开
const exportCsvFile = (res, filename, header, data) => {
  // 可以设置charset
  // res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  // res.setHeader('Content-Disposition', 'attachment;filename="report.csv"');
  // res.setHeader('Content-Length', ret.length);
  // res.end(ret);
  let body = data.map(row => row.join(',')).join('\n');
  let ret = `${tHeader.join(',')}\n${body}`;

  // 不能设置charset
  res
    .status(200)
    .attachment(`${filename}.csv`)
    .send(ret);
};

const exportExcelFile = (res, filename, sheetname, header, data) => {
  let buf = excel.build([{ name: sheetname, data: [header].concat(data) }]);

  res
    .status(200)
    .attachment(`${filename}.xlsx`)
    .send(buf);
};

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    let accessId = req._accessId;
    const query = req.query;
    let type = query.type;

    let menus = query.menus && JSON.parse(query.menus) || '';
    let qparams = menus.length === 3 && menus.map(menu => menuToStr(menu) ).join('&');
    let url;
    let tableHeaderType;

    switch (type) {
      case 'click':
        url = api['click'];
        let appSizeMenu = menus.filter(m => m.type === 'ADDIMENSIONS');
        appSizeMenu.length === 1 && (tableHeaderType = appSizeMenu[0].value);
        break;
      case 'click_by_app':
        url = `${api['clickDetail']}?dcId=${query.p}`;
        tableHeaderType = isOneDay(menus) ? 'hour' : 'day';
        break;
      case 'click_by_size':
        url = `${api['clickDetail']}?slotSize=${query.p}`;
        tableHeaderType = isOneDay(menus) ? 'hour' : 'day';
        break;
    }

    if (url) {
      if (!tableHeaderType) {
        res.status(200).send('Invalid Request: Invalid Menu');
        return;
      }

      url += `${(url.indexOf('?') !== -1 ? '&' : '?')}${qparams}&op=download&opType=4`;

      let content = await http.get(accessId, url, req.session.user, getTimeout(menus));

      let seq = tableHeaderColsSeqMap[tableHeaderType];

      //去掉 某些table header 的“操作”列
      ['app', 'size'].includes(tableHeaderType) && (seq = seq.slice(0, -1));

      let tHeader = seq.map(col => tableHeaderColsMap[col].content);

      let tBody = content.tableQueryResults.map(r => seq.map(col => r[col] != null ? r[col] : ''));

      let filename = getExcelFilename(type, tableHeaderType, menus.filter( m => m.type === 'TIME')[0] );

      //exportCsvFile(res, filename, tHeader, tBody);
      exportExcelFile(res, filename, '表1', tHeader, tBody);

    } else {
      res.status(404).send();
    }

  } catch (err) {
    next(err);
  }
});

function getExcelFilename(type, tHeaderType, timeMenu) {
  let isOneDay = tHeaderType === 'hour';
  const calcDate = (date, days) => (date.setDate(date.getDate() + days), date);
  let timePart = (() => {
    switch ( timeMenu.value ) {
      case 'today':
        return formatDate(new Date);
        break;
      case 'custom':
        let { start, end } = timeMenu.dateRange;
        if ( isOneDay ) {
          return formatDate(new Date(start));
        }
        return `${start ? formatDate(new Date(start)) : '开始'}-${end ? formatDate(new Date(end)) : formatDate(new Date)}`;
        break;
      case 'last7':
        // '过去7天'
        let d1 = new Date;
        return `${formatDate(calcDate(d1, -7))}-${formatDate(calcDate(d1, 6))}`;
      case 'last30':
        // '过去30天';
        let d2 = new Date;
        return `${formatDate(calcDate(d2, -30))}-${formatDate(calcDate(d2, 29))}`;
      case 'yesterday':
        return formatDate(calcDate(new Date, -1));
      default:
        return '未知时间';
    }
  })();

  let map = {
    'click-all': '点击消费报表_不分类_汇总',
    'click-app': '点击消费报表_分网站分App_汇总',
    'click-size': '点击消费报表_分尺寸分广告位_汇总',
    'click_by_app-day': '点击消费报表_分网站分App_明细',
    'click_by_app-hour': '点击消费报表_分网站分App_明细',
    'click_by_size-day': '点击消费报表_分尺寸分广告位_明细',
    'click_by_size-hour': '点击消费报表_分尺寸分广告位_明细'
  };

  return `${map[type + '-' + tHeaderType]}-${timePart}`;
}

export default router;
