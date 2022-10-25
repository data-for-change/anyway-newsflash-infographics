import React, { FC } from 'react';
import { IWidgetMultiBarData } from 'models/WidgetData';
import { convertToBarSeries } from 'utils/barChart.utils';
import { MultiBarChart } from '../GenericBarChart';


interface IProps {
  data: IWidgetMultiBarData;
  barOptions: any;
}

const CountInjuredByYearBarWidget: FC<IProps> = ({ data, barOptions }) => {
  const { items, text } = data;
  const excludeList = barOptions ? Object.values(barOptions).map((include: any, index: number) => {
    if (include) {return null} else {return items[0].series[index].label_key}}) : []
  const multiBarSeries = convertToBarSeries(items, text.labels_map, excludeList);
  return <MultiBarChart isStacked={true} isPercentage={false} data={multiBarSeries} textLabel={text.title}
                        barOptions={barOptions} />;
};
export default CountInjuredByYearBarWidget;
