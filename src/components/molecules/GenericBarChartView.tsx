import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar, Tooltip, Legend, Cell } from 'recharts';
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

const borderRadiusForCell: Record<'Bottom' | 'Top' | 'All' | 'None', string> = {
  Bottom: ['0', '0', '10', '10'] as unknown as string,
  Top: ['10', '10', '0', '0'] as unknown as string,
  All: ['10', '10', '10', '10'] as unknown as string,
  None: ['0', '0', '0', '0'] as unknown as string,
};

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
  const yLabels = Object.keys(data[0]);
  yLabels.splice(0, 1);
  const maxBarsNum = yLabels.length;
  return (
    <>
      <BarChartContainer data={data} isPercentage={isPercentage} textLabel={textLabel}>
        {Array.from({ length: maxBarsNum }, (_, i) => {
          const barStyle = {
            filter: `drop-shadow(1mm ${isStacked ? '0' : '1mm'} 0 ${tinycolor(COLORS[i]).darken().toString()})`,
          };

          return (
            <Bar
              stackId={isStacked ? 'stack_1' : undefined}
              fill={COLORS[i]}
              dataKey={yLabels[i]}
              style={barStyle}
              isAnimationActive={false}
            >
              {data.map((barSeries) => {
                // remove empty entries from barSeries
                // e.g {'light':10,'fatal':0} -> {'light':10}
                const cleanSeries: any = {};
                for (const [key, value] of Object.entries(barSeries)) {
                  if (value !== 0) {
                    cleanSeries[key] = value;
                  }
                }

                const barsNumInCurrStack = Object.keys(cleanSeries).length - 1;

                if (!isStacked || barsNumInCurrStack <= 1) {
                  return <Cell radius={borderRadiusForCell.All} />;
                }

                // handle custom border radius
                const firstLabel = yLabels[0];
                const secondLabel = yLabels[1];
                let optionOne = !cleanSeries[firstLabel] ? yLabels[1] : yLabels[0];
                let optionTwo = !cleanSeries[firstLabel] ? yLabels[2] : yLabels[1];

                if (barsNumInCurrStack >= 3 || !cleanSeries[secondLabel]) {
                  optionOne = yLabels[0];
                  optionTwo = yLabels[2];
                }

                switch (yLabels[i]) {
                  case optionOne:
                    return <Cell radius={borderRadiusForCell.Bottom} />;
                  case optionTwo:
                    return <Cell radius={borderRadiusForCell.Top} />;
                  default:
                    return <Cell radius={borderRadiusForCell.None} />;
                }
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
