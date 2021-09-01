import React, { FC } from 'react';
import BarChartView from 'components/molecules/BarChartView';
import { IWidgetAccidentsByHourBarData } from 'models/WidgetData';

const ACCIDENT_HOUR = 'accident_hour';
const COUNT = 'count';

interface IProps {
  data: IWidgetAccidentsByHourBarData;
}

const AccidentsCountByHourBarWidget: FC<IProps> = ({ data }) => {
  const { items, text } = data;
  return <BarChartView data={items} xLabel={ACCIDENT_HOUR} yLabel={COUNT} textLabel={text.title} />;
};
export default AccidentsCountByHourBarWidget;
