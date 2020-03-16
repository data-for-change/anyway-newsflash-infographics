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
    const bounds = setBounds(data)

    return (
        <Map center={marker} bounds={bounds} zoom={INITIAL_ZOOM} style={WRAPPER_STYLES}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers}
        </Map>
    )
}
const setBounds = (data: any[]) => {
    var bounds;
    var corner1 = L.latLng(29.50, 34.22)
    var corner2 = L.latLng(33.271, 35.946)
    var arr:L.LatLng[] = [];
    var lastPoint:L.LatLng = L.latLng(0,0) ;
    data.forEach(x => {
        if (x.latitude !== null && x.longitude !== null) {
            let p = new L.LatLng(x.latitude, x.longitude);
            if ((lastPoint.lat ==0 && lastPoint.lng ==0 ) || x.latitude != lastPoint.lat || x.longitude != lastPoint.lng)
            {
                arr.push(p)
                //prevent insertion of dupliacte same point
                lastPoint =  p;
            }
        }
    });
    //bounds for single point
    if (arr.length == 1){
        arr=[];
        arr.push( L.latLng(lastPoint.lat+0.01, lastPoint.lng +0.01))
        arr.push( L.latLng(lastPoint.lat-0.01, lastPoint.lng -0.01))
    }
    if (arr.length < 2)
        arr= [corner1, corner2];
    bounds = L.latLngBounds(arr)    
    return bounds;
}
export default LocationMap
