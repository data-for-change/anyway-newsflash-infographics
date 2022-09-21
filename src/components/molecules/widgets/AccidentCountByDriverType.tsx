import React, { FC } from 'react';
import { IWidgetAccidentCountByDriverType } from 'models/WidgetData';
import PieChartView from 'components/molecules/PieChartView';

const DRIVER_TYPE = 'driver_type';
const COUNT = 'count';
const INNER_RADIUS = '40%';
const OUTER_RADIUS = '70%';
interface IProps {
  data: IWidgetAccidentCountByDriverType;
}

const AccidentCountByDriverType: FC<IProps> = ({ data }) => {
  return (
    <PieChartView
      data={data.items}
      xLabel={DRIVER_TYPE}
      yLabel={COUNT}
      outerRadius={OUTER_RADIUS}
      innerRadius={INNER_RADIUS}
    />
  );
};
export default AccidentCountByDriverType;
