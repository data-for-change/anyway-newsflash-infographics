import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../../models/WidgetData';
import TextView from '../TextView';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
  roadNumber: number;
}
const CountBySeverityTextWidget: FC<IProps> = ({ data, segmentText, roadNumber }) => {
  return <TextView data={data} segmentText={segmentText} roadNumber={roadNumber} />;
};
export default CountBySeverityTextWidget;
