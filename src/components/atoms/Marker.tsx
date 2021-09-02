import React, { FC } from 'react';
import L from 'leaflet';
import { Marker as MapMarker, Popup } from 'react-leaflet';
import { MapIcon } from 'components/atoms';

interface IProps {
  markerdata: any;
}

const Marker: FC<IProps> = ({ markerdata }) => {
  const lPoint: L.LatLng = new L.LatLng(markerdata.latitude, markerdata.longitude);
  const icon: L.Icon = MapIcon.getIconBySeverity('standardIcon', markerdata.accident_severity);
  return (
    <MapMarker position={lPoint} icon={icon}>
      {
        <Popup>
          <div>
            {markerdata.accident_timestamp}, {markerdata.accident_severity}
          </div>
        </Popup>
      }
    </MapMarker>
  );
};

export default Marker;
