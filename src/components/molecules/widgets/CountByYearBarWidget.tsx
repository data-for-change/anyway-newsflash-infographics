import React, { FC } from 'react';
import { IWidgetMultiBarData } from 'models/WidgetData';
import { MultiBarChart } from '../GenericBarChart';
import { createBarWidget } from 'utils/barChart.utils';

interface IProps {
  data: IWidgetMultiBarData;
  editorBarOptions: Record<number, boolean>;
}

const CountByYearBarWidget: FC<IProps> = ({ data, editorBarOptions }) => {
  const { text } = data;
  const multiBarSeries = createBarWidget(data, editorBarOptions)
  return <MultiBarChart isStacked={true} isPercentage={false} data={multiBarSeries} textLabel={text.title}
                        editorBarOptions={editorBarOptions} />;
};
export default CountByYearBarWidget;
