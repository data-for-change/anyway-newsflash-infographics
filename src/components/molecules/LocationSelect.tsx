import { FC } from 'react';
import { MapContainer, useMapEvents } from 'react-leaflet';
import { IPoint } from '../../models/Point';
import { INITIAL_CENTER } from '../../utils/utils';
import { Marker } from '../atoms';
import GoogleMapsLayer from './map/GoogleMapsLayer';

const INITIAL_ZOOM = parseInt(process.env.REACT_APP_DEFAULT_MAP_ZOOM!);

interface ILocation {
  onLocationChange: (location: IPoint) => void;
}

const LocationPicker: FC<ILocation> = ({ onLocationChange }) => {
  useMapEvents({
    click: (event) => {
      const {latlng: { lng, lat }} = event;
      onLocationChange({ longitude: lng,latitude: lat });
    },
  });
  return null;
};

interface IProps {
  location: IPoint | null;
  onLocationChange: (location: IPoint | null) => void;
}
//TODO create Map component
const LocationSelect:FC<IProps> = ({location, onLocationChange}) => {

  return (
    <MapContainer center={INITIAL_CENTER} zoom={INITIAL_ZOOM} style={{ height: '100%', width: '100%' }}>
      <LocationPicker onLocationChange={onLocationChange} />
      <GoogleMapsLayer />
      {location && <Marker markerdata={location} />}
    </MapContainer>
  );
};

export default LocationSelect;
