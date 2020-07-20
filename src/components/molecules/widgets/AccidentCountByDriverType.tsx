import React, { FC } from 'react';
import { IWidgetAccidentCountByDriverType } from '../../../models/WidgetData';
import PieChartView from '../PieChartView';
interface IProps {
  data: IWidgetAccidentCountByDriverType;
}
const DRIVER_TYPE = 'driver_type';
const COUNT = 'count';
const INNER_RADIUS = '30%';

const AccidentCountByDriverType: FC<IProps> = ({ data }) => {
  return <PieChartView data={data.items} xLabel={DRIVER_TYPE} yLabel={COUNT} innerRadius={INNER_RADIUS} />;
};
export default AccidentCountByDriverType;
