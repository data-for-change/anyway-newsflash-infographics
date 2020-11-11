import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { makeStyles } from '@material-ui/core';
import { dateFormat } from '../../utils/time.utils';
import { ClockPosition } from '../../utils/enum.utils';
import { noColor, whiteColor, blackColor, tooltipMarkerBorderColorArrow } from '../../style';

const getLabelPosition = (offset: ClockPosition): string => {
  const x = getLabelXPosition(offset);
  const y = getLabelYPosition(offset);
  return `translate(${x},${y})`;
};

const getLabelXPosition = (offset: ClockPosition): string => {
  switch (offset) {
    case ClockPosition.TOP:
    case ClockPosition.BOTTOM:
      return '75%';
    case ClockPosition.BOTTOMRIGHT:
    case ClockPosition.TOPRIGHT:
      return '120%';
    case ClockPosition.RIGHT:
      return '135%';
    case ClockPosition.TOPLEFT:
    case ClockPosition.BOTTOMLEFT:
      return '8px';
    default:
      return '0';
  }
};

const getLabelYPosition = (offset: ClockPosition): string => {
  switch (offset) {
    case ClockPosition.TOP:
    case ClockPosition.TOPLEFT:
    case ClockPosition.TOPRIGHT:
      return '-27px';
    case ClockPosition.BOTTOM:
      return '40px';
    case ClockPosition.BOTTOMLEFT:
    case ClockPosition.BOTTOMRIGHT:
      return '32px';
    default:
      return '0';
  }
};
const getLabelFlexFlow = (offset: ClockPosition): string => {
  switch (offset) {
    case ClockPosition.TOP:
      return 'column-reverse';
    case ClockPosition.BOTTOM:
      return 'column';
    case ClockPosition.RIGHT:
    case ClockPosition.BOTTOMRIGHT:
    case ClockPosition.TOPRIGHT:
      return 'row-reverse';
    default:
      return 'initial';
  }
};

const getLabelArrowRotation = (offset: ClockPosition): string => {
  switch (offset) {
    case ClockPosition.TOP:
      return 'rotate(90deg)';
    case ClockPosition.RIGHT:
      return 'rotate(180deg)';
    case ClockPosition.TOPRIGHT:
      return 'translate(6px, 13px) rotate(135deg)';
    case ClockPosition.TOPLEFT:
      return 'translate(-6px, 13px) rotate(45deg)';
    case ClockPosition.BOTTOM:
      return 'rotate(270deg)';
    case ClockPosition.BOTTOMRIGHT:
      return 'translate(6px, -13px) rotate(-135deg)';
    case ClockPosition.BOTTOMLEFT:
      return 'translate(-6px, -13px) rotate(-45deg)';
    default:
      return 'none';
  }
};

const useStyles = makeStyles({
  icon: {
    width: 0,
    height: 0,
    backgroundColor: noColor,
  },
  root: {
    position: 'absolute',
    right: 16,
    bottom: 0,
    transform: (offset: ClockPosition) => getLabelPosition(offset),
    display: 'flex',
    flexFlow: (offset: ClockPosition) => getLabelFlexFlow(offset),
    alignItems: 'center',
  },
  content: () => ({
    position: 'relative',
    order: 1,
    padding: ' 1px 3px',
    borderRadius: '5px 7px 7px 5px',
    whiteSpace: 'nowrap',
    color: whiteColor,
    backgroundColor: blackColor,
  }),
  arrow: {
    display: 'inline-flex',
    borderStyle: 'solid',
    borderWidth: '5px 0 5px 20px',
    borderColor: tooltipMarkerBorderColorArrow,
    transform: (offset: ClockPosition) => getLabelArrowRotation(offset),
  },
});
const TooltipMarker = ({ data, position, offset }: any) => {
  const classes = useStyles(offset);
  // const { accident_timestamp, accident_severity, accident_type = '' } = markerData;
  // const { accident_timestamp, accident_severity, accident_type = '' } = markerData;
  // const typeStr = accident_type === '' ? '' : `, ${accident_type}`;

  // temp: make string short - skip desription
  // const iconText = `${dateFormat(accident_timestamp)} - ${accident_severity}${typeStr}`;
  const iconText: any = `${dateFormat(data.accident_timestamp)}`;

  const TooltipTemplate = (
    <div className={classes.root}>
      <div className={classes.content}>{iconText}</div>
      <div className={classes.arrow}></div>
    </div>
  );
  const tooltipIcon = L.divIcon({
    className: classes.icon,
    html: ReactDOMServer.renderToString(TooltipTemplate),
  });

  return <Marker icon={tooltipIcon} position={position} />;
};

export default TooltipMarker;
