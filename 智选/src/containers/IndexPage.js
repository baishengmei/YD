import { connect } from 'react-redux'
import IndexPage from '../components/IndexPage/IndexPage'
import { sendErrorMessage }  from '../actions/Message'
import {
  indexPageMenuChange,
  indexPageQueryAll,
  indexPageQueryDetail
} from '../actions/IndexPage'
import {
  IMPR,
  CLICK,
  CLICK_RATIO,
  COST,
  CPC,
  CONVERT,
  CONVERT_RATIO,
  tableHeaderColsMap
} from '../constants/ConsumptionTableHeader';
import MenuTypes, { TimeMenuItems } from '../constants/MenuTypes'

const legend =
[
  IMPR,
  CLICK,
  CLICK_RATIO,
  COST,
  CPC,
  CONVERT,
  CONVERT_RATIO
].map(key => tableHeaderColsMap[key].content)

const mapStateToProps = state => {
  const {
    summary,
    menu: {
      type: menuType,
      ...selectedMenu
    },
    detail
  } = state.indexPage;

  let chartData = undefined;

  if ( detail.chart ) {
    const {
      xDatas,
      ...rest
    } = detail.chart;

    chartData = {
      legend,
      xDatas,
      series: [{
        name: tableHeaderColsMap[IMPR].content,
        type: 'line',
        data: rest[IMPR]
      }, {
        name: tableHeaderColsMap[CLICK].content,
        type: 'line',
        data: rest[CLICK]
      }, {
        name: tableHeaderColsMap[CLICK_RATIO].content,
        type: 'line',
        data: rest[CLICK_RATIO]
      }, {
        name: tableHeaderColsMap[CPC].content,
        type: 'line',
        data: rest[CPC]
      }, {
        name: tableHeaderColsMap[CONVERT].content,
        type: 'line',
        data: rest[CONVERT]
      }, {
        name: tableHeaderColsMap[CONVERT_RATIO].content,
        type: 'line',
        data: rest[CONVERT_RATIO]
      },  {
        name: tableHeaderColsMap[COST].content,
        type: 'line',
        data: rest[COST]
      }]
    }
  }

  return {
    isFetchingSummary: summary.isFetching,
    ...summary.content,
    menus: [{
      menuType,
      menuItems: TimeMenuItems,
      selectedMenu
    }],
    isFetchingDetail: detail.isFetching,
    ...detail.summary,
    chartData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendErrorMessage: error => {
      dispatch(sendErrorMessage(error))
    },
    onMenusChange: menu => {
      dispatch(indexPageMenuChange(menu))
    },
    onQueryDetail: () => {
      dispatch(indexPageQueryDetail())
    },
    onQueryAll: () => {
      dispatch(indexPageQueryAll())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage)