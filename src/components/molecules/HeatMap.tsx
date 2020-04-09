import 'leaflet/dist/leaflet.css';
import React, { FunctionComponent } from 'react';
<<<<<<< HEAD
import { Map, Marker } from 'react-leaflet';
=======
import { Map, TileLayer } from 'react-leaflet';
>>>>>>> development
// @ts-ignore
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { IPoint } from '../../models/Point';
import L, { LatLng } from "leaflet";

import { makeStyles } from '@material-ui/core/styles';
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import {getAPIKey} from '../../utils/utils';

const INITIAL_ZOOM = 13;
const useStyles = makeStyles({
  wrapper: {
    height: '100%',
    width: '100%'
  },
} );
const DEFAULT_BOUNDS = [
  L.latLng(29.5, 34.22), // most possible south-west point
  L.latLng(33.271, 35.946), // most possible north-east point
];

interface IProps {
  data:  IPoint[]
  center?: {lat: number; lng: number}
}

const HeatMap: FunctionComponent<IProps> = ( {data, center} ) => {
  const classes = useStyles();
  const bounds = getBounds(data);

<<<<<<< HEAD
const INITIAL_ZOOM = 13;

const useStyles = makeStyles({
    wrapper: {
        height: '100%',
        width: '100%'
    },
});

const HeatMap: FunctionComponent<IProps> = ({ marker, data }) => {
    const classes = useStyles();
    return (
        <Map center={marker} zoom={INITIAL_ZOOM} className={classes.wrapper}>
            <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={data}
                longitudeExtractor={(m: any) => m.longitude}
                latitudeExtractor={(m: any) => m.latitude}
                intensityExtractor={(m: any) => parseFloat(m.latitude)}
            />
            <ReactLeafletGoogleLayer googleMapsLoaderConf= {{KEY:getAPIKey(), VERSION: '3.40.6'}} type='terrain'/>
            <Marker position={marker} />
        </Map>
=======
  return (
    <Map center={ center } bounds={ bounds } zoom={ INITIAL_ZOOM } className={ classes.wrapper }>
      <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={data}
        longitudeExtractor={(m: any) => m.longitude}
        latitudeExtractor={(m: any) => m.latitude}
        intensityExtractor={ ( m: any ) => parseFloat(m.latitude)}
      />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
>>>>>>> development
    );
};
const getBounds = ( data: IPoint[] ) => {
  let bound: LatLng[] = DEFAULT_BOUNDS;
  bound = data.map((p) => L.latLng(p.latitude, p.longitude));

  return L.latLngBounds(bound);
};

export default HeatMap;
