import React from 'react';
import { useMap } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';

interface IProps {
  zoom?: number;
  center?: LatLngLiteral;
  bounds: any;
}

const MapViewControl: React.FC<IProps> = ({ zoom, center, bounds }) => {
  const map = useMap();
  map.invalidateSize();
  if (zoom && center) {
    map.setView(center, zoom);
  }
  map.fitBounds(bounds);
  return null;
};

export default MapViewControl;
