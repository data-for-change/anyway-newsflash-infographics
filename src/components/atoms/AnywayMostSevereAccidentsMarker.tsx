import React, { FC } from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { makeStyles } from '@material-ui/core';
import { dateFormat } from '../../utils/time.utils';

interface IProps {
  markerdata: any;
  markerside: any;
}
const useStyles = makeStyles({
  icon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
  },
  mapLabel: (side) => ({
    position: 'absolute',
    bottom: '-1px',
    right: side ? '-95px' : '10px',
    display: 'flex',
    alignItems: 'center',
    transform: side ? 'scaleX(-1)' : '',
  }),
  mapLabelContent: (side) => ({
    position: 'relative',
    order: 1,
    padding: ' 1px 3px',
    borderRadius: '5px 7px 7px 5px',
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    backgroundColor: '#000000',
    transform: side ? 'scaleX(-1)' : '',
  }),
  mapLabelArrow: {
    display: 'inline-flex',
    borderStyle: 'solid',
    borderWidth: '5px 0 5px 20px',
    marginRight: '10px',
    borderColor: 'transparent transparent transparent #000000',
  },
});
const IconMap = ( { markerData, side }: any ) => {
  const classes = useStyles( side);

  // const { accident_timestamp, accident_severity, accident_type = '' } = markerData;
  // const { accident_timestamp, accident_severity, accident_type = '' } = markerData;
  // const typeStr = accident_type === '' ? '' : `, ${accident_type}`;

  // temp: make string short - skip desription
  // const iconText = `${dateFormat(accident_timestamp)} - ${accident_severity}${typeStr}`;
  const iconText: any = `${ dateFormat( markerData.accident_timestamp ) }`;

  return (
    <div className={classes.mapLabel}>
      <div className={classes.mapLabelContent}>{iconText}</div>
      <div className={classes.mapLabelArrow}></div>
    </div>
  );
};

const AnywayMostSevereAccidentsMarker: FC<IProps> = ({ markerdata, markerside }) => {
  const { latitude, longitude, accident_severity, accident_timestamp } = markerdata;
  const classes = useStyles();
  const lPoint: L.LatLng = new L.LatLng(latitude, longitude);
  const icon = L.divIcon({
    className: classes.icon,
    html: ReactDOMServer.renderToString(<IconMap side={markerside} markerData={markerdata} />),
  } );

  return !accident_timestamp && !accident_severity ? null : (
    <Marker icon={icon} position={lPoint} />
  );
};

export default AnywayMostSevereAccidentsMarker;
