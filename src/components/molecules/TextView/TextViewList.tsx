import React from 'react';
import TextViewRecord from './TextViewRecord';
import { useTranslation } from 'react-i18next';
import { CountBySeverity } from './TextView';

interface IProps {
  data: CountBySeverity;
}

const TextViewList: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <>
      {data.fatal > 0 && (
        <TextViewRecord
          numOfAccidents={data.fatal}
          severityDesc={t(`textView.fatal.${data.fatal > 1 ? 'plural' : 'singular'}`)}
          imgSrc={'fatal'}
        />
      )}
      {data.severe > 0 && (
        <TextViewRecord
          numOfAccidents={data.severe}
          severityDesc={t(`textView.severe.${data.severe > 1 ? 'plural' : 'singular'}`)}
          imgSrc={'severe'}
        />
      )}
      {data.light > 0 && (
        <TextViewRecord
          isLast={true}
          numOfAccidents={data.light}
          severityDesc={t(`textView.light.${data.light > 1 ? 'plural' : 'singular'}`)}
          imgSrc={'light'}
        />
      )}
    </>
  );
};

export default TextViewList;
