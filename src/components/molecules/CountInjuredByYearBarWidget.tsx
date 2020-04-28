import React, { FC } from 'react';
import BarChartView from './BarChartView';
import { IWidgetInjuredByYear } from '../../models/WidgetData';

const ACCIDENT_YEAR = 'accident_year';
const COUNT = 'count';
const TEXT = 'כמות פצועים בשנה';

interface IProps {
  data: IWidgetInjuredByYear[];
}

const CountInjuredByYearBarWidget: FC<IProps> = (props) => {
  return <BarChartView data={props.data} xLabel={ACCIDENT_YEAR} yLabel={COUNT} textLabel={TEXT} />;
};
export default CountInjuredByYearBarWidget;
