import React, { FunctionComponent } from 'react'
import BarChartViewRechart from './BarChartViewRechart';
import { IWidgetAccidentsByYear } from '../../models/WidgetData'

const ACCIDENT_YEAR = 'accident_year'
const COUNT = 'count'
const TEXT = 'הנשב םיעוצפ תומכ';
interface IProps {
	data: IWidgetAccidentsByYear[]
}
const CountByYearBarWidget: FunctionComponent<IProps> = props => {
	return <BarChartViewRechart data={props.data} xLabel={ACCIDENT_YEAR} yLabel={COUNT} textLabel={TEXT} />
}
export default CountByYearBarWidget
