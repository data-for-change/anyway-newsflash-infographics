import React, { FunctionComponent } from 'react'
import PieChartViewRechart from './PieChartViewRechart'
import { IWidgetAccidentsByType } from '../../models/WidgetData'

const ACCIDENT_TYPE = 'accident_type'
const COUNT = 'count'

interface IProps {
	data: IWidgetAccidentsByType[]
}
const CountByTypePieWidget: FunctionComponent<IProps> = props => {
	return <PieChartViewRechart data={props.data} xLabel={ACCIDENT_TYPE} yLabel={COUNT} />
}
export default CountByTypePieWidget
