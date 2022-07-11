import React, { FC } from 'react';
import { IWidgetKilledAndInjuredCountPerAgeGroup } from 'models/WidgetData';
import { MultiBarChart } from '../GenericBarChart';
import { convertItemsToBarSeries } from 'utils/barChart.utils';

interface IProps {
  data: IWidgetKilledAndInjuredCountPerAgeGroup;
}

const KilledAndInjuredCountPerAgeGroupWidget: FC<IProps> = ({ data }) => {
  const { items, text } = data;
  const multiBarSeries = convertItemsToBarSeries(items);
  return <MultiBarChart isStacked={false} isPercentage={false} data={multiBarSeries} textLabel={text.title} />;
};
export default KilledAndInjuredCountPerAgeGroupWidget;
