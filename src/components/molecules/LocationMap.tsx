import React, { FunctionComponent } from 'react'
import { Map } from 'react-leaflet'
import L, {LatLng} from 'leaflet'
import 'leaflet/dist/leaflet.css';
import AnywayMarker from '../atoms/AnywayMarker'
import {uniquePoints} from '../../utils/utils';
import {IPoint} from '../../models/Point';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';


const INITIAL_ZOOM = 13;
const WRAPPER_STYLES = { height: '100%', width: '100%' };
const DEFAULT_BOUNDS = [
    L.latLng(29.50, 34.22),     // most possible south-west point
    L.latLng(33.271, 35.946),   // most possible north-east point
];

interface IProps {
    data: IPoint[],
    center?: { lat: number; lng: number }
}

const LocationMap: FunctionComponent<IProps> = ({ data, center }) => {
    let markers = data.map((x: IPoint, i:number) => {
        if (x.latitude !== null && x.longitude !== null) {
            return <AnywayMarker markerdata={x} key={i}/>
        }
        return null;
    });
    const bounds = getBounds(data);

    return (
        <Map center={center} bounds={bounds} zoom={INITIAL_ZOOM} style={WRAPPER_STYLES}>
          <ReactLeafletGoogleLayer googleMapsLoaderConf= {{KEY:'', VERSION: '3.40.6'}} type='terrain'/>

          {markers}
        </Map>
    )
};

// get bounding box for collection of points
const getBounds = (data: IPoint[]) => {
    let bound: LatLng[] = DEFAULT_BOUNDS;
    let points = uniquePoints(data);
    if (points.length === 1) {
        // single point provided
        const p = points[0];
        bound = [
            L.latLng(p.latitude + 0.01, p.longitude + 0.01),
            L.latLng(p.latitude - 0.01, p.longitude - 0.01)
        ]
    } else if (points.length > 1) {
        bound = points.map((p) =>  L.latLng(p.latitude, p.longitude))
    }

    return L.latLngBounds(bound)
};
export default LocationMap
