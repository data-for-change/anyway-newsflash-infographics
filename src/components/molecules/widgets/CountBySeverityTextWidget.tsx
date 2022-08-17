import React, { FC } from 'react';
import { IWidgetCountBySeverityTextDataBase } from 'models/WidgetData';
import TextView, { ISeverityFieldNames, ITextViewLabels } from 'components/molecules/TextView/TextView';

interface IProps {
  data: IWidgetCountBySeverityTextDataBase;
  segmentText: string;
  severityFieldNames: ISeverityFieldNames;
  labels: ITextViewLabels;
  isStreet: boolean;
  largeNumbers?: boolean;
}
const CountBySeverityTextWidget: FC<IProps> = ({ data, segmentText, severityFieldNames, labels,
                                                 isStreet,  largeNumbers= false }) => {
  return <TextView data={data} segmentText={segmentText} severityFieldNames={severityFieldNames} labels={labels}
                   isStreet={isStreet} largeNumbers={largeNumbers}/>;
};
export default CountBySeverityTextWidget;
