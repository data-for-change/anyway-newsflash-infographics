import React, { FC } from 'react';
import PieChartView from '../PieChartView';
import { IWidgetAccidentsByTypeData } from 'models/WidgetData';

const ACCIDENT_TYPE = 'accident_type';
const COUNT = 'count';

interface IProps {
  data: IWidgetAccidentsByTypeData;
}
const CountByTypePieWidget: FC<IProps> = ({data}) => {
  return <PieChartView data={data.items} xLabel={ACCIDENT_TYPE} yLabel={COUNT} />;
};
export default CountByTypePieWidget;
