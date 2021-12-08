import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar, Tooltip, Legend } from 'recharts';
import { roseColor, honeyColor, yellowColor, blackColor, whiteColor } from 'style';
import { Typography } from 'components/atoms';
import tinycolor from 'tinycolor2';
const COLORS = [yellowColor, honeyColor, roseColor];
type BarDataMap = {
  [key: string]: number | string;
};

interface IBarChartBaseProps {
  data: Array<BarDataMap>;
  isPercentage: boolean;
  textLabel?: string;
  yLabels: string[];
}
interface ISingleBarChartProps extends IBarChartBaseProps {}

interface IMultiBarChartProps extends IBarChartBaseProps {
  isStacked: boolean;
}

// create custom type as recharts <bar /> component does not accept regular number[].
const borderRadius: Record<'Bottom' | 'Top' | 'All' | 'None', [number, number, number, number]> = {
  Bottom: [0, 0, 10, 10],
  Top: [10, 10, 0, 0],
  All: [10, 10, 10, 10],
  None: [0, 0, 0, 0],
};

function getBarRadius(numOfBars: number, barIndex: number) {
  const lastBar = numOfBars - 1;

  switch (barIndex) {
    case 0:
      return borderRadius.Bottom;
    case lastBar:
      return borderRadius.Top;
    default:
      return borderRadius.None;
  }
}

const CustomizedLabel = (props: any) => {
  const { x, y, value, height, width, isPercentage, isStacked } = props;
  const calculatedValue = isPercentage ? value + '%' : value;
  return (
    <g>
      <text fill={isStacked ? blackColor : whiteColor} textAnchor="middle" x={x + width / 2} y={y + 20}>
        {height < 20 ? null : calculatedValue}
      </text>
    </g>
  );
};

const BarChartContainer: FC<IBarChartBaseProps> = ({ data, textLabel, children }) => {
  return (
    <>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis
            angle={-7}
            interval={0}
            dataKey={'xType'}
            tickLine={false}
            axisLine={false}
            style={{ fill: blackColor }}
          />
          <Tooltip />
          <Legend verticalAlign="top" align="right" iconType="circle" />
          {children}
        </BarChart>
      </ResponsiveContainer>
      {textLabel && <Typography.Body3>{textLabel}</Typography.Body3>}
    </>
  );
};

const SingleBarChart: FC<ISingleBarChartProps> = ({ data, isPercentage, yLabels }) => {
  const barStyle = {
    filter: `drop-shadow(1mm 1mm 0 ${tinycolor(COLORS[0]).darken().toString()})`,
  };
  return (
    <>
      <BarChartContainer data={data} isPercentage={isPercentage} yLabels={yLabels}>
        <Bar fill={COLORS[0]} dataKey={'value'} style={barStyle} isAnimationActive={false} radius={borderRadius.All}>
          <LabelList content={<CustomizedLabel isPercentage={isPercentage} />} dataKey={'value'} />
        </Bar>
      </BarChartContainer>
    </>
  );
};

const MultiBarChart: FC<IMultiBarChartProps> = ({ data, isPercentage, yLabels, isStacked }) => {
  const numOfBars = yLabels.length;
  return (
    <>
      <BarChartContainer data={data} isPercentage={isPercentage} yLabels={yLabels}>
        {Array.from({ length: numOfBars }, (_, i) => {
          const barStyle = {
            filter: `drop-shadow(1mm ${isStacked ? '0' : '1mm'} 0 ${tinycolor(COLORS[i]).darken().toString()})`,
          };

          const barRadius = isStacked ? getBarRadius(numOfBars, i) : borderRadius.All;

          return (
            <Bar
              stackId={isStacked ? 'stack_1' : undefined}
              fill={COLORS[i]}
              dataKey={yLabels[i]}
              style={barStyle}
              isAnimationActive={false}
              radius={barRadius}
            >
              <LabelList
                content={<CustomizedLabel isPercentage={isPercentage} isStacked={isStacked} />}
                dataKey={yLabels[i]}
              />
            </Bar>
          );
        })}
      </BarChartContainer>
    </>
  );
};

export { SingleBarChart, MultiBarChart };
