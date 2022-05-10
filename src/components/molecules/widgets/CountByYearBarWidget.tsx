import React, { FC } from 'react';
import { IWidgetMultiBarData } from 'models/WidgetData';
import { BarDataMap, MultiBarChart } from '../GenericBarChart';
import { convertToBarSeries } from 'utils/barChart.utils';


interface IProps {
  data: IWidgetMultiBarData;
}

const CountByYearBarWidget: FC<IProps> = ({ data }) => {
  const { items, text } = data;
  const multiBarSeries : Array<BarDataMap> = convertToBarSeries(items, text.labels_map)
  return <MultiBarChart isStacked={true} isPercentage={false} data={multiBarSeries} textLabel={text.title} />;
};
export default CountByYearBarWidget;
