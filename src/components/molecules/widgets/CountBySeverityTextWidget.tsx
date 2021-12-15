import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from 'models/WidgetData';
import TextView from 'components/molecules/TextView/TextView';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
}
const CountBySeverityTextWidget: FC<IProps> = ({ data, segmentText }) => {
  console.log(data)
  console.log(segmentText)
  return <TextView data={data} segmentText={segmentText} />;
};
export default CountBySeverityTextWidget;
