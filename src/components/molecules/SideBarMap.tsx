import { FC } from 'react';

import { IPoint } from 'models/Point';
import { Marker } from 'components/atoms';
import Map from './map/Map';


interface IProps {
  items: IPoint[];
}

const SideBarMap: FC<IProps> = ({ items }) => {

  return (
    <Map data={items}>
      {items[0] && <Marker markerdata={items[0]} />}
    </Map>
  );
};

export default SideBarMap;
