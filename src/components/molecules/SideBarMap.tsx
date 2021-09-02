import { FC } from 'react';

import { IPoint } from '../../models/Point';
import { Marker } from '../atoms';
import Map from './map/Map';


interface IProps {
  items: IPoint[];
}

const SideBarMap: FC<IProps> = ({ items }) => {

  return (
    <Map data={items}>
      <Marker markerdata={items[0]} />
    </Map>
  );
};

export default SideBarMap;
