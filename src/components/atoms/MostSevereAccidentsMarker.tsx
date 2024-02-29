import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

import { AnyWayButton } from './AnyWayButton';
import { Typography, MapIcon, TooltipMarker, TooltipArrow } from '.';
import { ClockPosition } from 'models/ClockPosition';
import { useTranslation } from 'react-i18next';
import { defaultBorderRadius, silverSmokeColor } from 'style';
import { useLocale } from 'hooks/date.hooks'

interface IProps {
  data: any;
  tooltipOffset: ClockPosition;
}

const useStyles = makeStyles({
  root: {
    '& .leaflet-popup-content-wrapper': {
      borderRadius: defaultBorderRadius,
      backgroundColor: silverSmokeColor,
    },
    '& .leaflet-popup-content': {
      width: 130,
      margin: '14px 0 0 0',
    },
    '& .leaflet-popup-tip': {
      backgroundColor: silverSmokeColor,
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
const MostSevereAccidentsMarker: FC<IProps> = ({ data, tooltipOffset = ClockPosition.LEFT }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [offset, setOffset] = useState(tooltipOffset);
  const { latitude, longitude, accident_severity, accident_timestamp } = data;
  const position: L.LatLng = new L.LatLng(latitude, longitude);
  const locale = useLocale()

  const icon: L.Icon = MapIcon.getIconBySeverity('carIcon', data.accident_severity);
  const isValid = accident_timestamp && accident_severity;
  return !isValid ? null : (
    <>
      <TooltipMarker data={data} position={position} offset={offset} locale={locale}/>
      <Marker icon={icon} position={position}>
        {
          <Popup className={classes.root}>
            <div className={classes.tooltipTitle}>
              <Typography.Body4>{t('labelPosition')}</Typography.Body4>
            </div>
            <div className={classes.arrowContainer}>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, ClockPosition.TOPRIGHT)}>
                <TooltipArrow type={ClockPosition.TOPRIGHT} />
              </AnyWayButton>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, ClockPosition.TOP)}>
                <TooltipArrow type={ClockPosition.TOP} />
              </AnyWayButton>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, ClockPosition.TOPLEFT)}>
                <TooltipArrow type={ClockPosition.TOPLEFT} />
              </AnyWayButton>
            </div>
            <div className={classes.arrowContainer}>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, ClockPosition.RIGHT)}>
                <TooltipArrow type={ClockPosition.RIGHT} />
              </AnyWayButton>
              <img className={classes.icon} src={icon.options.iconUrl} alt="car icon" />
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, ClockPosition.LEFT)}>
                <TooltipArrow type={ClockPosition.LEFT} />
              </AnyWayButton>
            </div>
            <div className={classes.arrowContainer}>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, ClockPosition.BOTTOMRIGHT)}>
                <TooltipArrow type={ClockPosition.BOTTOMRIGHT} />
              </AnyWayButton>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, ClockPosition.BOTTOM)}>
                <TooltipArrow type={ClockPosition.BOTTOM} />
              </AnyWayButton>
              <AnyWayButton className={classes.button} onClick={setOffset.bind(null, ClockPosition.BOTTOMLEFT)}>
                <TooltipArrow type={ClockPosition.BOTTOMLEFT} />
              </AnyWayButton>
            </div>
          </Popup>
        }
      </Marker>
    </>
  );
};

export default MostSevereAccidentsMarker;
