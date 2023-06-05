import { FC, memo, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { IPoint } from 'models/Point';
import { Marker } from 'components/atoms';
import Map from './map/Map';

interface ILocation {
  onLocationChange: (location: IPoint) => void;
  initialLocation: IPoint | null;
}

const LocationPicker: FC<ILocation> = ({ onLocationChange, initialLocation }) => {
  // const [position, setPosition] = useState<IPoint | null>(null);
  const [position, setPosition] = useState<IPoint | null>(initialLocation)
  console.log(position, 'before the click')

  useMapEvents( {

    click: (event) => {
      const {latlng: { lng, lat }} = event;
      setPosition({ longitude: lng, latitude: lat });
      onLocationChange({ longitude: lng, latitude: lat });
    },
  },);
  return position === null ? null : <Marker markerdata={position}/>
};


interface IProps {
  onLocationChange: (location: IPoint) => void;
  initialLocation?: IPoint | null;
}

const LocationSelect: FC<IProps> = ({ onLocationChange, initialLocation = null }) => {
  return (
  <Map>
 <LocationPicker  onLocationChange={onLocationChange} initialLocation={initialLocation}/>
    </Map>
  );
};

export default memo(LocationSelect);
