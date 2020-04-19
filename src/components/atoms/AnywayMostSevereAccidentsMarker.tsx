import React, { FC } from 'react';
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
    display: 'flex',
    alignItems: 'center',
    bottom: 0,
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
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '5px 0 5px 20px',
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

const AnywayMostSevereAccidentsMarker: FC<IProps> = (  {markerdata}  ) => {
  const classes = useStyles();
  const lPoint: L.LatLng = new L.LatLng(markerdata.latitude, markerdata.longitude);
  const icon = L.divIcon( {
    className: classes.icon,
    html: ReactDOMServer.renderToString( <IconMap markerData={ markerdata }/>),
  } );

  return <Marker key={`marker-${markerdata.accident_timestamp}`} icon={icon} position={lPoint} />;
};

export default AnywayMostSevereAccidentsMarker;
