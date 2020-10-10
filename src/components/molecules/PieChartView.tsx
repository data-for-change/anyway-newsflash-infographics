import React, {FC, useCallback} from 'react';
import {ResponsiveContainer, PieChart, Pie, Cell, PieLabelRenderProps, LabelList, Label} from 'recharts';
import { fontFamilyString } from '../../style';

interface IProps {
  data: Array<object>;
  xLabel: string;
  yLabel: string;
  innerRadius?: string;
  outerRadius?: string;
  usePercent?: boolean;
  customizedLabel? : (props: any,usePercent?: boolean) => JSX.Element | null;
}
// hardcoded colors, will be changed
const COLORS = ['#b71c1c', '#647171', '#d90000', '#890505', '#6a6a6a'];
const RADIAN = Math.PI / 180;

export const renderCollisionCustomizedLabel = (props: any, usePercent = false) => {
  const { percent, value, name } = props;
  const labelText = usePercent ? `${Math.round(percent * 100)}%` : value;
  if ((name as string).includes('חזית')) {
    return (
      <g>
        <text
          x={usePercent ? '65%' : '60%'}
          y={'35%'}
          fill="black"
          textAnchor={'start'}
          dominantBaseline="central"
          fontFamily={fontFamilyString}
          fontSize={'250%'}
        >
          {labelText}
        </text>
      {/*  for text wrapping in svg - use foreignObject make sure to give foreignObject height and width, or inner element
        will not be displayed https://stackoverflow.com/questions/4991171/auto-line-wrapping-in-svg-text*/}
        <foreignObject style={{ fontSize: '100%' }} x={'30%'} y={'46%'} height={'30%'} width={'35%'}>
          {name}
        </foreignObject>
      </g>
    );
  } else {
    return null;
  }
};

 export const renderCustomizedLabel = (props: any, usePercent = false) => {
  const { cx, cy, midAngle, innerRadius, percent, outerRadius, value, name } = props;
  const labelText = usePercent ? `${Math.round(percent * 100)}%` : value;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const xCountLabel = cx + radius  * Math.cos(-midAngle * RADIAN);
  const yCountLabel = cy + radius * Math.sin(-midAngle * RADIAN);


  const textLabelStyle = {
    fontFamily: fontFamilyString,
    fontWeight: 700,
    fontSize: 0.3*radius,
    color:'white',
    textAlign: "center" as "center"
  };

  return (
    <g>
      <text
        x={xCountLabel}
        y={yCountLabel}
        fill="white"
        textAnchor={xCountLabel > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontFamily={fontFamilyString}
      >
        {`${labelText}\n${name}`}
      </text>
      {/* for text wrapping in svg - use foreignObject
      make sure to give foreignObject height and width, or inner element will not be displayed
      https://stackoverflow.com/questions/4991171/auto-line-wrapping-in-svg-text */}
      {/*<foreignObject  fill={'white'} dominantBaseline={'left'} textAnchor={xCountLabel > cx ? 'start' : 'end'}
                     x={xCountLabel/2}
                      y={yCountLabel} dy={'10%'} height={'20%'} width={'30%'}>
        <p style={textLabelStyle}>{name}</p>
      </foreignObject>*/}
    </g>
  );
};


export const PieChartView: FC<IProps> = ({ data, yLabel, xLabel, innerRadius,
                                           outerRadius = 90,usePercent ,
                                         customizedLabel =renderCustomizedLabel}) => {
  const renderLabelCount = useCallback((props: PieLabelRenderProps) => customizedLabel(props,),[]);
  const renderLabelPercent = useCallback((props: PieLabelRenderProps) => customizedLabel(props, true),[]);
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <PieChart>
        <Pie
          data={data}
          dataKey={yLabel}
          nameKey={xLabel}
          innerRadius={innerRadius}
          outerRadius={'80%'}
          minAngle={15}
          label={usePercent ? renderLabelPercent: renderLabelCount}
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
