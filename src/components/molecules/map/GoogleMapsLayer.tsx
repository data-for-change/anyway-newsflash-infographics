import React, { FC } from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { MAP_STYLE } from '../../../style/map.style';
import { mapApiKey } from '../../../utils/utils';
import { useParams } from 'react-router-dom';

interface lng {
  lng: string;
}

const GoogleMapsLayer: FC = ({ children }) => {
  const { lng }: lng = useParams();

  const selectedLang: string = lng ? lng : 'he';

  document
    .getElementById('testingScript')
    ?.setAttribute(
      'src',
      `https://maps.googleapis.com/maps/api/js?callback=__googleMapsCallback&language=${selectedLang}&v=3.40.6`,
    );
  console.log('selectedLang', selectedLang);
  console.log('lng', lng);

  return (
    <ReactLeafletGoogleLayer
      googleMapsLoaderConf={{
        apiKey: mapApiKey,
        version: '3.40.6',
        url: `https://maps.googleapis.com/maps/api/js?callback=__googleMapsCallback&language=${selectedLang}&v=3.40.6`,
        id: 'testingScript',
      }}
      type="roadmap"
      styles={MAP_STYLE}
    />
  );
};

export default GoogleMapsLayer;
