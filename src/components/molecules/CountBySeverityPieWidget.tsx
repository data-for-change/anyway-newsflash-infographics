import React from 'react';
import PieChartView from './PieChartView';
import { IWidgetCountBySeverity } from '../../models/WidgetData';

const ACCIDENT_SEVERITY = 'accident_severity';
const COUNT = 'count';

interface IProps {
  data: IWidgetCountBySeverity[];
}
const CountBySeverityPieWidget: React.FC<IProps> = (props) => {
  return <PieChartView data={props.data} xLabel={ACCIDENT_SEVERITY} yLabel={COUNT} />;
};
export default CountBySeverityPieWidget;
