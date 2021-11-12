import { HEBREW } from 'const/languages.const';
import React, { FC } from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { useParams } from 'react-router-dom';
import { MAP_STYLE } from 'style/map.style';
import { mapApiKey } from 'utils/utils';

const GoogleMapsLayer: FC = () => {
  const { lng } = useParams<{ lng: string }>();
  const language: string = lng || HEBREW;

  return (
    <ReactLeafletGoogleLayer
      googleMapsLoaderConf={{ apiKey: mapApiKey, version: '3.40.6', language: language }}
      type="roadmap"
      styles={MAP_STYLE}
    />
  );
};

export default GoogleMapsLayer;
