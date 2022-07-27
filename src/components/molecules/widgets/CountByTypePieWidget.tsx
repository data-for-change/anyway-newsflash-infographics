import React, { FC } from 'react';
import PieChartView from 'components/molecules/PieChartView';
import { IWidgetAccidentsByTypeData } from 'models/WidgetData';

const ACCIDENT_TYPE = 'accident_type';
const COUNT = 'count';
const OUTER_RADIUS = '70%';

interface IProps {
  data: IWidgetAccidentsByTypeData;
}
const CountByTypePieWidget: FC<IProps> = ({ data }) => {
  return <PieChartView data={data.items} outerRadius={OUTER_RADIUS} xLabel={ACCIDENT_TYPE} yLabel={COUNT} />;
};
export default CountByTypePieWidget;
