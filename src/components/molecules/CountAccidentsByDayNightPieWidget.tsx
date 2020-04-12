import React, { FunctionComponent } from 'react'
import PieChartView from './PieChartView'
import { IWidgetAccidentsByDayNight } from '../../models/WidgetData';

const ACCIDENT_TYPE = 'day_night'
const COUNT = 'count'

interface IProps {
	data: IWidgetAccidentsByDayNight[]
}
const CountAccidentsByDayNightPieWidget: FunctionComponent<IProps> = props => {
	return <PieChartView data={props.data} xLabel={ACCIDENT_TYPE} yLabel={COUNT} />
}
export default CountAccidentsByDayNightPieWidget
