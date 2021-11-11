import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar , Tooltip, Legend} from 'recharts';
import { roseColor, honeyColor, yellowColor } from 'style';
import { Typography } from 'components/atoms';
import tinycolor from 'tinycolor2';


interface IProps {
  isStacked: boolean;
  numOfBars: number;
  data: Array<object>;
  isPercentages: boolean;
  yLabel: string;
  textLabel?: string;
  xLabels: string[];
  xNames: string[];
}

const CustomizedLabelWithPercentages =(props:any) =>{
  const { x, y, value, height } = props;
  const calculatedY = height < 20 ? '90%' : y + 20;

  return (
    <g>
      <text  x={x+35} y={calculatedY}>{value}%</text>
    </g>
  )
}

const CustomizedLabel =(props:any) =>{
  const { x, y, value, height } = props;
  const calculatedValue = height < 20 ? null : value;
  const calculatedY = y + 20;

  return (
    <g>
      <text  x={x+50} y={calculatedY}>{calculatedValue}</text>
    </g>
  )
}

const GenericBarChartView: FC<IProps> = ({ isStacked,numOfBars, xNames, xLabels, data,isPercentages,yLabel, textLabel }) => {
  const COLORS = [roseColor, honeyColor, yellowColor]

  const barElements = Array.from({ length: numOfBars }, (_, i) => {
    const shadowColor = tinycolor(COLORS[i]).darken().toString();
    const bottomShadow = isStacked ? '0' : '1mm'
    const barStyle = {filter: `drop-shadow(1mm ${bottomShadow} 0 ${shadowColor})`};
    let radius: [number, number, number, number] = [0,0,0,0]

    if (i === 0) {radius = [0,0,10,10]}
    if (i === 2) {radius = [10,10,0,0]}
    if (!isStacked) {
      radius = i === 0 ?  [10,10,10,10] : [10,10,10,10]
    }

    return <Bar name={xNames[i]} stackId={isStacked ? "a": undefined} fill={COLORS[i]} dataKey={xLabels[i]} style={barStyle} isAnimationActive={false} radius={radius}  >
      <LabelList content={isPercentages ? <CustomizedLabelWithPercentages />:<CustomizedLabel />} dataKey={xLabels[i]} position="insideTop"  />
    </Bar>
  })

  return (
    <>
      <ResponsiveContainer >
        <BarChart data={data}>
          <XAxis angle={-10} interval={0} dataKey={yLabel} tickLine={false} axisLine={false} />
          <Tooltip/>
          <Legend verticalAlign="top" height={36} iconType="circle"/>
          {barElements}
        </BarChart>
      </ResponsiveContainer>
      {textLabel && <Typography.Body3>{textLabel}</Typography.Body3>}
    </>
  );
};
export default GenericBarChartView;
