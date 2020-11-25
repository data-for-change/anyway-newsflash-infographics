import React, { FC } from 'react';
import LocationMap from '../LocationMap';
import { IWidgetMostSevereAccidentsData } from '../../../models/WidgetData';

const CENTER = { lat: 32.0853, lng: 34.7818 };
interface IProps {
  data: IWidgetMostSevereAccidentsData;
  layoutOptions?: any;
}
const MostSevereAccidentsMapWidget: FC<IProps> = ({ data, layoutOptions }) => {
  const { items } = data;
  return <LocationMap items={items} center={CENTER} layoutOptions={layoutOptions} />;
};
export default MostSevereAccidentsMapWidget;
