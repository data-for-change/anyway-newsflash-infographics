import React, { FC, useCallback } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, PieLabelRenderProps } from 'recharts';
import { fontFamilyString, pieChartColors, whiteColor } from 'style';
import { makeStyles } from '@material-ui/core';

const TEXT_RELATIVE_WIDTH = 0.8;

interface ILabelProps {
  customizedLabel: (props: any, fontSize?: string, usePercent?: boolean, single?: boolean) => JSX.Element | null;
  labelFontSize?: string;
}

interface IProps {
  data: Array<any>;
  xLabel: string;
  yLabel: string;
  innerRadius?: string;
  outerRadius?: string;
  usePercent?: boolean;
  width?: string;
  labelProps?: ILabelProps;
}

const COLORS = pieChartColors;
const RADIAN = Math.PI / 180;
const PIE_SHADOW_ID = 'pie-shadow';
const useStyles = makeStyles({
  shadow: {
    filter: `url(#${PIE_SHADOW_ID})`,
  },
});

export const renderCollisionCustomizedLabel = (props: any, fontSize = '100%', usePercent = false, single = false) => {
  const { percent, value, name, cx, cy, outerRadius, midAngle } = props;
  const sin = Math.sin(-RADIAN * midAngle); // if sin >= 0 label is on top half
  const cos = Math.cos(-RADIAN * midAngle);
  const labelText = usePercent ? `${Math.round(percent * 100)}%` : value;

  const singleSliceLabelPosition = {
    x: cx - outerRadius / 2,
    y: cy - outerRadius / 2,
    height: outerRadius,
    width: outerRadius,
  };

  const sliceLabelPosition = {
    x: cx + outerRadius * 0.5 * cos + (cos >= 0 ? -1 : -1.5) * 20,
    y: cy + outerRadius * 0.4 * sin - 20,
    height: outerRadius * TEXT_RELATIVE_WIDTH,
    width: outerRadius * TEXT_RELATIVE_WIDTH,
  };

  const position = single ? singleSliceLabelPosition : sliceLabelPosition;

  const collisionLabelStyle = {
    color: whiteColor,
    textAlign: 'center' as 'center',
    fontWeight: 'normal' as 'normal',
    fontSize: fontSize,
  };

  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    height: '100%',
    justifyContent: 'center',
  };

  return (
    <g>
      {/*  for text wrapping in svg - use foreignObject make sure to give foreignObject height and width, or inner element
        will not be displayed https://stackoverflow.com/questions/4991171/auto-line-wrapping-in-svg-text*/}
      <foreignObject
        style={collisionLabelStyle}
        fill={'white'}
        x={Math.round(position.x)}
        y={Math.round(position.y)}
        height={position.height}
        width={position.width}
      >
        {labelText !== 0 && percent !== 0 ? (
          <div style={single ? wrapperStyle : undefined}>
            <p>{labelText}</p>
            <p>{name}</p>
          </div>
        ) : null}
      </foreignObject>
    </g>
  );
};

export const renderCustomizedLabel = (props: any, fontSize = '14', usePercent = false) => {
  const { cx, cy, midAngle, innerRadius, percent, outerRadius, value, name } = props;
  const labelText = usePercent ? `${Math.round(percent * 100)}%` : value;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  const xCountLabel = cx + radius * Math.cos(-midAngle * RADIAN);
  const yCountLabel = cy + radius * Math.sin(-midAngle * RADIAN);
  const sin = Math.sin(-RADIAN * midAngle); // if sin >= 0 label is on top half
  const cos = Math.cos(-RADIAN * midAngle); // if cos >= 0 label is on right half
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? -1 : -1.5) * 25;
  const ey = my + (sin >= 0 ? -2 : -1) * 10;

  const textLabelStyle = {
    fontFamily: fontFamilyString,
    fontWeight: 700,
    fontSize: fontSize,
    textAlign: 'center' as 'center',
  };

  return (
    <g>
      <text
        x={xCountLabel}
        y={yCountLabel}
        fill="black"
        textAnchor={xCountLabel > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontFamily={fontFamilyString}
      >
        {labelText}
      </text>
      {/* for text wrapping in svg - use foreignObject
      make sure to give foreignObject height and width, or inner element will not be displayed
      https://stackoverflow.com/questions/4991171/auto-line-wrapping-in-svg-text */}
      <foreignObject fontFamily={fontFamilyString} fontWeight={700} fontSize={14} x={ex} y={ey} height={76} width={60}>
        <div style={textLabelStyle}>{name}</div>
      </foreignObject>
    </g>
  );
};

export const PieChartView: FC<IProps> = ({
  width = '100%',
  data,
  yLabel,
  xLabel,
  innerRadius,
  outerRadius = 90,
  usePercent,
  labelProps = { customizedLabel: renderCustomizedLabel },
}) => {
  const renderLabel = useCallback(
    (props: PieLabelRenderProps) =>
      labelProps.customizedLabel(
        props,
        labelProps.labelFontSize,
        usePercent,
        data.some((items) => items[yLabel] === 0),
      ),
    [labelProps, usePercent, data, yLabel],
  );

  const classes = useStyles();
  return (
    <ResponsiveContainer width={width} height={'100%'}>
      <PieChart>
        <defs>
          <filter id={PIE_SHADOW_ID}>
            <feDropShadow dx="-3" dy="1" stdDeviation="2.5" floodOpacity="0.5" />
          </filter>
        </defs>
        <Pie
          data={data}
          dataKey={yLabel}
          nameKey={xLabel}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          label={renderLabel}
          labelLine={false}
          startAngle={-270}
          stroke="none"
          className={classes.shadow}
          isAnimationActive={false}
        >
          {data.map((entry: any, index: any) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
export default PieChartView;
