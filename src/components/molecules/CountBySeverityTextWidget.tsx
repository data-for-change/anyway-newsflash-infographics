import React, { FC } from 'react';
import { WidgetCountBySeverityTextData } from '../../models/WidgetData';
import TextView from './TextView';

interface IProps {
  data: WidgetCountBySeverityTextData;
}
const CountBySeverityTextWidget: FC<IProps> = ({ data }) => {
  return <TextView data={data} />;
};
export default CountBySeverityTextWidget;
