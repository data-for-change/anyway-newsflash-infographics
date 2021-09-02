import { FC } from 'react';
import { IPoint } from '../../models/Point';
import { MostSevereAccidentsMarker } from '../atoms';
import { ClockPosition } from '../../models/ClockPosition';
import Map from './map/Map';

interface IProps {
  items: IPoint[] | any;
}

const LocationMap: FC<IProps> = ({ items }) => {
  let markers = items.map((x: IPoint, i: number) => {
    if (x.latitude !== null && x.longitude !== null) {
      const tooltipOffset = i % 2 === 0 ? ClockPosition.RIGHT : ClockPosition.LEFT;
      return (
        <div key={i}>
          <MostSevereAccidentsMarker data={x} tooltipOffset={tooltipOffset} />
        </div>
      );
    }
    return null;
  });

  return <Map data={items}>{markers}</Map>;
};

export default LocationMap;
