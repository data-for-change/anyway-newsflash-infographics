import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar, Tooltip, Legend } from 'recharts';
import { roseColor, honeyColor, yellowColor, blackColor, whiteColor } from 'style';
import { Typography } from 'components/atoms';
import tinycolor from 'tinycolor2';

const colors = [yellowColor, honeyColor, roseColor];

type BarDataMap = {
  [key: string]: number | string;
};

type CustomizedLabelProps = {
  x?: number;
  y?: number;
  value?: number;
  height?: number;
  width?: number;
  isPercentage?: boolean;
  isStacked?: boolean;
};

interface IBarChartBaseProps {
  data: Array<BarDataMap>;
  isPercentage: boolean;
  textLabel?: string;
}

interface ISingleBarChartProps extends IBarChartBaseProps {}

interface IMultiBarChartProps extends IBarChartBaseProps {
  isStacked: boolean;
}

const CustomizedLabel = (props: CustomizedLabelProps) => {
  const { x = 0, y = 0, value = 0, height = 0, width = 0, isPercentage, isStacked } = props;
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
      {textLabel && <Typography.Body3>{textLabel}</Typography.Body3>}
      <ResponsiveContainer>
        <BarChart data={data} margin={{ bottom: 20 }}>
          <XAxis
            angle={-7}
            interval={0}
            dataKey={'xType'}
            tickLine={false}
            axisLine={false}
            style={{ fill: blackColor }}
          />
          <Tooltip />
          <Legend verticalAlign="top" align="right" iconType="circle" height={35} />
          {children}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const SingleBarChart: FC<ISingleBarChartProps> = ({ data, isPercentage, textLabel }) => {
  const yLabels = Object.keys(data[0]);
  yLabels.splice(0, 1);

  const barStyle = {
    filter: `drop-shadow(1mm 1mm 0 ${tinycolor(roseColor).darken().toString()})`,
  };
  return (
    <BarChartContainer data={data} isPercentage={isPercentage} textLabel={textLabel}>
      <Bar fill={roseColor} dataKey={yLabels[0]} style={barStyle} isAnimationActive={false}>
        <LabelList content={<CustomizedLabel isPercentage={isPercentage} />} dataKey={yLabels[0]} />
      </Bar>
    </BarChartContainer>
  );
};

const MultiBarChart: FC<IMultiBarChartProps> = ({ data, isPercentage, isStacked, textLabel }) => {
  let yLabels = Object.keys(data[0]);
  yLabels.splice(0, 1);
  yLabels = yLabels.reverse();
  const maxBarsNum = yLabels.length;

  return (
    <BarChartContainer data={data} isPercentage={isPercentage} textLabel={textLabel}>
      {Array.from({ length: maxBarsNum }, (_, i) => {
        const barStyle = {
          filter: `drop-shadow(1mm ${isStacked ? '0' : '1mm'} 0 ${tinycolor(colors[i]).darken().toString()})`,
        };

        return (
          <Bar
            stackId={isStacked ? 'stack_1' : undefined}
            fill={colors[i]}
            dataKey={yLabels[i]}
            style={barStyle}
            isAnimationActive={false}
          >
            <LabelList
              content={<CustomizedLabel isPercentage={isPercentage} isStacked={isStacked} />}
              dataKey={yLabels[i]}
            />
          </Bar>
        );
      })}
    </BarChartContainer>
  );
};

export { SingleBarChart, MultiBarChart };
