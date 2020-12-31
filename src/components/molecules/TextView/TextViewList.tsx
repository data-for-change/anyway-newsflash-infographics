import React from 'react';
import TextViewRecord from './TextViewRecord';
import { useTranslation } from 'react-i18next';
import Person from '../../../assets/Person.png';
import Ambulance from '../../../assets/Ambulance.png';
import Crutches from '../../../assets/Crutches.png';

const imgMap: Map<string, string> = new Map();

imgMap.set('severity_severe_count', Ambulance);
imgMap.set('severity_light_count', Crutches);
imgMap.set('severity_fatal_count', Person);

interface IProps {
  data: any;
}

const TextViewList: React.FC<IProps> = ({ data }) => {
  const countArr = Object.entries<number>(data);
  const { t } = useTranslation();
  const records = countArr.map(([name, value]) => {
    const imgSrc: string | undefined = imgMap.get(name);
    return (
      <TextViewRecord
        numOfAccidents={value as number}
        severityDesc={t(`textView.${name}.${value > 1 ? 'plural' : 'singular'}`)}
        imgSrc={imgSrc ? imgSrc : ''}
      />
    );
  });
  return <>{records};</>;
};

export default TextViewList;
