import React, { PropTypes, Component } from 'react';
import styles from './IndexPage.css';
import TestStyles from './TestSection.css';
import { orangeBtn } from '../variables';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SectionHeader from '../SectionHeader';
import Chart from '../Chart';
import Menus from '../Menus';
import SummaryInfoBoxes from './SummaryInfoBoxes';
import TestSection from './TestSection';
import ChartSummary from './ChartSummary';
import getSubComponent from '../getSubComponent';
import { getDebugger } from '../../core/utils';

const myDebug = getDebugger('IndexPage');

class IndexPage extends Component {
  constructor(...args) {
    super(...args);
  }

  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.context.setTitle('首页');
  }

  componentDidMount() {
    this.props.onQueryAll();
  }

  getSummaryComponent() {
    return getSubComponent(this, SummaryInfoBoxes);
  }

  // getTestSection(){
  //   return getSubComponent(this, TestSection);
  // }

  getChartSummaryComponent() {
    return getSubComponent(this, ChartSummary);
  }

  getChartMenus() {
    const {
      menus,
      onMenusChange,
      sendErrorMessage,
      onQueryDetail
    } = this.props;

    return (
      <label
        className={styles.chartMenu}>
        查询时间:
        {
          <Menus
            ref='menu'
            menus={menus}
            onMenusChange={onMenusChange}
            sendErrorMessage={sendErrorMessage}
            onQuery={onQueryDetail}
            queryButtonStyle={{
              backgroundColor: orangeBtn.bgColor,
              labelColor: '#fff',
              style: {
                height: '30px',
                lineHeight: '30px'
              }
            }}
            primary={false}
            style={{
              display: 'inline-block',
              minWidth: '100px'
            }} />
        }
      </label>
    );
  }

  getScriptCode() {
    return
    `
    require.config({
       paths: {
           echarts: 'http://echarts.baidu.com/build/dist'
       }
    });

    function load(arr, cb) {
      require(arr, cb);
    }
    `;
  }

  render() {

    myDebug('render')

    return (
      <div className='IndexPage'>
        {this.getSummaryComponent()}
        <TestSection/>
        <div className={styles.showChart}>
          <SectionHeader
            avatar={<img src={require('../../images/chart.png')} />}
            title={
              <span>整体数据
                <span style={{color: '#919191', fontWeight: 100}}>
                （数据可能会有一定时间的延误）
                </span>
              </span>
            }/>
          <div className={styles.chartMain}>
            {this.getChartMenus()}
            {this.getChartSummaryComponent()}
            <script src="http://echarts.baidu.com/build/dist/echarts.js" />
            <script
              dangerouslySetInnerHTML={{__html: this.getScriptCode()}} />
            <Chart
              isLoading={this.props.isFetchingDetail}
              detail={this.props.chartData}
              style={{marginTop: '20px'}} />
          </div>
        </div>
      </div>
    );
  }
}

IndexPage.propTypes = {
  ...SummaryInfoBoxes.propTypes,
  menus: PropTypes.array.isRequired,
  ...ChartSummary.propTypes,
  chartData: PropTypes.object,
  sendErrorMessage: PropTypes.func.isRequired,
  onMenusChange: PropTypes.func.isRequired,
  onQueryDetail: PropTypes.func.isRequired,
  onQueryAll: PropTypes.func.isRequired
};

export default withStyles(styles, TestStyles)(IndexPage);
