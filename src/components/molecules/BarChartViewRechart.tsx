import React, { FunctionComponent } from 'react'
import { ResponsiveContainer, BarChart, LabelList, XAxis, Label, Bar } from 'recharts'
import { IWidgetAccidentsByYear } from '../../models/WidgetData'
interface IProps {
	data: IWidgetAccidentsByYear[]
	xLabel: string | number
  yLabel: string | number
  textLabel: string
}
const BarChartViewRechart: FunctionComponent<IProps> = props => {

	return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <BarChart data={props.data} margin={{top:10, bottom:15}}>
        <XAxis dataKey='none' tickLine={false} axisLine={false}>
          <Label value={props.textLabel} offset={1} position='bottom' />
        </XAxis>
        <Bar dataKey={props.yLabel} fill='#c43a31'>
          <LabelList dataKey={props.xLabel} angle={90} position='insideBottomLeft' />
          <LabelList dataKey={props.yLabel} position='top'  />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
export default BarChartViewRechart
