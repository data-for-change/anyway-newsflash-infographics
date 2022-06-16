import React, { FC } from 'react';
import { IWidgetMultiBarData } from 'models/WidgetData';
import { convertToBarSeries } from 'utils/barChart.utils';
import { MultiBarChart } from '../GenericBarChart';


interface IProps {
  data: IWidgetMultiBarData;
}

const CountInjuredByYearBarWidget: FC<IProps> = ({ data }) => {
  const { items, text } = data;
  const multiBarSeries = convertToBarSeries(items, text.labels_map);
  return <MultiBarChart isStacked={true} isPercentage={false} data={multiBarSeries} textLabel={text.title} />;
};
export default CountInjuredByYearBarWidget;
