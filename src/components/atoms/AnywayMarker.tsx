import 'leaflet-css'
import React, { FunctionComponent } from 'react'
import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import redMarker from '../../assets/marker-icon-2x-red.png'
import orangeMarker from '../../assets/marker-icon-2x-orange.png'
import yellowMarker from '../../assets/marker-icon-2x-yellow.png'
import shadoMarker from '../../assets/marker-shadow.png'

// TODO: Move to init.service once it's merged.
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
const lIconSizes = { iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }
const iconSize = lIconSizes;

const redIcon = new L.Icon({
    iconUrl: redMarker,
    shadowUrl: shadoMarker,
    iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
    iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
    popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
    shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
});

const orangeIcon = new L.Icon({
    iconUrl: orangeMarker,
    shadowUrl: shadoMarker,
    iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
    iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
    popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
    shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
});
const yellowIcon = new L.Icon({
    iconUrl: yellowMarker,
    shadowUrl: shadoMarker,
    iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
    iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
    popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
    shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
});


interface IProps {
    markerdata: any
}

const INITIAL_ZOOM = 13
const WRAPPER_STYLES = { height: '100%', width: '100%' }

const AnywayMarker: FunctionComponent<IProps> = ({ markerdata }) => {
    let lPoint: L.LatLng = new L.LatLng(markerdata.latitude, markerdata.longitude);
    let icon: L.Icon = setIconBySeverity(markerdata.accident_severity)
    return (
        <Marker key={`marker-${markerdata.accident_timestamp}`} position={lPoint} icon={icon}>
            {<Popup>
                <div >
                    <div>{markerdata.accident_timestamp}, {markerdata.accident_severity}</div>
                </div>
            </Popup>}
        </Marker>
    )
}
const setIconBySeverity = (severity: string) => {
    let res = null;
    switch (severity) {
        case ("קטלנית"):
            res = redIcon;
            break;
        case ("קשה"):
            res = orangeIcon;
            break;
        case ("קלה"):
            res = yellowIcon;
            break;
        default:
            res = yellowIcon;;
    }
    return res;
}

export default AnywayMarker
