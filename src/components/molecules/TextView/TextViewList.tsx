import React from 'react';
import TextViewRecord from './TextViewRecord';
import TextViewRecordLargeNumbers from './TextViewRecordLargeNumbers';
import { useTranslation } from 'react-i18next';
import { ICountBySeverity, ITextViewLabels } from './TextView';

interface IProps {
  data: ICountBySeverity;
  labels: ITextViewLabels;
  large_numbers: boolean;
}

const TextViewList: React.FC<IProps> = ({ data, labels , large_numbers}) => {
  const { t } = useTranslation();
  const ViewRecord = large_numbers ? TextViewRecordLargeNumbers : TextViewRecord;
  return (
    <>
      {data.fatal > 0 && (
        <ViewRecord
          numOfAccidents={data.fatal}
          severityDesc={t(`textView.${labels.fatal}.${data.fatal > 1 ? 'plural' : 'singular'}`)}
          imgSrc={'fatal'}
        />
      )}
      {data.severe > 0 && (
        <ViewRecord
          numOfAccidents={data.severe}
          severityDesc={t(`textView.${labels.severe}.${data.severe > 1 ? 'plural' : 'singular'}`)}
          imgSrc={'severe'}
        />
      )}
      {data.light > 0 && (
        <ViewRecord
          isLast={true}
          numOfAccidents={data.light}
          severityDesc={t(`textView.${labels.light}.${data.light > 1 ? 'plural' : 'singular'}`)}
          imgSrc={'light'}
        />
      )}
    </>
  );
};

export default TextViewList;
