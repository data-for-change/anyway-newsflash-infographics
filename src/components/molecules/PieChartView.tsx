import React, { FunctionComponent } from 'react'
import { VictoryPie, VictoryContainer } from 'victory'
import { IWidgetCountBySeverity } from '../../models/WidgetData'

interface IProps {
	data: IWidgetCountBySeverity[] | any
	xLabel: string
	yLabel: string | number
}

export const PieChartView: FunctionComponent<IProps> = props => {
	const pieChartViewStyle = {
		labels: {
			fontSize: 8,
			fill: 'black'
		}
	}

	return (
		<VictoryPie
			data={props.data}
			x={props.xLabel}
			y={props.yLabel}
			style={pieChartViewStyle}
			labelRadius={60}
			innerRadius={20}
			padding={50}
			width={200}
			height={200}
			colorScale='red'
			containerComponent={<VictoryContainer responsive={true} />}
		/>
	)
}
export default PieChartView
