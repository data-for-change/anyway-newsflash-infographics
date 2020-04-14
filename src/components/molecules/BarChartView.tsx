import React, { FunctionComponent } from 'react'
import { ResponsiveContainer, BarChart, LabelList, XAxis, Label, Bar } from 'recharts'

interface IProps {
	data: Array<object>
	xLabel: string | number
  yLabel: string | number
  textLabel: string
}

const BarChartView: FunctionComponent<IProps> = ({data, xLabel, yLabel, textLabel}) => {

	return (
    <ResponsiveContainer width={'100%'} height={'90%'}>
      <BarChart data={data} margin={{ top: 20, bottom: 15 }}>
        <XAxis dataKey='none' tickLine={false} axisLine={false}>
          <Label value={textLabel} offset={1} position='bottom' />
        </XAxis>
        <Bar dataKey={yLabel} fill='#c43a31'>
          <LabelList dataKey={xLabel} angle={90} position='insideBottomLeft' />
          <LabelList dataKey={yLabel} position='top' />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
export default BarChartView
