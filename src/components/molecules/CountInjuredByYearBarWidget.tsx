import React, { FC } from 'react';
import BarChartView from './BarChartView';
import { IWidgetInjuredByYearData } from '../../models/WidgetData';

const ACCIDENT_YEAR = 'accident_year';
const COUNT = 'count';
const TEXT = 'כמות פצועים בשנה';

interface IProps {
  data: IWidgetInjuredByYearData;
}

const CountInjuredByYearBarWidget: FC<IProps> = ({ data }) => {
  return <BarChartView data={data.items} xLabel={ACCIDENT_YEAR} yLabel={COUNT} textLabel={TEXT} />;
};
export default CountInjuredByYearBarWidget;
