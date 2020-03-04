import React, { FunctionComponent } from 'react'
import { VictoryContainer, VictoryBar, VictoryChart, VictoryLabel } from 'victory'
import { IWidgetAccidentsByYear } from '../../models/WidgetData'
interface IProps {
	data: IWidgetAccidentsByYear[]
	xLabel: string
	yLabel: string
}
const BarChartView: FunctionComponent<IProps> = props => {
	const barChartViewStyle = { data: { fill: '#c43a31' } }

	return (
		<VictoryChart>
			<VictoryBar
				data={props.data}
				x={props.xLabel}
				y={props.yLabel}
				style={barChartViewStyle}
				// barRatio={10}
				// barWidth={30}
				// categories={props.categories}
				containerComponent={<VictoryContainer responsive={true} />}
				// labelComponent={<VictoryLabel textAnchor='start' />}
				alignment='start'
				// animate={{
				// 	duration: 2000,
				// 	onLoad: { duration: 1000 }
				// }}
			/>
		</VictoryChart>
	)
}
export default BarChartView
