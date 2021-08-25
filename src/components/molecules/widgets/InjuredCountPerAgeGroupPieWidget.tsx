import React, { FC } from 'react';
import { IWidgetInjuredCountPerAgeGroupPieData } from 'models/WidgetData';
import PieChartView from 'components/molecules/PieChartView';

interface IProps {
  data: IWidgetInjuredCountPerAgeGroupPieData;
}

const AGE_GROUP = 'age_group';
const COUNT = 'count';
const INNER_RADIUS = '30%';

const InjuredCountPerAgeGroupPieWidget: FC<IProps> = ({ data }) => {
  return <PieChartView data={data.items} xLabel={AGE_GROUP} yLabel={COUNT} innerRadius={INNER_RADIUS} />;
};

export default InjuredCountPerAgeGroupPieWidget;
