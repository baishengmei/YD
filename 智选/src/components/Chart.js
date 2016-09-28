import React, { PropTypes, Component } from 'react';
import { getDebugger } from '../core/utils';

const myDebug = getDebugger('Chart');

export default class Chart extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
      option: undefined
    };

    // 用于限制 updateChart 函数是否执行
    this.updateChartId = 0;

    this.delayRenderChart = this.delayRenderChart.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    detail: PropTypes.object,
    style: PropTypes.object
  };

  updateData(data) {
    const { isLoading, detail }= data;

    if ( isLoading ) {
      this.setState({
        isLoading
      });
      return;
    }

    if ( !detail ) {
      this.setState({
        isLoading,
        option: undefined
      });
      return;
    }

    const defaultOption = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: undefined
      },
      xAxis: [{
        type: 'category',
        position: 'bottom',
        boundaryGap: false,
        scale: true,
        name: '时间',
        axisLine: { // 轴线
          onZero: false,
          lineStyle: {
            color: '#b4bed2',
            width: 2
          }
        },
        axisTick: { // 轴标记
          show: true,
          length: 10
        },
        data: undefined
      }],
      yAxis: [{
        type: 'value',
        position: 'left',
        //min: 0,
        //max: 300,
        //splitNumber: 5,
        boundaryGap: [false, false],
        axisLine: { // 轴线
          onZero: false,
          lineStyle: {
            color: '#b4bed2',
            width: 2
          }
        },
        axisTick: { // 轴标记
          show: true
        }
      }, {
        type: 'value',
        splitNumber: 5,
        axisLabel: {
          formatter: function(value) {
            // Function formatter
            return value + 'v'
          }
        },
        splitLine: {
          show: true
        }
      }],
      series: undefined
    };

    // detail.legend:
    //   ['展示数', '点击数', '点击率', '点击单价', '消费', 'ECPM']
    // xAxis[0].data:
    //   ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
    // series: {
    //   name: '展示数',
    //   type: 'line',
    //   data: ["4664", "2442", "1556", "1371", "1964", "4454", "6804", "9231", "8154", "9181", "11635", "14831", "15615", "12793", "12012", "11608", "11808", "10527", "10395", "11458", "13428", "12149", "0", "0"]
    // }
    const option = Object.assign({}, defaultOption, {
      legend: {
        data: detail.legend
      },
      xAxis: [Object.assign({}, defaultOption.xAxis[0], {
        data: detail.xDatas
      })],
      series: detail.series
    });

    this.setState({
      isLoading,
      option
    });
  }

  componentDidUpdate() {
    myDebug('componentDidUpdate')
    this.delayRenderChart();
  }

  componentWillMount() {
    const { isLoading, detail } = this.props;
    this.updateData({
      isLoading,
      detail
    })
  }

  componentDidMount() {
    this.delayRenderChart()
  }

  componentWillReceiveProps(nextProps) {
    myDebug('componentWillReceiveProps', nextProps)
    this.updateData({
      isLoading: nextProps.isLoading,
      detail: nextProps.detail
    });
  }

  shouldComponentUpdate(nextProps) {
    const {
      isLoading,
      detail
    } = this.props;
    return isLoading !== nextProps.isLoading
      || detail !== nextProps.detail;
  }

  delayRenderChart() {
    myDebug('delayRenderChart', ++this.updateChartId)
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.renderChart(this.updateChartId)
    // this.timer = setTimeout(() => {
    // }, 16);
  }

  renderChart(runId) {
    myDebug('renderChart', runId)
    // 自定义的全局加载 echarts 组件的类
    if (typeof load === 'undefined') {
      myDebug('did not load echart')
      this.delayRenderChart();
      return;
    }

    let { isLoading, option } = this.state;

    [ option ].forEach((option, index) => {
      let chartRef = this.chart;
      myDebug('this', this)
      if (chartRef) {
        this.updateChart(chartRef, isLoading, option, runId);
      } else {
        load(['echarts', 'echarts/chart/line'], ec => {
          if ( this.chart ) return;
          myDebug('this2', this)
          // 基于准备好的dom，初始化echarts图表
          chartRef = this.chart = ec.init(this.refs.chart);
          chartRef.setTheme('macarons');
          this.updateChart(chartRef, isLoading, option, runId);
        });
      }
    });
  }

  updateChart(el, isLoading, option, runId) {
    if ( runId !== this.updateChartId ) {
      return;
    }

    myDebug('update chart');
    if ( isLoading ) {
      el.showLoading({
        text: '正在努力加载中...',
        textStyle: {
          fontSize: 16
        }
      });
    } else if ( this.props.detail === null ) {
      el.showLoading({
        text: '无图表数据',
        textStyle: {
          fontSize: 16
        }
      });
      el.clear();
    } else if ( this.props.detail === undefined ) {
      el.showLoading({
        // animation: false,
        text: '数据加载失败',
        textStyle: {
          fontSize: 16
        }
      });
      el.clear();
    } else {
      el.showLoading({
        text: '正在努力加载中...',
        textStyle: {
          fontSize: 16
        }
      });
      el.setOption(option, true); //true表示差异不合并
      el.hideLoading();
    }
  }

  render() {
    myDebug('render')

    const { isLoading, detail, style } = this.props;
    let loadFail = !isLoading && detail === undefined;

    return (
      <div
        className='chartWrapper'
        style={{marginTop: '20px'}}>
        <div
          ref='chart'
          style={{
            width: '100%',
            height: '500px',
            ...(
              loadFail ?
                {
                  textAlign: 'center',
                  fontSize: '16px',
                  lineHeight: '500px',
                  vertialAlign: 'middle'
                } : {}
            ),
            ...this.props.style
          }}>
          {
            loadFail && '数据加载失败'
          }
        </div>
      </div>
    );
  }
}
