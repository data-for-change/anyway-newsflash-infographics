import React from 'react';
import TextViewRecord from './TextViewRecord';
import { useTranslation } from 'react-i18next';
import { ICountBySeverity, ITextViewLabels } from './TextView';

interface IProps {
  data: ICountBySeverity;
  labels: ITextViewLabels
}

const TextViewList: React.FC<IProps> = ({ data, labels }) => {
  const { t } = useTranslation();
  return (
    <>
      {data.fatal && (
        <TextViewRecord
          numOfAccidents={data.fatal}
          severityDesc={t(`textView.${labels.fatal}.${data.fatal > 1 ? 'plural' : 'singular'}`)}
          imgSrc={'fatal'}
        />
      )}
      {data.severe && (
        <TextViewRecord
          numOfAccidents={data.severe}
          severityDesc={t(`textView.${labels.severe}.${data.severe > 1 ? 'plural' : 'singular'}`)}
          imgSrc={'severe'}
        />
      )}
      {data.light && (
        <TextViewRecord
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
