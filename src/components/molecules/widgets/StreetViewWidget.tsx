import { styled } from '@mui/material/styles';
import { IWidgetStreetViewData } from 'models/WidgetData';
import React, { FC } from 'react';
import ReactStreetview from 'services/streetView';
import { mapApiKey } from 'utils/utils';

const PREFIX = 'StreetViewWidget';

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    width: '100%',
    height: '100%',
  },
});

interface IProps {
  data: IWidgetStreetViewData;
}

const StreetViewWidget: FC<IProps> = ({ data }) => {
  const { latitude, longitude } = data.items;

  const streetViewPanoramaOptions = {
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
  };

  return (
    <Root className={classes.root}>
      <ReactStreetview
        apiKey={mapApiKey}
        position={{ lat: latitude, lng: longitude }}
        streetViewPanoramaOptions={streetViewPanoramaOptions}
      />
    </Root>
  );
};
export default StreetViewWidget;
