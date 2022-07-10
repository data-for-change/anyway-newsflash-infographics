import React, { FC } from 'react';
import { IWidgetKilledAndInjuredCountPerAgeGroup } from 'models/WidgetData';
import { MultiBarChart } from '../GenericBarChart';

interface IProps {
  data: IWidgetKilledAndInjuredCountPerAgeGroup;
}

const KilledAndInjuredCountPerAgeGroupWidget: FC<IProps> = ({ data }) => {
  const { items, text } = data;
  console.log(data.items);

  console.log('aaa');
  const newArr = data.items.map((item) => {
    console.log(item.label_key);
    console.log(item.value);
  });

  return <MultiBarChart isStacked={false} isPercentage={false} data={items} textLabel={text.title} />;
};
export default KilledAndInjuredCountPerAgeGroupWidget;
