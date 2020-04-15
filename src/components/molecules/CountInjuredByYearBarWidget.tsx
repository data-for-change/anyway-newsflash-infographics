import React, { FunctionComponent } from 'react'
import BarChartView from './BarChartView';
import { IWidgetInjuredByYear } from '../../models/WidgetData';
import { rightToLeftText } from '../../utils/utils';

const ACCIDENT_YEAR = 'accident_year'
const COUNT = 'count'
const TEXT = rightToLeftText( 'כמות פצעוים בשנה');

interface IProps {
	data: IWidgetInjuredByYear[]
}

const CountInjuredByYearBarWidget: FunctionComponent<IProps> = props => {
	return <BarChartView data={props.data} xLabel={ACCIDENT_YEAR} yLabel={COUNT} textLabel={TEXT} />
}
export default CountInjuredByYearBarWidget;
