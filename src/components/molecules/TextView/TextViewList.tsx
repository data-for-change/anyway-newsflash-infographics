import React from 'react';
import TextViewRecord from './TextViewRecord';
import { useTranslation } from 'react-i18next';


interface IProps {
  data: any;
}

const TextViewList: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <>
      {data.severity_fatal_count && (
        <TextViewRecord
          numOfAccidents={data.severity_fatal_count}
          severityDesc={t(`textView.fatal.${data.severity_fatal_count > 1 ? 'plural' : 'singular'}`)}
          imgSrc={'fatal'}
        />
      )}
      {data.severity_light_count && (
        <TextViewRecord
          numOfAccidents={data.severity_light_count}
          severityDesc={t(`textView.light.${data.severity_light_count > 1 ? 'plural' : 'singular'}`)}
          imgSrc={'light'}
        />
      )}
      {data.severity_severe_count && (
        <TextViewRecord
          numOfAccidents={data.severity_severe_count}
          severityDesc={t(`textView.severe.${data.severity_severe_count > 1 ? 'plural' : 'singular'}`)}
          imgSrc={'severe'}
        />
      )}
    </>
  );
};

export default TextViewList;
