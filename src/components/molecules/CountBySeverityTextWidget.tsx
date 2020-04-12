import React, { FunctionComponent } from 'react'
import { IWidgetCountBySeverity } from '../../models/WidgetData'
import TextView from './TextView'

interface IProps {
	data: IWidgetCountBySeverity[]
}

const CountBySeveretyTextWidget: FunctionComponent<IProps> = ( props ) => {
  return (
    <TextView data={props.data} />
  );
};
export default CountBySeveretyTextWidget;
