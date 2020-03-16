import 'leaflet-css'
import React, { FunctionComponent } from 'react'
import L from 'leaflet'
import { Map, TileLayer } from 'react-leaflet'
import AnywayMarker from '../atoms/AnywayMarker'

// TODO: Move to init.service once it's merged.
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
const lIconSizes = { iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }
const iconSize = lIconSizes;


interface IProps {
    data: any[],
    marker: { lat: number; lng: number }
}

const INITIAL_ZOOM = 13
const WRAPPER_STYLES = { height: '100%', width: '100%' }

const LocationMap: FunctionComponent<IProps> = ({ data, marker }) => {
    let markers = data.map((x: any) => {
        if (x.latitude !== null && x.longitude !== null) {
           return <AnywayMarker markerdata={x} />
        }
        else return null;
    });
    return (
        <Map center={marker} zoom={INITIAL_ZOOM} style={WRAPPER_STYLES}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers}
        </Map>
    )
}

export default LocationMap
