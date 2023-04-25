import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { MapContainer } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import { IPoint } from 'models/Point';
import { INITIAL_CENTER, INITIAL_ZOOM } from 'const/generalConst';
import { uniquePoints } from 'utils/map.utils';
import MapViewControl from 'services/MapViewControl';
import GoogleMapsLayer from './GoogleMapsLayer';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
  },
});

const DEFAULT_BOUNDS = [
  L.latLng(29.5, 34.22), // most possible south-west point
  L.latLng(33.271, 35.946), // most possible north-east point
];

interface IProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  data?: IPoint[];
}

const Map: FC<IProps> = ({ zoom = INITIAL_ZOOM, center = INITIAL_CENTER, data, children }) => {
  const classes = useStyles();

  const bounds = getBounds(data);

  return (
    <MapContainer zoom={zoom} center={center} className={classes.root}>
      <MapViewControl bounds={bounds} />
      <GoogleMapsLayer />
      {children}
    </MapContainer>
  );
};

const getBounds = (items: IPoint[] | undefined) => {
  let bound: LatLng[] = DEFAULT_BOUNDS;

  const points = items && uniquePoints(items);
  if (points && points?.length === 1) {
    // single point provided
    const p = points[0];
    bound = [L.latLng(p.latitude + 0.01, p.longitude + 0.01), L.latLng(p.latitude - 0.01, p.longitude - 0.01)];
  } else if (points && points?.length > 1) {
    bound = points.map((p) => L.latLng(p.latitude, p.longitude));
  }

  return L.latLngBounds(bound);
};

export default Map;
