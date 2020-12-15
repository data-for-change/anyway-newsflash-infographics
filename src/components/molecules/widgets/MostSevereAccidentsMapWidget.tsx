import React, { FC } from 'react';
import LocationMap from '../LocationMap';
import { IWidgetMostSevereAccidentsData } from '../../../models/WidgetData';

const CENTER = { lat: 32.0853, lng: 34.7818 };
interface IProps {
  data: IWidgetMostSevereAccidentsData;
  sizeOptions?: any;
}
const MostSevereAccidentsMapWidget: FC<IProps> = ({ data, sizeOptions }) => {
  const { items } = data;
  return <LocationMap items={items} center={CENTER} sizeOptions={sizeOptions} />;
};
export default MostSevereAccidentsMapWidget;
