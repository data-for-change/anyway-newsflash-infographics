import 'leaflet-css';
import React, { FunctionComponent } from 'react';
import L from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';

// TODO: Move to init.service once it's merged.
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

interface IProps {
    marker: { lat: number, lng: number }
}

const INITIAL_ZOOM = 13;
const WRAPPER_STYLES = { height: '100%', width: '100%' };

const LocationMap: FunctionComponent<IProps> = ({ marker }) => {
    return (
        <Map center={marker} zoom={INITIAL_ZOOM} style={WRAPPER_STYLES}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={marker} />
        </Map>
    );
};

export default LocationMap;
