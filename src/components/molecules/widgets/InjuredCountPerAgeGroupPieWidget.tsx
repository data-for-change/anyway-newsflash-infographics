import React, { FC } from 'react';
import { IWidgetInjuredCountPerAgeGroupPieData } from '../../../models/WidgetData';
import PieChartView from '../PieChartView';

interface IProps {
  data: IWidgetInjuredCountPerAgeGroupPieData;
}

const AGE_GROUP = 'age_group';
const COUNT = 'count';
const INNER_RADIUS = '30%';
//hardcoded data, data from API coming not per API document
const data = {
  items: [
    { age_group: '0 - 14', count: 14 },
    { age_group: '15 - 24', count: 58 },
    { age_group: '25 - 64', count: 106 },
    { age_group: '65+', count: 6 },
    { age_group: 'unknown', count: 6 },
  ],
};
const InjuredCountPerAgeGroupPieWidget: FC<IProps> = () => {
  return <PieChartView data={data.items} xLabel={AGE_GROUP} yLabel={COUNT} innerRadius={INNER_RADIUS} />;
};

export default InjuredCountPerAgeGroupPieWidget;
