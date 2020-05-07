import React, { FC } from 'react';
import { IWidgetCountBySeverityData } from '../../models/WidgetData';
import TextView from './TextView';

interface IProps {
  data: IWidgetCountBySeverityData;
}

const CountBySeveretyTextWidget: FC<IProps> = ({ data }) => {
  return <TextView data={data} />;
};
export default CountBySeveretyTextWidget;
