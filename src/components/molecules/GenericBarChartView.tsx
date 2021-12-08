import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar, Tooltip, Legend } from 'recharts';
import { roseColor, honeyColor, yellowColor, blackColor, whiteColor } from 'style';
import { Typography } from 'components/atoms';
import tinycolor from 'tinycolor2';

type BarDataMap = {
  [key: string]: number | string;
};

interface IBarChartBaseProps {
  isPercentage: boolean;
  yLabel: string;
  textLabel?: string;
  xLabels: string[];
}
export interface ISingleBarChartProps extends IBarChartBaseProps {
  data: Array<BarDataMap>;
}

export interface IMultiBarChartProps extends IBarChartBaseProps {
  data: Array<BarDataMap>;
  isStacked: boolean;
}

// create custom type as recharts <bar /> component does not accept regular number[].
const borderRadius: Record<'Bottom' | 'Top' | 'All' | 'None', [number, number, number, number]> = {
  Bottom: [0, 0, 10, 10],
  Top: [10, 10, 0, 0],
  All: [10, 10, 10, 10],
  None: [0, 0, 0, 0],
};

function getBarRadius(isStacked: boolean, numOfBars: number, barIndex: number) {
  const lastBar = numOfBars - 1;
  if (!isStacked) {
    return borderRadius.All;
  }

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

const GenericBarChartView: FC<ISingleBarChartProps & IMultiBarChartProps> = ({
  isStacked,
  xLabels,
  data,
  isPercentage,
  yLabel,
  textLabel,
}) => {
  const numOfBars = xLabels.length;
  const COLORS = isStacked ? [yellowColor, honeyColor, roseColor] : [roseColor, honeyColor, yellowColor];
  // Iterate all bars and styling per bar.
  const barElements = () =>
    Array.from({ length: numOfBars }, (_, i) => {
      const barStyle = {
        filter: `drop-shadow(1mm ${isStacked ? '0' : '1mm'} 0 ${tinycolor(COLORS[i]).darken().toString()})`,
      };
      const barRadius = getBarRadius(isStacked, numOfBars, i);

      return (
        <Bar
          stackId={isStacked ? 'a' : undefined}
          fill={COLORS[i]}
          dataKey={xLabels[i]}
          style={barStyle}
          isAnimationActive={false}
          radius={barRadius}
        >
          <LabelList
            content={<CustomizedLabel isPercentage={isPercentage} isStacked={isStacked} />}
            dataKey={xLabels[i]}
          />
        </Bar>
      );
    });

  return (
    <>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis
            angle={-7}
            interval={0}
            dataKey={yLabel}
            tickLine={false}
            axisLine={false}
            style={{ fill: blackColor }}
          />
          <Tooltip />
          <Legend verticalAlign="top" align="right" iconType="circle" />
          {numOfBars > 0 && barElements()}
        </BarChart>
      </ResponsiveContainer>
      {textLabel && <Typography.Body3>{textLabel}</Typography.Body3>}
    </>
  );
};
export default GenericBarChartView;
