import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar, Tooltip, Legend } from 'recharts';
import { roseColor, honeyColor, yellowColor, blackColor, whiteColor } from 'style';
import { Typography } from 'components/atoms';
import tinycolor from 'tinycolor2';

const colors = [roseColor, honeyColor, yellowColor];
const Y_AXIS_OFFSET = 20;
const MIN_BAR_HEIGHT = 20;

export const BAR_CHART_X_LABEL = 'xLabel';

export type BarDataMap = {
  [key: string]: string | number;
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
  subtitle?: string;
  isStacked?: boolean;
}

interface ISingleBarChartProps extends IBarChartBaseProps {}

interface IMultiBarChartProps extends IBarChartBaseProps {
  isStacked: boolean;
  editorBarOptions?: Record<number, boolean>;
}

const CustomizedLabel = (props: CustomizedLabelProps) => {
  const { x = 0, y = 0, value = 0, height = 0, width = 0, isPercentage, isStacked } = props;
  const calculatedValue = isPercentage ? value + '%' : value;
  return (
    <g>
      <text fill={isStacked ? blackColor : whiteColor} textAnchor="middle" x={x + width / 2} y={y + Y_AXIS_OFFSET}>
        {height < MIN_BAR_HEIGHT ? null : calculatedValue}
      </text>
    </g>
  );
};

const BarChartContainer: FC<IBarChartBaseProps> = ({ data, textLabel, subtitle, children, isStacked }) => {
  return (
    <>
      {!subtitle && <Typography.Body3>{textLabel}</Typography.Body3>}
      <ResponsiveContainer>
        <BarChart data={data} margin={{ bottom: 20 }}>
          <XAxis
            angle={0}
            interval={0}
            dataKey={BAR_CHART_X_LABEL}
            tickLine={false}
            axisLine={false}
            style={{ fill: blackColor }}
          />
          <Tooltip />
          {isStacked && <Legend verticalAlign="top" align="right" iconType="circle" height={35} />}
          {children}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const SingleBarChart: FC<ISingleBarChartProps> = ({ data, isPercentage, textLabel }) => {
  const yLabels = data ? Object.keys(data[0]) : [];
  yLabels.splice(0, 1);

  const barStyle = {
    filter: `drop-shadow(0.2em 0.2em 0 ${tinycolor(roseColor).darken().toString()})`,
  };
  return (
    <BarChartContainer data={data} isPercentage={isPercentage} textLabel={textLabel} isStacked={false}>
      <Bar fill={roseColor} dataKey={yLabels[0]} style={barStyle} isAnimationActive={false}>
        <LabelList content={<CustomizedLabel isPercentage={isPercentage} />} dataKey={yLabels[0]} />
      </Bar>
    </BarChartContainer>
  );
};

const MultiBarChart: FC<IMultiBarChartProps> = ({ data, isPercentage, isStacked, textLabel, subtitle, editorBarOptions }) => {
  const yLabels = data ? Object.keys(data[0]) : [];
  yLabels.splice(0, 1);
  const maxBarsNum = yLabels.length;
  const filteredColors : Record<string, any> = (editorBarOptions && Object.keys(editorBarOptions).length !== 0) ?
    Object.values(editorBarOptions).map((include: any, i: number) => {
      if (include) {
        return colors[i];
      } else {
        return false;
      }
    }).filter( Boolean ) : colors;

  return (
    <BarChartContainer
      data={data}
      isPercentage={isPercentage}
      textLabel={textLabel}
      subtitle={subtitle}
      isStacked={isStacked}
    >
      {Array.from({ length: maxBarsNum }, (_, i) => {
        const barStyle = {
          filter: `drop-shadow(0.2em ${isStacked ? '0' : '0.2em'} 0 ${tinycolor(filteredColors[i]).darken().toString()})`,
        };

        return (
          <Bar
            key={i}
            stackId={isStacked ? 'stack_1' : undefined}
            fill={filteredColors[i]}
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
