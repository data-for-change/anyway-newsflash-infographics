import React, { FC } from 'react';
import { IWidgetMultiBarData } from 'models/WidgetData';
import { createBarWidget } from 'utils/barChart.utils';
import { MultiBarChart } from '../GenericBarChart';


interface IProps {
  data: IWidgetMultiBarData;
  barOptions: Record<number, boolean>;
}

const CountInjuredByYearBarWidget: FC<IProps> = ({ data, barOptions }) => {
  const { text } = data;
  const multiBarSeries = createBarWidget(data, barOptions);
  return <MultiBarChart isStacked={true} isPercentage={false} data={multiBarSeries} textLabel={text.title}
                        barOptions={barOptions} />;
};
export default CountInjuredByYearBarWidget;
