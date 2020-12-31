import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../../models/WidgetData';
import TextView from '../TextView/TextView';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
}
const CountBySeverityTextWidget: FC<IProps> = ({ data, segmentText }) => {
  return <TextView data={data} segmentText={segmentText} />;
};
export default CountBySeverityTextWidget;
