import React, { FC } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import red from '@material-ui/core/colors/red';

interface IProps {
	data: Array<object>
	xLabel: string
	yLabel: string | number
}
// hardcoded colors, will be changed
const COLORS = [ red[ 100 ], red[ 200 ], red[ 300 ], red[ 400 ], red[ 500 ], red[ 600 ], red[ 700 ], red[ 800 ], red[ 900 ] ];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ( props: any ) => {
	const { cx, cy, midAngle, innerRadius, outerRadius, value, fill } = props
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
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} fill='black' textAnchor={'middle'} dominantBaseline='central'>{value}</text>
		</g>
	);
};
export const PieChartView: FC<IProps> = ( { data, yLabel, xLabel } ) => {

	return (
		<ResponsiveContainer width={'100%'} height={'100%'}>
			<PieChart>
				<Pie
				data={data}
				dataKey={yLabel}
				nameKey={xLabel}
				cx='50%'
				cy='50%'
				outerRadius={90}
				fill='#c43a31'
				minAngle={20}
				label={renderCustomizedLabel}
				labelLine={false}
				>
					{data.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
  );
}
export default PieChartView
