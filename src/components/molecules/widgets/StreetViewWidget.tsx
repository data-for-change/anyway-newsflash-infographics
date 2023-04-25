import React, { FC } from 'react';
import { mapApiKey } from 'const/generalConst';
import ReactStreetview from 'components/molecules/widgets/streetView';
import { makeStyles } from '@material-ui/core';
import { IWidgetStreetViewData } from 'models/WidgetData';

interface IProps {
  data: IWidgetStreetViewData;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
});

const StreetViewWidget: FC<IProps> = ({ data }) => {
  const classes = useStyles();
  const { latitude, longitude } = data.items;

  const streetViewPanoramaOptions = {
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
  };

  return (
    <div className={classes.root}>
      <ReactStreetview
        apiKey={mapApiKey}
        position={{ lat: latitude, lng: longitude }}
        streetViewPanoramaOptions={streetViewPanoramaOptions}
      />
    </div>
  );
};
export default StreetViewWidget;
