import React, { FunctionComponent } from 'react'
import BarChartView from './BarChartView';
import { IWidgetAccidentsByYear } from '../../models/WidgetData'
import { rightToLeftText } from '../../utils/utils';

const ACCIDENT_YEAR = 'accident_year'
const COUNT = 'count'
const TEXT = rightToLeftText('כמות תאונות בשנה');

interface IProps {
	data: IWidgetAccidentsByYear[]
}

const CountByYearBarWidget: FunctionComponent<IProps> = props => {
	return <BarChartView data={props.data} xLabel={ACCIDENT_YEAR} yLabel={COUNT} textLabel={TEXT} />
}
export default CountByYearBarWidget
