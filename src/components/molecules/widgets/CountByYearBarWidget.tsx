import React, { FC } from 'react';
import { IWidgetMultiBarData } from 'models/WidgetData';
import { MultiBarChart } from '../GenericBarChart';
import { convertToBarSeries } from 'utils/barChart.utils';

interface IProps {
  data: IWidgetMultiBarData;
  barOptions: any;
}

const CountByYearBarWidget: FC<IProps> = ({ data, barOptions }) => {
  const { items, text } = data;
  const excludeList = barOptions ? Object.values(barOptions).map((include: any, index: number) => {
      if (include) {return null} else {return items[0].series[index].label_key}}) : []
  const multiBarSeries = convertToBarSeries(items, text.labels_map, excludeList);
  return <MultiBarChart isStacked={true} isPercentage={false} data={multiBarSeries} textLabel={text.title} />;
};
export default CountByYearBarWidget;
