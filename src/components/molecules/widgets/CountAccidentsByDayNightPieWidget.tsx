import React, { FC } from 'react';
import PieChartView from 'components/molecules/PieChartView';
import { IWidgetAccidentsByDayNightData } from 'models/WidgetData';

const ACCIDENT_TYPE = 'day_night';
const COUNT = 'count';
const OUTER_RADIUS = '70%';

interface IProps {
  data: IWidgetAccidentsByDayNightData;
}
const CountAccidentsByDayNightPieWidget: FC<IProps> = ({ data }) => {
  return <PieChartView data={data.items} outerRadius={OUTER_RADIUS} xLabel={ACCIDENT_TYPE} yLabel={COUNT} />;
};
export default CountAccidentsByDayNightPieWidget;
