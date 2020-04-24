import React from 'react';
import { IWidgetCountBySeverity } from '../../models/WidgetData';
import TextView from './TextView';

interface IProps {
  data: IWidgetCountBySeverity[];
}

const CountBySeveretyTextWidget: React.FC<IProps> = (props) => {
  return <TextView data={props.data} />;
};
export default CountBySeveretyTextWidget;
