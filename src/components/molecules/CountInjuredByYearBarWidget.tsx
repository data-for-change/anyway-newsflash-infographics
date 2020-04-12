import React, { FunctionComponent } from 'react'
import BarChartView from './BarChartView';
import { IWidgetInjuredByYear } from '../../models/WidgetData';

const ACCIDENT_YEAR = 'accident_year'
const COUNT = 'count'
const TEXT = 'הנשב םיעוצפ תומכ';

interface IProps {
	data: IWidgetInjuredByYear[]
}

const CountInjuredByYearBarWidget: FunctionComponent<IProps> = props => {
	return <BarChartView data={props.data} xLabel={ACCIDENT_YEAR} yLabel={COUNT} textLabel={TEXT} />
}
export default CountInjuredByYearBarWidget;
