import React, { FunctionComponent } from 'react'
import PieChartView from './PieChartView'
import { IWidgetAccidentsByType } from '../../models/WidgetData'

const ACCIDENT_TYPE = 'accident_type'
const COUNT = 'count'

interface IProps {
	data: IWidgetAccidentsByType[]
}
const CountByTypePieWidget: FunctionComponent<IProps> = props => {
	return <PieChartView data={props.data} xLabel={ACCIDENT_TYPE} yLabel={COUNT} />
}
export default CountByTypePieWidget
