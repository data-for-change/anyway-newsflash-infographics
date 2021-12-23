import React, { FC } from 'react';
import { IWidgetMultiBarData } from 'models/WidgetData';
import { transformItems } from '../../../utils/barchart.utils';
import { MultiBarChart } from '../GenericBarChartView';

interface IProps {
  data: IWidgetMultiBarData;
}

const CountInjuredByYearBarWidget: FC<IProps> = ({ data }) => {
  const content = JSON.parse(JSON.stringify(data));
  const items = transformItems(content);

  const yLabels = Object.keys(items[0]);
  yLabels.splice(0, 1);

  return (
    <>
      <MultiBarChart
        isStacked={true}
        isPercentage={false}
        data={items}
        yLabels={yLabels}
        textLabel={content.text.title}
      />
    </>
  );
};
export default CountInjuredByYearBarWidget;
