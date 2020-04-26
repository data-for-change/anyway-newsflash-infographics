import React, { FC } from 'react';
import { Map } from 'react-leaflet';
// @ts-ignore
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { IPoint } from '../../models/Point';
import L, { LatLng } from 'leaflet';

import { makeStyles } from '@material-ui/core/styles';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { getAPIKey, uniquePoints } from '../../utils/utils';

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
}

const HeatMap: FC<IProps> = ({ data, center }) => {
  const classes = useStyles();


  const isDataValid = data && uniquePoints(data).length > 1;
  if (!isDataValid) {
    return null;
  }
  const bounds = getBounds(data);

  return (
    <Map center={center} bounds={bounds} zoom={INITIAL_ZOOM} className={classes.wrapper}>
      <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={data}
        longitudeExtractor={(m: any) => m.longitude}
        latitudeExtractor={(m: any) => m.latitude}
        intensityExtractor={(m: any) => parseFloat(m.latitude)}
      />
      <ReactLeafletGoogleLayer googleMapsLoaderConf={{ KEY: getAPIKey(), VERSION: '3.40.6' }} type="terrain" />
    </Map>
  );
};
const getBounds = (data: IPoint[]) => {
  let bound: LatLng[] = DEFAULT_BOUNDS;
  bound = data.map((p) => L.latLng(p.latitude, p.longitude));

  return L.latLngBounds(bound);
};

export default HeatMap;
