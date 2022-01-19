import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar, Tooltip, Legend, Cell } from 'recharts';
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

// create custom type as recharts <bar /> component does not accept regular number[].
const borderRadius: Record<'Bottom' | 'Top' | 'All' | 'None', [number, number, number, number]> = {
  Bottom: [0, 0, 10, 10],
  Top: [10, 10, 0, 0],
  All: [10, 10, 10, 10],
  None: [0, 0, 0, 0],
};
const parseBorderRadiusToString = (borderRadiusArray: [number, number, number, number]) => {
  const radiusAsString = borderRadiusArray.map((border) => {
    return border.toString();
  });
  return radiusAsString as unknown as string;
};

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

const removeEmptyValues = (barSeries: BarDataMap) => {
  const barSeriesNonEmpty: BarDataMap = {};
  for (const [key, value] of Object.entries(barSeries)) {
    if (value !== 0) {
      barSeriesNonEmpty[key] = value;
    }
  }
  return barSeriesNonEmpty;
};

const calculateBarsForRadius = (barSeriesNonEmpty: BarDataMap, barsNumInCurrStack: number, yLabels: string[]) => {
  /*
           options             (1)(2)(3)(4)
           thirdLabel  fatal:   0  T  T  T
           secondLabel severe:  T  B  0  N
           firstLabel   light:   B  0  B  B
           */
  const firstLabel = yLabels[0];
  const secondLabel = yLabels[1];
  const thirdLabel = yLabels[2];
  let firstBar, lastBar;
  if (barSeriesNonEmpty[firstLabel]) {
    // option (1)
    firstBar = firstLabel;
    lastBar = secondLabel;
  } else {
    // option (2)
    firstBar = secondLabel;
    lastBar = thirdLabel;
  }
  if (barsNumInCurrStack >= 3 || !barSeriesNonEmpty[secondLabel]) {
    // option (3)(4)
    firstBar = firstLabel;
    lastBar = thirdLabel;
  }
  return [firstBar, lastBar];
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
    <>
      <BarChartContainer data={data} isPercentage={isPercentage} textLabel={textLabel}>
        <Bar fill={roseColor} dataKey={yLabels[0]} style={barStyle} isAnimationActive={false} radius={borderRadius.All}>
          <LabelList content={<CustomizedLabel isPercentage={isPercentage} />} dataKey={yLabels[0]} />
        </Bar>
      </BarChartContainer>
    </>
  );
};

const MultiBarChart: FC<IMultiBarChartProps> = ({ data, isPercentage, isStacked, textLabel }) => {
  let yLabels = Object.keys(data[0]);
  yLabels.splice(0, 1);
  yLabels = yLabels.reverse();
  const maxBarsNum = yLabels.length;

  return (
    <>
      <BarChartContainer data={data} isPercentage={isPercentage} textLabel={textLabel}>
        {Array.from({ length: maxBarsNum }, (_, i) => {
          const barStyle = {
            filter: `drop-shadow(1mm ${isStacked ? '0' : '1mm'} 0 ${tinycolor(colors[i]).darken().toString()})`,
          };
          const getCellRadius = (barSeries: BarDataMap) => {
            const barSeriesNonEmpty = removeEmptyValues(barSeries);

            const barsNumInCurrStack = Object.keys(barSeriesNonEmpty).length - 1;
            const isOneBar = !isStacked || barsNumInCurrStack <= 1;
            if (isOneBar) {
              return <Cell radius={parseBorderRadiusToString(borderRadius.All)} />;
            }

            const [firstBar, lastBar] = calculateBarsForRadius(barSeriesNonEmpty, barsNumInCurrStack, yLabels);

            switch (yLabels[i]) {
              case firstBar:
                return <Cell radius={parseBorderRadiusToString(borderRadius.Bottom)} />;
              case lastBar:
                return <Cell radius={parseBorderRadiusToString(borderRadius.Top)} />;
              default:
                return <Cell radius={parseBorderRadiusToString(borderRadius.None)} />;
            }
          };
          return (
            <Bar
              stackId={isStacked ? 'stack_1' : undefined}
              fill={colors[i]}
              dataKey={yLabels[i]}
              style={barStyle}
              isAnimationActive={false}
            >
              {data.map((barSeries) => {
                return getCellRadius(barSeries);
              })}
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
