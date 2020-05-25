import React, { FC } from 'react';
import BarChartView from '../BarChartView';
import { IWidgetAccidentsByYearData } from '../../../models/WidgetData';

const ACCIDENT_YEAR = 'accident_year';
const COUNT = 'count';
const TEXT = 'כמות תאונות בשנה';

interface IProps {
  data: IWidgetAccidentsByYearData;
}

const CountByYearBarWidget: FC<IProps> = ({ data }) => {
  return <BarChartView data={data.items} xLabel={ACCIDENT_YEAR} yLabel={COUNT} textLabel={TEXT} />;
};
export default CountByYearBarWidget;
