import React, { FC } from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import MapIcon from './MapIcon'

interface IProps {
  markerdata: any;
}

const AnywayMarker: FC<IProps> = ( { markerdata } ) => {
  const lPoint: L.LatLng = new L.LatLng(markerdata.latitude, markerdata.longitude);
  const icon: L.Icon = setIconBySeverity( markerdata.accident_severity );
  return (
    <Marker position={lPoint} icon={icon}>
      {
        <Popup>
          <div>
            {markerdata.accident_timestamp}, {markerdata.accident_severity}
          </div>
        </Popup>
      }
    </Marker>
  );
};
const setIconBySeverity = (severity: string) => {
  if (severity === 'קלה') return MapIcon.yellowMarker();
  else if (severity === 'קשה') return MapIcon.orangeMarker();
  // (severity === "קטלנית")
  else return MapIcon.redMarker();
};

export default AnywayMarker;
