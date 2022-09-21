import React from 'react';
import { useMap } from 'react-leaflet';

interface IProps {
  bounds: any;
}

const MapViewControl: React.FC<IProps> = ({ bounds }) => {
  const map = useMap();
  map.invalidateSize(bounds);
  map.fitBounds(bounds);
  return null;
};

export default MapViewControl;
