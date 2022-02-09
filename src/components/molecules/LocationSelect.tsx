import { FC, memo, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { IPoint } from 'models/Point';
import { Marker } from 'components/atoms';
import Map from './map/Map';

interface ILocation {
  onLocationChange: (location: IPoint) => void;
}

const LocationPicker: FC<ILocation> = ({ onLocationChange }) => {
  const [position, setPosition] = useState<IPoint | null>(null);

  useMapEvents({
    click: (event) => {
      const {latlng: { lng, lat }} = event;
      setPosition({ longitude: lng, latitude: lat });
      onLocationChange({ longitude: lng, latitude: lat });
    },
  });

  return position === null ? null : <Marker markerdata={position}/>
};

interface IProps {
  onLocationChange: (location: IPoint) => void;
}

const LocationSelect: FC<IProps> = ({ onLocationChange }) => {
  return (
    <Map>
      <LocationPicker onLocationChange={onLocationChange} />
    </Map>
  );
};

export default memo(LocationSelect);
