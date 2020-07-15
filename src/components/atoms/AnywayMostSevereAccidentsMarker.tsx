import React, { FC, useState } from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import MapIcon from '../atoms/AnywayMapIcon';
import TooltipMarker, { TooltipOffset } from './TooltipMarker';

interface IProps {
  data: any;
  tooltipOffset: TooltipOffset;
}

const AnywayMostSevereAccidentsMarker: FC<IProps> = ({ data, tooltipOffset = TooltipOffset.LEFT }) => {
  const [offset, setOffset] = useState(tooltipOffset);
  const { latitude, longitude, accident_severity, accident_timestamp } = data;
  const position: L.LatLng = new L.LatLng(latitude, longitude);

  const icon: L.Icon = MapIcon.getIconBySeverity('carIcon', data.accident_severity);
  const isValid = accident_timestamp && accident_severity;
  return !isValid ? null : (
    <>
      <TooltipMarker data={data} position={position} offset={offset} />
      <Marker icon={icon} position={position}>
        {
          <Popup>
            <div>Tooltip Location</div>
            <button onClick={setOffset.bind(null, TooltipOffset.RIGHT)}>🠖</button>
            <button onClick={setOffset.bind(null, TooltipOffset.LEFT)}>🠔</button>
            {/* <button>🠕</button> */}
            {/* <button>🠗</button> */}
          </Popup>
        }
      </Marker>
    </>
  );
};

export default AnywayMostSevereAccidentsMarker;
