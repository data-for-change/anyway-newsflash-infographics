import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import MapIcon from '../atoms/AnywayMapIcon';
import TooltipMarker, { TooltipOffset } from './TooltipMarker';
import { AnyWayButton } from '../atoms/AnyWayButton';
import TooltipArrow, { ArrowDirection } from './TooltipArrow';
interface IProps {
  data: any;
  tooltipOffset: TooltipOffset;
}

const useStyles = makeStyles({
  root: {
    '& .leaflet-popup-content-wrapper': {
      borderRadius: 6,
      backgroundColor: '#e2e2e2f0',
    },
    '& .leaflet-popup-content': {
      width: 130,
      margin: '14px 0 0 0',
    },
    '& .leaflet-popup-tip': {
      backgroundColor: '#e2e2e2f0',
    },
  },
  button: {
    padding: 10,
    minWidth: 0,
  },
  arrowContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 3,
  },
  tooltipTitle: {
    margin: '5px 0 0',
    textAlign: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    margin: '0 10px',
  },
});
const AnywayMostSevereAccidentsMarker: FC<IProps> = ({ data, tooltipOffset = TooltipOffset.LEFT }) => {
  const classes = useStyles();
  const [offset, setOffset] = useState(tooltipOffset);
  const { latitude, longitude, accident_severity, accident_timestamp } = data;
  const position: L.LatLng = new L.LatLng(latitude, longitude);

  const icon: L.Icon = MapIcon.getIconBySeverity('carIcon', data.accident_severity);
  const isValid = accident_timestamp && accident_severity;
  return !isValid ? null : (
    <>
      <TooltipMarker data={data} position={position} offset={offset} />
      <Marker icon={icon} position={position}>
        {
          <Popup className={classes.root}>
            <div className={classes.tooltipTitle}>Tooltip Location</div>
            <div className={classes.arrowContainer}>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, TooltipOffset.TOPRIGHT)}>
                <TooltipArrow type={ArrowDirection.TOPRIGHT} />
              </AnyWayButton>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, TooltipOffset.TOP)}>
                <TooltipArrow type={ArrowDirection.TOP} />
              </AnyWayButton>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, TooltipOffset.TOPLEFT)}>
                <TooltipArrow type={ArrowDirection.TOPLEFT} />
              </AnyWayButton>
            </div>
            <div className={classes.arrowContainer}>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, TooltipOffset.RIGHT)}>
                <TooltipArrow type={ArrowDirection.RIGHT} />
              </AnyWayButton>
              <img className={classes.icon} src={icon.options.iconUrl} alt="car icon" />
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, TooltipOffset.LEFT)}>
                <TooltipArrow type={ArrowDirection.LEFT} />
              </AnyWayButton>
            </div>
            <div className={classes.arrowContainer}>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, TooltipOffset.BOTTOMRIGHT)}>
                <TooltipArrow type={ArrowDirection.BOTTOMRIGHT} />
              </AnyWayButton>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, TooltipOffset.BOTTOM)}>
                <TooltipArrow type={ArrowDirection.BOTTOM} />
              </AnyWayButton>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, TooltipOffset.BOTTOMLEFT)}>
                <TooltipArrow type={ArrowDirection.BOTTOMLEFT} />
              </AnyWayButton>
            </div>
          </Popup>
        }
      </Marker>
    </>
  );
};

export default AnywayMostSevereAccidentsMarker;
