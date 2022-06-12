import React, { FC } from 'react';
import BarChartView from 'components/molecules/BarChartView';
import { IWidgetInjuredByYearData, IWidgetMultiBarData } from 'models/WidgetData';
import { convertToBarSeries } from 'utils/barChart.utils';
import { MultiBarChart } from '../GenericBarChart';

const ACCIDENT_YEAR = 'accident_year';
const COUNT = 'count';

interface IProps {
  data: IWidgetMultiBarData;
}

const CountInjuredByYearBarWidget: FC<IProps> = ({ data }) => {
  const { items, text } = data;
  const multiBarSeries = convertToBarSeries(items, text.labels_map);
  return <MultiBarChart isStacked={true} isPercentage={false} data={multiBarSeries} textLabel={text.title} />;
};
export default CountInjuredByYearBarWidget;
