import React, { FC } from 'react';
import { Map } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import { uniquePoints } from '../../utils/utils';
import { IPoint } from '../../models/Point';
import AnywayMostSevereAccidentsMarker from '../atoms/AnywayMostSevereAccidentsMarker';
import { ClockPosition } from '../../utils/enum.utils';
import GoogleMapsLayer from './map/GoogleMapsLayer';
const INITIAL_ZOOM = parseInt(process.env.REACT_APP_DEFAULT_MAP_ZOOM!);
const WRAPPER_STYLES = { height: '100%', width: '100%' };
const DEFAULT_BOUNDS = [
  L.latLng(29.5, 34.22), // most possible south-west point
  L.latLng(33.271, 35.946), // most possible north-east point
];

interface IProps {
  items: IPoint[] | any;
  center?: { lat: number; lng: number };
}

const LocationMap: FC<IProps> = ({ items, center }) => {
  let markers = items.map((x: IPoint, i: number) => {
    if (x.latitude !== null && x.longitude !== null) {
      const tooltipOffset = i % 2 === 0 ? ClockPosition.RIGHT : ClockPosition.LEFT;
      return (
        <div key={i}>
          <AnywayMostSevereAccidentsMarker data={x} tooltipOffset={tooltipOffset} />
        </div>
      );
    }
    return null;
  });
  const bounds = getBounds(items);

  return (
    <Map center={center} bounds={bounds} zoom={INITIAL_ZOOM} style={WRAPPER_STYLES}>
      <GoogleMapsLayer />
      {markers}
    </Map>
  );
};

// get bounding box for collection of points
const getBounds = (items: IPoint[]) => {
  let bound: LatLng[] = DEFAULT_BOUNDS;
  let points = uniquePoints(items);
  if (points.length === 1) {
    // single point provided
    const p = points[0];
    bound = [L.latLng(p.latitude + 0.01, p.longitude + 0.01), L.latLng(p.latitude - 0.01, p.longitude - 0.01)];
  } else if (points.length > 1) {
    bound = points.map((p) => L.latLng(p.latitude, p.longitude));
  }

  return L.latLngBounds(bound);
};
export default LocationMap;
