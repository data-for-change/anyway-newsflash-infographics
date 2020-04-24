import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { makeStyles } from '@material-ui/core';


interface IProps {
  markerdata: any;

}
const useStyles = makeStyles({
  icon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
  },
  mapLabel: {
    position: 'absolute',
    bottom: '-5px',
    right: '5px',
    display: 'flex',
    alignItems: 'center',
  },
  mapLabelContent: {
    position: 'relative',
    order: 1,
    padding: ' 1px 3px',
    borderRadius: '5px 7px 7px 5px',
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    backgroundColor: '#000000',

  },
  mapLabelArrow: {
    display: 'inline-flex',
    borderStyle: 'solid',
    borderWidth: '5px 0 5px 40px',
    borderColor: 'transparent transparent transparent #000000',
  },
});
const IconMap = ({markerData}:any) => {
  const classes = useStyles();
  const { accident_timestamp, accident_severity } = markerData;

  return (
    <div className={classes.mapLabel}>
      <div className={classes.mapLabelContent}>
        {accident_timestamp}-{accident_severity}
      </div>
      <div className={classes.mapLabelArrow}></div>
    </div>
  );
};

const AnywayMostSevereAccidentsMarker: React.FC<IProps> = ( { markerdata } ) => {
  const { latitude, longitude, accident_severity, accident_timestamp } = markerdata
  const classes = useStyles();
  const lPoint: L.LatLng = new L.LatLng(latitude, longitude);
  const icon = L.divIcon( {
    className: classes.icon,
    html: ReactDOMServer.renderToString(<IconMap markerData={ markerdata }/>),
  } );

  return !accident_timestamp && !accident_severity ? null : <Marker key={`marker-${accident_timestamp}`} icon={icon} position={lPoint} />;
};

export default AnywayMostSevereAccidentsMarker;
