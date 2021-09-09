import React, { FC } from 'react';
import { MapContainer } from 'react-leaflet';
import { IPoint } from 'models/Point';
import L, { LatLng } from 'leaflet';
import 'leaflet.heat';
import { makeStyles } from '@material-ui/core/styles';
import { uniquePoints } from 'utils/utils';
import GoogleMapsLayer from './map/GoogleMapsLayer';
import MapViewControl from 'services/MapViewControl';
import HeatMapLayer from 'services/HeatMapLayer';

const INITIAL_ZOOM = parseInt(process.env.REACT_APP_DEFAULT_MAP_ZOOM!);
const useStyles = makeStyles({
  wrapper: {
    height: '100%',
    width: '100%',
  },
});
const DEFAULT_BOUNDS = [
  L.latLng(29.5, 34.22), // most possible south-west point
  L.latLng(33.271, 35.946), // most possible north-east point
];

interface IProps {
  data: IPoint[];
  center?: { lat: number; lng: number };
  sizeOptions?: number;
}

const HeatMap: FC<IProps> = ({ data, center, sizeOptions }) => {
  const classes = useStyles();
  const isDataValid = data && uniquePoints(data).length > 1;
  if (!isDataValid) {
    return null;
  }
  const bounds = getBounds(data);

  return (
    <MapContainer center={center} bounds={bounds} zoom={INITIAL_ZOOM} className={classes.wrapper}>
      <MapViewControl bounds={bounds} />
      <GoogleMapsLayer />
      <HeatMapLayer points={data} />
    </MapContainer>
  );
};
const getBounds = (data: IPoint[]) => {
  let bound: LatLng[] = DEFAULT_BOUNDS;
  bound = data.map((p) => L.latLng(p.latitude, p.longitude));

  return L.latLngBounds(bound);
};

export default HeatMap;
