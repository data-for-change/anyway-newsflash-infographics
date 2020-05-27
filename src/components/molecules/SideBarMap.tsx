import React, { FC } from 'react';
import { Map } from 'react-leaflet';
// @ts-ignore
import { IPoint } from '../../models/Point';
import L, { LatLng } from 'leaflet';

import { makeStyles } from '@material-ui/core/styles';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { getAPIKey, uniquePoints } from '../../utils/utils';
import AnywayMarker from '../atoms/AnywayMarker';

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
  items: IPoint[];
}

const SideBarMap: FC<IProps> = ({  items }) => {
  const classes = useStyles();

  const isDataValid = items[0] && uniquePoints(items).length === 1;
  if (!isDataValid) {
    return null;
  }
  const bounds = getBounds(items);

  return (
    <Map  bounds={bounds} zoom={INITIAL_ZOOM} className={classes.wrapper}>
        <ReactLeafletGoogleLayer googleMapsLoaderConf={{ KEY: getAPIKey(), VERSION: '3.40.6' }} type="terrain" />
        <AnywayMarker markerdata={ items[0] }/>
    </Map>
  );
};
const getBounds = ( items: IPoint[] ) => {
    let bound: LatLng[] = DEFAULT_BOUNDS;
    const p = items[0];
    bound = [L.latLng(p.latitude + 0.01, p.longitude + 0.01), L.latLng(p.latitude - 0.01, p.longitude - 0.01)];

  return L.latLngBounds(bound);
};

export default SideBarMap;
