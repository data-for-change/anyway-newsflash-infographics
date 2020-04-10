import React, { FC } from 'react'
import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import redMarker from '../../assets/marker-icon-2x-red.png'
import orangeMarker from '../../assets/marker-icon-2x-orange.png'
import yellowMarker from '../../assets/marker-icon-2x-yellow.png'
import shadoMarker from '../../assets/marker-shadow.png'

interface IProps {
    markerdata: any
}
const L_ICON_SIZE = { iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }
const iconSize = L_ICON_SIZE;
const RED_ICON = new L.Icon({
    iconUrl: redMarker,
    shadowUrl: shadoMarker,
    iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
    iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
    popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
    shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
});
const ORANGE_ICON = new L.Icon({
    iconUrl: orangeMarker,
    shadowUrl: shadoMarker,
    iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
    iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
    popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
    shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
});
const YELLOW_ICON = new L.Icon({
    iconUrl: yellowMarker,
    shadowUrl: shadoMarker,
    iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
    iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
    popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
    shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
});

const AnywayMarker: FC<IProps> = ({ markerdata }) => {
    const lPoint: L.LatLng = new L.LatLng(markerdata.latitude, markerdata.longitude);
    const icon: L.Icon = setIconBySeverity(markerdata.accident_severity)
    return (
        <Marker key={`marker-${markerdata.accident_timestamp}`} position={lPoint} icon={icon}>
            {<Popup>
                <div>
                    <div>{markerdata.accident_timestamp}, {markerdata.accident_severity}</div>
                </div>
            </Popup>}
        </Marker>
    )
}
const setIconBySeverity = (severity: string) => {
    if (severity === "קלה")
        return YELLOW_ICON;
    else if (severity === "קשה")
        return ORANGE_ICON;
    else // (severity === "קטלנית")
        return RED_ICON;
}

export default AnywayMarker
