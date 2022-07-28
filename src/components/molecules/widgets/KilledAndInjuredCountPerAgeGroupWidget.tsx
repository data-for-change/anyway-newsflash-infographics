import React, { FC } from 'react';
import { IWidgetKilledAndInjuredCountPerAgeGroup } from 'models/WidgetData';
import { MultiBarChart } from '../GenericBarChart';
import { convertToBarSeries } from 'utils/barChart.utils';

interface IProps {
  data: IWidgetKilledAndInjuredCountPerAgeGroup;
}

const KilledAndInjuredCountPerAgeGroupWidget: FC<IProps> = ({ data }) => {
  const { items, text } = data;

  const multiBarSeries = convertToBarSeries(items, text.title);
  return (
    <MultiBarChart
      isStacked={false}
      isPercentage={false}
      data={multiBarSeries}
      textLabel={text.title}
      subtitle={text.subtitle}
    />
  );
};
export default KilledAndInjuredCountPerAgeGroupWidget;
