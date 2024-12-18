import React, { FC } from 'react';
import { IWidgetAccidentCountByRoadLight } from 'models/WidgetData';
import PieChartView from 'components/molecules/PieChartView';

const ROAD_LIGHT = 'road_light';
const COUNT = 'count';
const INNER_RADIUS = '40%';
const OUTER_RADIUS = '70%';
interface IProps {
  data: IWidgetAccidentCountByRoadLight;
}

const AccidentCountByRoadLight: FC<IProps> = ({ data }) => {
  return (
    <PieChartView
      data={data.items}
      xLabel={ROAD_LIGHT}
      yLabel={COUNT}
      outerRadius={OUTER_RADIUS}
      innerRadius={INNER_RADIUS}
    />
  );
};
export default AccidentCountByRoadLight;