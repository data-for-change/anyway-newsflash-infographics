import { FC, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { IPoint } from 'models/Point';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import { Marker } from 'components/atoms';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import Map from './map/Map';

const useStyles = makeStyles({
  suggestionSingle: {
    padding: 5,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#c4c4c4',
    },
  },
  searchArea: {
    position: 'absolute',
    top: 80,
    right: 30,
    zIndex: 500,
  },
  suggestionsDiv: {
    position: 'absolute',
    minWidth: '100%',
    backgroundColor: 'white',
  },
});

export const PlacesAutocomplete = ({ onLocationChange }: { onLocationChange: (val: IPoint) => void }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const { t } = useTranslation();

  const classes = useStyles();

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleSelect = (suggestion: any) => () => {
    setValue(suggestion.description, false);
    clearSuggestions();

    getGeocode({ address: suggestion.description }).then((results) => {
      const { lat: latitude, lng: longitude } = getLatLng(results[0]);
      onLocationChange({ longitude, latitude });
    });
  };

  const renderSuggestions = () =>
    data.slice(0, 5).map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div className={classes.suggestionSingle} key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </div>
      );
    });

  return (
    <div ref={ref} className={classes.searchArea}>
      <input
        style={{ padding: 5 }}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={t('googleSearch')}
      />
      {status === 'OK' && <div className={classes.suggestionsDiv}>{renderSuggestions()}</div>}
    </div>
  );
};

interface ILocation {
  onLocationChange: (location: IPoint) => void;
}

const LocationPicker: FC<ILocation> = ({ onLocationChange }) => {
  const [position, setPosition] = useState<IPoint | null>(null);

  useMapEvents({
    click: (event) => {
      const {
        latlng: { lng, lat },
      } = event;
      setPosition({ longitude: lng, latitude: lat });
      onLocationChange({ longitude: lng, latitude: lat });
    },
  });

  return position === null ? null : <Marker markerdata={position} />;
};

interface IProps {
  onLocationChange: (location: IPoint) => void;
}

export const LocationSelect: FC<IProps> = ({ onLocationChange }) => {
  return (
    <Map>
      <LocationPicker onLocationChange={onLocationChange} />
    </Map>
  );
};
