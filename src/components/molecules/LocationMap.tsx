import 'leaflet-css'
import React, { FunctionComponent } from 'react'
import L, {LatLng} from 'leaflet'
import { Map, TileLayer } from 'react-leaflet'
import AnywayMarker from '../atoms/AnywayMarker'
import {uniquePoints} from '../../utils/utils';
import {IPoint} from '../../models/Point';

// TODO: Move to init.service once it's merged.
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
interface IProps {
    data: any[],
    marker: { lat: number; lng: number }
}
const INITIAL_ZOOM = 13
const WRAPPER_STYLES = { height: '100%', width: '100%' }
const DEFAULT_BOUNDS = [
    L.latLng(29.50, 34.22),     // most possible south-west point
    L.latLng(33.271, 35.946),   // most possible north-east point
];

const LocationMap: FunctionComponent<IProps> = ({ data, marker }) => {
    let markers = data.map((x: IPoint, i:number) => {
        if (x.latitude !== null && x.longitude !== null) {
            return <AnywayMarker markerdata={x} key={i}/>
        }
        return null;
    });
    const bounds = getBounds(data);

    return (
        <Map center={marker} bounds={bounds} zoom={INITIAL_ZOOM} style={WRAPPER_STYLES}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
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
