import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar, Tooltip, Legend } from 'recharts';
import { roseColor, honeyColor, yellowColor, blackColor, whiteColor } from 'style';
import { Typography } from 'components/atoms';
import tinycolor from 'tinycolor2';

export enum BarType {
  Single = 'single',
  Multi = 'multi',
  Stacked = 'stacked',
}
interface IProps {
  barType: BarType;
  data: Array<object>;
  isPercentage: boolean;
  yLabel: string;
  textLabel?: string;
  xLabels: string[];
}

function getBarRadius(isStacked: boolean, numOfBars: number, barIndex: number) {
  // create custom type as recharts <bar /> component does not accept regular number[].
  type radiusType = [number, number, number, number];
  type radiusSidesType = Record<'bottomSide' | 'topSide' | 'bothSides' | 'noRadius', radiusType>;
  const radiusSides: radiusSidesType = {
    bottomSide: [0, 0, 10, 10],
    topSide: [10, 10, 0, 0],
    bothSides: [10, 10, 10, 10],
    noRadius: [0, 0, 0, 0],
  };

  if (!isStacked) {
    return radiusSides.bothSides;
  }

  switch (barIndex) {
    case 0:
      return radiusSides.bottomSide;
    case numOfBars - 1:
      return radiusSides.topSide;
    default:
      return radiusSides.noRadius;
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

const GenericBarChartView: FC<IProps> = ({ barType, xLabels, data, isPercentage, yLabel, textLabel }) => {
  const COLORS = [yellowColor, honeyColor, roseColor, blackColor];
  const numOfBars = xLabels.length;
  const isStacked: boolean = barType === BarType.Stacked;
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
