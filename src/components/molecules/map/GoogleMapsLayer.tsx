import React, { FC } from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { useParams } from 'react-router-dom';
import { MAP_STYLE } from 'style/map.style';
import { mapApiKey } from 'utils/utils';

interface lng {
  lng: string;
}

const GoogleMapsLayer: FC = ({ children }) => {
  const { lng }: lng = useParams();

  const selectedLang: string = lng || 'he';

  return (
    <ReactLeafletGoogleLayer
      googleMapsLoaderConf={{ apiKey: mapApiKey, version: '3.40.6', language: selectedLang }}
      type="roadmap"
      styles={MAP_STYLE}
    />
  );
};

export default GoogleMapsLayer;
