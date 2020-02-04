import 'leaflet-css';
import React, { FunctionComponent } from 'react';
import L from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';
// @ts-ignore
import HeatmapLayer from 'react-leaflet-heatmap-layer';

export const geojson = {
    data: [
        {
            "longitude": 34.9780568296871,
            "latitude": 32.4543458814189,
            "accident_severity": "קשה",
            "accident_timestamp": "2016-05-15 21:00:00"
        },
        {
            "longitude": 34.9618510776681,
            "latitude": 32.4494011939289,
            "accident_severity": "קשה",
            "accident_timestamp": "2015-01-02 06:45:00"
        },
        {
            "longitude": 34.968629300414,
            "latitude": 32.4520110942299,
            "accident_severity": "קשה",
            "accident_timestamp": "2014-09-12 09:45:00"
        },
        {
            "longitude": 34.9618510776681,
            "latitude": 32.4494011939289,
            "accident_severity": "קשה",
            "accident_timestamp": "2014-07-27 21:00:00"
        },
        {
            "longitude": 34.9865860704716,
            "latitude": 32.458914735012,
            "accident_severity": "קשה",
            "accident_timestamp": "2011-03-26 19:30:00"
        },
        {
            "longitude": 34.9865860704716,
            "latitude": 32.458914735012,
            "accident_severity": "קלה",
            "accident_timestamp": "2019-11-28 11:30:00"
        },
        {
            "longitude": 34.9618510776681,
            "latitude": 32.4494011939289,
            "accident_severity": "קלה",
            "accident_timestamp": "2019-10-31 19:45:00"
        },
        {
            "longitude": 34.9625415910224,
            "latitude": 32.4496820631224,
            "accident_severity": "קלה",
            "accident_timestamp": "2019-10-31 06:30:00"
        },
        {
            "longitude": 34.9865860704716,
            "latitude": 32.458914735012,
            "accident_severity": "קלה",
            "accident_timestamp": "2019-10-28 10:30:00"
        },
        {
            "longitude": 34.9618510776681,
            "latitude": 32.4494011939289,
            "accident_severity": "קלה",
            "accident_timestamp": "2019-06-22 12:00:00"
        }
    ],
};


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
            <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={geojson.data}
                longitudeExtractor={(m: any) => m.longitude}
                latitudeExtractor={(m: any) => m.latitude}
                intensityExtractor={(m: any) => parseFloat(m.latitude)}
            />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={marker} />
        </Map>
    );
};

export default LocationMap;
