import React, { FC } from 'react';
import BarChartView from '../BarChartView';
import { IWidgetInjuredByYearData } from '../../../models/WidgetData';

const ACCIDENT_YEAR = 'accident_year';
const COUNT = 'count';

interface IProps {
  data: IWidgetInjuredByYearData;
}

const CountInjuredByYearBarWidget: FC<IProps> = ( { data } ) => {
  const { items, text } = data;
  return <BarChartView data={items} xLabel={ACCIDENT_YEAR} yLabel={COUNT} textLabel={text.title} />;
};
export default CountInjuredByYearBarWidget;
