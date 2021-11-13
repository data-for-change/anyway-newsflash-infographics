import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar , Tooltip, Legend} from 'recharts';
import { roseColor, honeyColor, yellowColor, blackColor } from 'style';
import { Typography } from 'components/atoms';
import tinycolor from 'tinycolor2';


interface IProps {
  isStacked: boolean;
  numOfBars: number;
  data: Array<object>;
  isPercentage: boolean;
  yLabel: string;
  textLabel?: string;
  xLabels: string[];
  xNames: string[];
}


const CustomizedLabel =(props:any) =>{
  const { x, y, value, height,width, isPercentage } = props;
  const calculatedValue = isPercentage ? value+'%': value;
  return (
    <g>
      <text textAnchor="middle" x = {x + width / 2} y = {y + 20}>{height < 20 ? null : calculatedValue}</text>
    </g>
  )
}

const GenericBarChartView: FC<IProps> = ({ isStacked,numOfBars, xNames, xLabels, data,isPercentage,yLabel, textLabel }) => {
  const COLORS = [roseColor, honeyColor, yellowColor, blackColor]
  type radiusType = [number, number, number, number];
  const bottomSide:radiusType = [0,0,10,10];
  const topSide:radiusType = [10,10,0,0];
  const bothSides:radiusType = [10,10,10,10];
  const noRadius:radiusType = [0,0,0,0];

  function customRadiusByBarIndex(i:number) {
    switch (i) {
      case 0: return bottomSide;
      case (numOfBars - 1): return topSide;
      default: return noRadius;
    }
  }

  // Iterate all bars and styling per bar.
  const barElements = Array.from({ length: numOfBars}, (_, i) => {
    const barStyle = {filter: `drop-shadow(1mm ${isStacked ? '0' : '1mm'} 0 ${tinycolor(COLORS[i]).darken().toString()})`};
    let barRadius = bothSides;
    if(isStacked && numOfBars > 1) {
     barRadius = customRadiusByBarIndex(i);
    }

    return <Bar name={xNames[i]} stackId={isStacked ? "a": undefined} fill={COLORS[i]} dataKey={xLabels[i]} style={barStyle} isAnimationActive={false} radius={barRadius}  >
      <LabelList  content={<CustomizedLabel isPercentage={isPercentage} numOfBars={numOfBars}/>} dataKey={xLabels[i]}  />
    </Bar>
  })

  return (
    <>
      <ResponsiveContainer >
        <BarChart data={data}>
          <XAxis  angle={-7} interval={0} dataKey={yLabel} tickLine={false} axisLine={false} style={{ fill: blackColor }}/>
          <Tooltip/>
          <Legend verticalAlign="top" align="right" iconType="circle" />
          {barElements}
        </BarChart>
      </ResponsiveContainer>
      {textLabel && <Typography.Body3>{textLabel}</Typography.Body3>}
    </>
  );
};
export default GenericBarChartView;
