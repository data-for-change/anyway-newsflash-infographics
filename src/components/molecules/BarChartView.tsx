import React, { FunctionComponent } from 'react'
import { ResponsiveContainer, BarChart, LabelList, XAxis, Label, Bar } from 'recharts'
import { position } from 'html2canvas/dist/types/css/property-descriptors/position'

interface IProps {
	data: Array<object>
	xLabel: string | number
  yLabel: string | number
  textLabel: string
}
const renderCustomizedLabel = (props:any) => {
  const { x, y, width, height, value } = props;

  return (
    <g transform={`translate(${x + width / 2},${(y+height)-2})`}>
      <text x={0} y={0} fill="black" textAnchor="end" transform="rotate(-90)" dominantBaseline="middle" >
        {value}
      </text>
    </g>
  );
};
const BarChartView: FunctionComponent<IProps> = ({data, xLabel, yLabel, textLabel}) => {

	return (
    <ResponsiveContainer width={'100%'} height={'90%'}>
      <BarChart data={data} margin={{ top: 20, bottom: 15 }}>
        <XAxis dataKey="none" tickLine={false} axisLine={false}>
          <Label value={textLabel} offset={1} position="bottom" />
        </XAxis>
        <Bar dataKey={yLabel} fill='#c43a31'>
          <LabelList dataKey={xLabel} content={renderCustomizedLabel} />
          <LabelList dataKey={yLabel} position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
export default BarChartView
