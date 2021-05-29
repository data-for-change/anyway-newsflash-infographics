import React, { FC } from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { MAP_STYLE } from '../../../style/map.style';
import { mapApiKey } from '../../../utils/utils';

const GoogleMapsLayer: FC = ({ children }) => {
  return (
    <ReactLeafletGoogleLayer
      googleMapsLoaderConf={{ apiKey: mapApiKey, version: '3.40.6' }}
      type="roadmap"
      styles={MAP_STYLE}
    />
  );
};

export default GoogleMapsLayer;
