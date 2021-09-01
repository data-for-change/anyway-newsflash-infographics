import React, { FC } from 'react';
import PieChartView from 'components/molecules/PieChartView';
import { IWidgetCountBySeverityData } from 'models/WidgetData';

const ACCIDENT_SEVERITY = 'accident_severity';
const COUNT = 'count';

interface IProps {
  data: IWidgetCountBySeverityData;
}
const CountBySeverityPieWidget: FC<IProps> = ({ data }) => {
  return <PieChartView data={data.items} xLabel={ACCIDENT_SEVERITY} yLabel={COUNT} />;
};
export default CountBySeverityPieWidget;
