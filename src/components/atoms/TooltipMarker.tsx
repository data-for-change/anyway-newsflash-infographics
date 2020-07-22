import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { makeStyles } from '@material-ui/core';
import { dateFormat } from '../../utils/time.utils';

export enum TooltipOffset {
  TOP,
  TOPRIGHT,
  RIGHT,
  BOTTOMRIGHT,
  BOTTOM,
  BOTTOMLEFT,
  LEFT,
  TOPLEFT,
}

const getLabelPosition = (offset: TooltipOffset): string => {
  const x = getLabelXPosition(offset);
  const y = getLabelYPosition(offset);
  return `translate(${x},${y})`;
};

const getLabelXPosition = (offset: TooltipOffset): string => {
  switch (offset) {
    case TooltipOffset.TOP:
    case TooltipOffset.BOTTOM:
      return '75%';
    case TooltipOffset.BOTTOMRIGHT:
    case TooltipOffset.TOPRIGHT:
      return '120%';
    case TooltipOffset.RIGHT:
      return '135%';
    case TooltipOffset.TOPLEFT:
    case TooltipOffset.BOTTOMLEFT:
      return '8px';
    default:
      return '0';
  }
};

const getLabelYPosition = (offset: TooltipOffset): string => {
  switch (offset) {
    case TooltipOffset.TOP:
    case TooltipOffset.TOPLEFT:
    case TooltipOffset.TOPRIGHT:
      return '-27px';
    case TooltipOffset.BOTTOM:
      return '40px';
    case TooltipOffset.BOTTOMLEFT:
    case TooltipOffset.BOTTOMRIGHT:
      return '32px';
    default:
      return '0';
  }
};
const getLabelFlexFlow = (offset: TooltipOffset): string => {
  switch (offset) {
    case TooltipOffset.TOP:
      return 'column-reverse';
    case TooltipOffset.BOTTOM:
      return 'column';
    case TooltipOffset.RIGHT:
    case TooltipOffset.BOTTOMRIGHT:
    case TooltipOffset.TOPRIGHT:
      return 'row-reverse';
    default:
      return 'initial';
  }
};

const getLabelArrowRotation = (offset: TooltipOffset): string => {
  switch (offset) {
    case TooltipOffset.TOP:
      return 'rotate(90deg)';
    case TooltipOffset.RIGHT:
      return 'rotate(180deg)';
    case TooltipOffset.TOPRIGHT:
      return 'translate(6px, 13px) rotate(135deg)';
    case TooltipOffset.TOPLEFT:
      return 'translate(-6px, 13px) rotate(45deg)';
    case TooltipOffset.BOTTOM:
      return 'rotate(270deg)';
    case TooltipOffset.BOTTOMRIGHT:
      return 'translate(6px, -13px) rotate(-135deg)';
    case TooltipOffset.BOTTOMLEFT:
      return 'translate(-6px, -13px) rotate(-45deg)';
    default:
      return 'none';
  }
};

const useStyles = makeStyles({
  icon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
  },
  root: {
    position: 'absolute',
    right: 16,
    bottom: 0,
    transform: (offset: TooltipOffset) => getLabelPosition(offset),
    display: 'flex',
    flexFlow: (offset: TooltipOffset) => getLabelFlexFlow(offset),
    alignItems: 'center',
  },
  content: () => ({
    position: 'relative',
    order: 1,
    padding: ' 1px 3px',
    borderRadius: '5px 7px 7px 5px',
    whiteSpace: 'nowrap',
    color: 'white',
    backgroundColor: 'black',
  }),
  arrow: {
    display: 'inline-flex',
    borderStyle: 'solid',
    borderWidth: '5px 0 5px 20px',
    borderColor: 'transparent black transparent black',
    transform: (offset: TooltipOffset) => getLabelArrowRotation(offset),
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
