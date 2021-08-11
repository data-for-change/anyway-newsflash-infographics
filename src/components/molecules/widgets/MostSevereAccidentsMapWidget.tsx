import React, { FC } from 'react';
import LocationMap from '../LocationMap';
import { IWidgetMostSevereAccidentsData } from 'models/WidgetData';
import { INITIAL_CENTER } from 'utils/utils';

interface IProps {
  data: IWidgetMostSevereAccidentsData;
  sizeOptions: number;
}
const MostSevereAccidentsMapWidget: FC<IProps> = ({ data, sizeOptions }) => {
  const { items } = data;
  return <LocationMap items={items} center={INITIAL_CENTER} sizeOptions={sizeOptions} />;
};
export default MostSevereAccidentsMapWidget;
