import { styled } from '@mui/material/styles';
import L, { LatLng } from 'leaflet';
import { IPoint } from 'models/Point';
import { FC } from 'react';
import { MapContainer } from 'react-leaflet';
import MapViewControl from 'services/MapViewControl';
import { INITIAL_CENTER, INITIAL_ZOOM, uniquePoints } from 'utils/utils';
import GoogleMapsLayer from './GoogleMapsLayer';

const PREFIX = 'Map';

const classes = {
  root: `${PREFIX}-root`,
};

const StyledMapContainer = styled(MapContainer)({
  [`&.${classes.root}`]: {
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
  const bounds = getBounds(data);

  return (
    <StyledMapContainer zoom={zoom} className={classes.root}>
      <MapViewControl bounds={bounds} center={center} zoom={INITIAL_ZOOM} />
      <GoogleMapsLayer />
      {children}
    </StyledMapContainer>
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
