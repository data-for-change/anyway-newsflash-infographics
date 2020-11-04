import React, { FC, useCallback } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, PieLabelRenderProps } from 'recharts';
import { fontFamilyString } from '../../style';

const TEXT_RELATIVE_WIDTH = 0.8;
interface ILabelProps {
  customizedLabel: (props: any, fontSize?: string, usePercent?: boolean) => JSX.Element | null;
  labelFontSize?: string;
}

interface IProps {
  data: Array<object>;
  xLabel: string;
  yLabel: string;
  innerRadius?: string;
  outerRadius?: string;
  usePercent?: boolean;
  width?: string;
  labelProps?: ILabelProps;
}

// hardcoded colors, will be changed
//TODO CHANGE COLORS
const COLORS = ['#AE0721', '#818386', '#d90000', '#890505', '#6a6a6a'];
const RADIAN = Math.PI / 180;

export const renderCollisionCustomizedLabel = (props: any, fontSize = '100%', usePercent = false) => {
  const { percent, value, name, cx, cy, outerRadius, midAngle } = props;
  const labelText = usePercent ? `${Math.round(percent * 100)}%` : value;
  const sin = Math.sin(-RADIAN * midAngle); // if sin >= 0 label is on top half
  const cos = Math.cos(-RADIAN * midAngle);
  //adjustment to the label position inside the pie charts
  const ex = cx + outerRadius * 0.5 * cos + (cos >= 0 ? -1 : -1.5) * 20;
  const ey = cy + outerRadius * 0.4 * sin - 20;

  const collisionLabelStyle = {
    color: 'white',
    textAlign: 'center' as 'center',
    fontWeight: 'normal' as 'normal',
    fontSize: fontSize,
    height: '20%',
  };

  return (
    <g>
      {/*  for text wrapping in svg - use foreignObject make sure to give foreignObject height and width, or inner element
        will not be displayed https://stackoverflow.com/questions/4991171/auto-line-wrapping-in-svg-text*/}
      <foreignObject style={collisionLabelStyle} fill={'white'} x={ex} y={ey} width={outerRadius * TEXT_RELATIVE_WIDTH}>
        <p>{labelText}</p>
        <p>{name}</p>
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
  // const sx = cx + outerRadius * cos;
  // const sy = cy + outerRadius * sin;
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
  const renderLabelCount = useCallback(
    (props: PieLabelRenderProps) => labelProps.customizedLabel(props, labelProps.labelFontSize),
    [labelProps],
  );
  const renderLabelPercent = useCallback(
    (props: PieLabelRenderProps) => labelProps.customizedLabel(props, labelProps.labelFontSize, true),
    [labelProps],
  );
  return (
    <ResponsiveContainer width={width} height={'100%'}>
      <PieChart>
        <Pie
          data={data}
          dataKey={yLabel}
          nameKey={xLabel}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          minAngle={15}
          label={usePercent ? renderLabelPercent : renderLabelCount}
          labelLine={false}
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
