import React, { FunctionComponent } from 'react'
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import { IWidgetAccidentsByType, IWidgetCountBySeverity, IWidgetAccidentsByDayNight } from '../../models/WidgetData';
import { rightToLeftText } from '../../utils/utils'

interface IProps {
	data: IWidgetAccidentsByType[] | IWidgetCountBySeverity[] | IWidgetAccidentsByDayNight[]
	xLabel: string
	yLabel: string | number
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props:any) => {
	const { cx, cy, midAngle, innerRadius, outerRadius, value, fill, name } = props

	//temporary solution
	const hebrewName = rightToLeftText( name )

	const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  	const xCountLabel = cx + radius * Math.cos(-midAngle * RADIAN);
	const yCountLabel = cy + radius * Math.sin(-midAngle * RADIAN);
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius) * cos;
	const sy = cy + (outerRadius) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;

	return (
		<g>
			<path d={ `M${ sx },${ sy }L${ mx },${ my }L${ ex },${ ey }` } stroke={ fill } fill='none' />
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke='none'/>
			<text x={xCountLabel} y={yCountLabel} fill='black' textAnchor={xCountLabel > cx ? 'start' : 'end'} dominantBaseline='central'>{value}</text>
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} fill='black' textAnchor={'start'} dominantBaseline='central'>{hebrewName}</text>
		</g>
	);
};
export const PieChartView: FunctionComponent<IProps> = props => {

	return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <PieChart>
        <Pie
          data={props.data}
          dataKey={props.yLabel}
          nameKey={props.xLabel}
          cx='50%'
          cy='50%'
          outerRadius={90}
          fill='#c43a31'
          minAngle={20}
          label={renderCustomizedLabel}
          labelLine={false}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
export default PieChartView
