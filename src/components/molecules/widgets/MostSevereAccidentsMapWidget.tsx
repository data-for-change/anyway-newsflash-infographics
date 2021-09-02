import { FC } from 'react';
import LocationMap from '../LocationMap';
import { IWidgetMostSevereAccidentsData } from '../../../models/WidgetData';

interface IProps {
  data: IWidgetMostSevereAccidentsData;
  sizeOptions: number;
}
const MostSevereAccidentsMapWidget: FC<IProps> = ({ data, sizeOptions }) => {
  const { items } = data;
  return <LocationMap items={items} />;
};
export default MostSevereAccidentsMapWidget;
