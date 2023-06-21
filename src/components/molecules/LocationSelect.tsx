import { FC, memo, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { IPoint } from 'models/Point';
import { Marker } from 'components/atoms';
import Map from './map/Map';

interface ILocation {
  onLocationChange: (location: IPoint) => void;
  initialLocationGetter: (() => IPoint | null) | null;
}

const LocationPicker: FC<ILocation> = ({ onLocationChange, initialLocationGetter }) => {
  const initialLocation = initialLocationGetter ? initialLocationGetter() : null;
  const [position, setPosition] = useState<IPoint | null>(initialLocation);
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
  initialLocationGetter?: () => IPoint | null;
}

const LocationSelect: FC<IProps> = ({ onLocationChange, initialLocationGetter = null }) => {
  return (
  <Map>
 <LocationPicker  onLocationChange={onLocationChange} initialLocationGetter={initialLocationGetter}/>
    </Map>
  );
};

export default memo(LocationSelect);
