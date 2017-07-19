import React, { PropTypes, Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
  colorRed,
  colorBlue,
  colorGrey,
  colorWeakBlack,
  fontWeightLight as labelFontWeight,
  fontSmallest as labelFontSize
} from '../../../../components/variables';

const getLegendPayload = (yKeys, yLabels) => {
  const payload = [{
    value: yLabels[0],
    id: yKeys[0],
    color: colorRed,
    type: 'circle',
    orientation: 'left'
  }];

  if (yLabels.length > 1) {
    payload.push({
      value: yLabels[1],
      id: yKeys[1],
      color: colorBlue,
      type: 'circle',
      orientation: 'right'
    });
  }

  return payload;
};

const xAxisStyle = {
  style: {
    stroke: colorGrey,
    fontWeight: labelFontWeight
  }
};
const labelStyle = {
  fontSize: labelFontSize,
  fontWeight: labelFontWeight
};

class BiLineChart extends Component {
  static propTypes = {
    lineType: PropTypes.oneOf(['linear', 'monotone']).isRequired,
    data: PropTypes.array.isRequired,
    xKey: PropTypes.string.isRequired,
    yKeys: PropTypes.array.isRequired,
    yLabels: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    tickFormatters: PropTypes.shape({
      left: PropTypes.func,
      right: PropTypes.func,
    }),
  };

  static defaultProps = {
    tickFormatters: {
      left: null,
      right: null,
    }
  };

  yAxisLabel = (props) => {
    // eslint-disable-next-line react/prop-types, no-shadow
    const { y, height, orientation, style = {}, labelStyle = {}, children } = props;
    const isLeft = orientation === 'left';
    const rot = isLeft ? -90 : 90;
    const fs = labelStyle.fontSize || style.fontSize || 16;
    const fw = labelStyle.fontWeight || style.fontWeight || 100;
    const cx = isLeft ? fs : (this.props.width - fs);
    const cy = y + height / 2; // eslint-disable-line no-mixed-operators
    return (
      <text
        x={0}
        y={0}
        fill='#b8b8b8'
        textAnchor='middle'
        fontSize={fs}
        fontWeight={fw}
        transform={`translate(${cx},${cy}) rotate(${rot})`}
      >
        {children}
      </text>
    );
  };

  render() {
    const {
      lineType,
      data,
      xKey,
      yKeys,
      yLabels,
      width,
      height,
      tickFormatters: {
        left: leftTickFormatter,
        right: rightTickFormatter,
      }
    } = this.props;

    if (data.length === 0) {
      return null;
    }

    const legendPayload = getLegendPayload(yKeys, yLabels);
    const padding = Math.round(width / data.length) / 2;

    return (
      <LineChart
        width={width}
        height={height}
        data={data}
        margin={{ top: 32, right: 32, left: 32, bottom: 0 }}
      >
        <XAxis
          dataKey={xKey}
          stroke={colorWeakBlack}
          tickSize={-9}
          dy={16}
          axisLine={xAxisStyle}
          tickLine={xAxisStyle}
          padding={{ left: padding, right: padding }}
          style={labelStyle}
        />
        <YAxis
          tickCount={6}
          tickFormatter={leftTickFormatter}
          axisLine={false}
          tickLine={false}
          label={this.yAxisLabel}
          yAxisId='left'
          orientation='left'
          stroke={colorWeakBlack}
          style={{
            ...labelStyle,
            transform: 'translateX(-16px)'
          }}
        >
          {yLabels[0]}
        </YAxis>
        {
          yLabels.length > 1 &&
          <YAxis
            tickCount={6}
            tickFormatter={rightTickFormatter}
            axisLine={false}
            tickLine={false}
            label={this.yAxisLabel}
            yAxisId='right'
            orientation='right'
            stroke={colorWeakBlack}
            style={{
              ...labelStyle,
              transform: 'translateX(16px)'
            }}
          >
            {yLabels[1]}
          </YAxis>
        }
        <CartesianGrid strokeDasharray='5 5' vertical={false} />
        <Tooltip
          wrapperStyle={{
            fontSize: labelFontSize,
            borderRadius: '2px',
            border: 0,
            boxShadow: '0 2px 6px 0 rgba(216, 216, 216, 0.6)'
          }}
          separator=': '
          labelStyle={{
            margin: 8,
            fontSize: labelFontSize,
            color: colorWeakBlack,
            fontWeight: labelFontWeight
          }}
          itemStyle={{
            ...labelStyle,
            padding: '0 8px',
            lineHeight: 1.5
          }}
        />
        <Legend
          iconSize={8}
          payload={legendPayload}
          lineHeight={1.5}
          wrapperStyle={labelStyle}
        />
        <Line
          type={lineType}
          dataKey={yKeys[0]}
          name={yLabels[0]}
          yAxisId='left'
          stroke={colorRed}
          strokeWidth='2'
        />
        {
          yLabels.length > 1 &&
          <Line
            type={lineType}
            dataKey={yKeys[1]}
            name={yLabels[1]}
            yAxisId='right'
            stroke={colorBlue}
            strokeWidth='2'
          />
        }
      </LineChart>
    );
  }
}

export default BiLineChart;
