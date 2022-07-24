import React, { FC } from 'react';
import { IWidgetCountBySeverityTextDataBase } from 'models/WidgetData';
import TextView, { ISeverityFieldNames, ITextViewLabels } from 'components/molecules/TextView/TextView';

interface IProps {
  data: IWidgetCountBySeverityTextDataBase;
  segmentText: string;
  severityFieldNames: ISeverityFieldNames;
  labels: ITextViewLabels;
  isStreet: boolean;
}
const CountBySeverityTextWidget: FC<IProps> = ({ data, segmentText, severityFieldNames, labels,
                                                 isStreet }) => {
  return <TextView data={data} segmentText={segmentText} severityFieldNames={severityFieldNames} labels={labels}
                   isStreet={isStreet} />;
};
export default CountBySeverityTextWidget;
