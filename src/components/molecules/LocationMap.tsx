import React, { FC } from 'react';
import { IPoint } from 'models/Point';
import { MostSevereAccidentsMarker } from 'components/atoms';
import { ClockPosition } from 'models/ClockPosition';
import Map from './map/Map';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface IProps {
  items: IPoint[] | any;
  customHeightStyle?: CSSProperties;
}

const LocationMap: FC<IProps> = ({ items }) => {
  const markers = items.map((x: IPoint, i: number) => {
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
