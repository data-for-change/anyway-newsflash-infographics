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
  const calculatedY = height < 20 ? '85%' : y + 20;

  return (
    <g>
      <text  x={x+35} y={calculatedY}>{value}%</text>
    </g>
  )
}

const CustomizedLabel =(props:any) =>{
  const { x, y, value, height } = props;
  const calculatedY = height < 20 ? '85%' : y + 20;

  return (
    <g>
      <text  x={x+35} y={calculatedY}>{value}</text>
    </g>
  )
}


const GenericBarChartView: FC<IProps> = ({ isStacked,numOfBars, xNames, xLabels, data,isPercentages,yLabel, textLabel }) => {
  const COLORS = [roseColor, honeyColor, yellowColor]


  const barElements = Array.from({ length: numOfBars }, (_, i) => {
    const shadowColor = tinycolor(COLORS[i]).darken().toString();
    const barStyle = {filter: `drop-shadow(1mm 0.7mm 0px ${shadowColor})`};
    let radius1 =0;
    let radius2 =0;
    let radius3 =0;
    let radius4 =0;

    if (i===0) {radius3 =10;radius4=10}
    if (i===0 && !isStacked) {radius1 =10;radius2=10}
    if (i===1 && !isStacked) {radius1 =10;radius2=10;radius3 =10;radius4=10}
    if (i===2) {radius1 =10;radius2=10}

    return <Bar name={xNames[i]} stackId={isStacked ? "a": undefined} fill={COLORS[i]} dataKey={xLabels[i]} style={barStyle} isAnimationActive={false} radius={[radius1,radius2,radius3,radius4]}  >
      <LabelList content={isPercentages ? <CustomizedLabelWithPercentages />:<CustomizedLabel />} dataKey={xLabels[i]} position="insideTop"  />
    </Bar>
  })

  return (
    <>
      <ResponsiveContainer >
        <BarChart data={data}  >
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
