import 'leaflet-css';
import React, { FunctionComponent } from 'react';
import L from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';
// @ts-ignore
import HeatmapLayer from 'react-leaflet-heatmap-layer';

export const geojson = {
  features: [
    {
        coordinates: [39.050619679238508, 55.664990339319459]
    },
    {
        coordinates: [36.804726580056425, 55.327391214040745]
    },
    {
        coordinates: [38.677575326793274, 55.767798037723409]
    },
    {
        coordinates: [38.764793791552123, 55.112493529690383]
    },
    {
        coordinates: [38.287461597995204, 54.758055728752645]
    }
  ]
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
            points={geojson.features}
            longitudeExtractor={(m:any) => m.coordinates[0]}
            latitudeExtractor={(m:any) => m.coordinates[1]}
            intensityExtractor={(m:any) => parseFloat(m.coordinates[1])}
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
