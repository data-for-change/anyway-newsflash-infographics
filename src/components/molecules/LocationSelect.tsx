import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';
import { IPoint } from 'models/Point';
import { Marker } from 'components/atoms';
import Map from './map/Map';

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
  onLocationChange: (location: IPoint) => void;
}

const LocationSelect: FC<IProps> = ({ location, onLocationChange }) => {
  return (
    <Map>
      <LocationPicker onLocationChange={onLocationChange} />
      {location && <Marker markerdata={location} />}
    </Map>
  );
};

export default LocationSelect;
