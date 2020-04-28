import React, { FC } from 'react';
import BarChartView from './BarChartView';
import { IWidgetAccidentsByYear } from '../../models/WidgetData';

const ACCIDENT_YEAR = 'accident_year';
const COUNT = 'count';
const TEXT = 'כמות תאונות בשנה';

interface IProps {
  data: IWidgetAccidentsByYear[];
}

const CountByYearBarWidget: FC<IProps> = (props) => {
  return <BarChartView data={props.data} xLabel={ACCIDENT_YEAR} yLabel={COUNT} textLabel={TEXT} />;
};
export default CountByYearBarWidget;
