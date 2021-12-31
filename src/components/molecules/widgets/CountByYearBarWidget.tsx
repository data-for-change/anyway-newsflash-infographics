import React, { FC } from 'react';
import { IWidgetMultiBarData } from 'models/WidgetData';
import { MultiBarChart } from '../GenericBarChartView';
import { useTranslation } from 'react-i18next';
import { transformItems } from '../../../utils/barchart.utils';

interface IProps {
  data: IWidgetMultiBarData;
}

const CountByYearBarWidget: FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  const content = JSON.parse(JSON.stringify(data));

  const items = transformItems(content);

  return <MultiBarChart isStacked={true} isPercentage={false} data={items} textLabel={content.text.title} />;
};
export default CountByYearBarWidget;
