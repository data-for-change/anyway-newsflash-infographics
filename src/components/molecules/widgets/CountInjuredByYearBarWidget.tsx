import React, { FC } from 'react';
import { IWidgetMultiBarData } from 'models/WidgetData';
import { createBarWidget } from 'utils/barChart.utils';
import { MultiBarChart } from '../GenericBarChart';


interface IProps {
  data: IWidgetMultiBarData;
  editorBarOptions: Record<number, boolean>;
}

const CountInjuredByYearBarWidget: FC<IProps> = ({ data, editorBarOptions }) => {
  const { text } = data;
  const multiBarSeries = createBarWidget(data, editorBarOptions);
  return <MultiBarChart isStacked={true} isPercentage={false} data={multiBarSeries} textLabel={text.title}
                        editorBarOptions={editorBarOptions} />;
};
export default CountInjuredByYearBarWidget;
