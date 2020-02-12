import React, { FunctionComponent } from 'react'
import BarChartView from './BarChartView'
import { IWidgetAccidentsByYear } from '../../models/WidgetData'

interface IProps {
	data: IWidgetAccidentsByYear[]
}
const CountByYearBarWidget: FunctionComponent<IProps> = props => {
	const x = 'accident_year'
	const y = 'count'
	// const array = props.data.map(labelName => labelName)
	return (
		<>
			<BarChartView
				data={props.data}
				x={x}
				y={y}
				// categories={{ x: ['ap', 'op'], y: ['12', '13'] }}
			/>
		</>
	)
}
export default CountByYearBarWidget
