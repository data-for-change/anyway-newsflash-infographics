import React, { FC } from 'react';
import { getAPIKey } from '../../utils/utils';
import { IPoint } from '../../models/Point';
import ReactStreetview from 'react-streetview';
import { makeStyles } from '@material-ui/core';

interface IProps {
  data: IPoint[];
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
});

const StreetViewWidget: FC<IProps> = ( {data} ) => {
  const classes = useStyles();
  const {latitude, longitude} = data[0]

  const streetViewPanoramaOptions = {
    position: {lat: latitude, lng: longitude },
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
  };

  return (
    <div className={classes.root}>
      <ReactStreetview apiKey={getAPIKey()} streetViewPanoramaOptions={streetViewPanoramaOptions} />
    </div>
  );
};
export default StreetViewWidget;
