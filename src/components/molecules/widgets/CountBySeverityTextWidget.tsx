import React, { FC } from 'react';
import { IWidgetCountBySeverityTextDataBase } from 'models/WidgetData';
import TextView, { ISeverityFieldNames, ITextViewLabels } from 'components/molecules/TextView/TextView';

interface IProps {
  data: IWidgetCountBySeverityTextDataBase;
  segmentText: string;
  severityFieldNames: ISeverityFieldNames;
  labels: ITextViewLabels;
  large_numbers?: boolean;
}
const CountBySeverityTextWidget: FC<IProps> = ({ data, segmentText, severityFieldNames,
                                                 labels, large_numbers= false}) => {
  return <TextView data={data} segmentText={segmentText} severityFieldNames={severityFieldNames}
                   labels={labels} large_numbers={large_numbers} />;
};
export default CountBySeverityTextWidget;
