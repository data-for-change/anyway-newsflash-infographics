import React, { FC } from 'react';
import PieChartView from './PieChartView';
import { IWidgetFatalAccidentsByTypeData } from '../../models/WidgetData';

const ACCIDENT_TYPE = 'desc';
const COUNT = 'count';

interface IProps {
  data: IWidgetFatalAccidentsByTypeData;
}
const FatalAccidentsSegmentationPieWidget: FC<IProps> = ({data}) => {
  return (
    <>
      <PieChartView data={data.items[0].chartData} xLabel={ACCIDENT_TYPE} yLabel={COUNT} />
      <span>{data.items[0].title}</span>
      <PieChartView data={data.items[1].chartData} xLabel={ACCIDENT_TYPE} yLabel={COUNT} />
      <span>{data.items[1].title}</span>
    </>
  );
};
export default FatalAccidentsSegmentationPieWidget;
