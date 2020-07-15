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
const getLabelVertical = (offset: TooltipOffset): number => {
  console.log(offset);

  switch (offset) {
    case TooltipOffset.LEFT:
    case TooltipOffset.BOTTOMLEFT:
    case TooltipOffset.TOPLEFT:
      return 16;
    case TooltipOffset.RIGHT:
    case TooltipOffset.BOTTOMRIGHT:
    case TooltipOffset.TOPRIGHT:
      return -87;
    default:
      return 0;
  }
};

const getLabelFlexFlow = (offset: TooltipOffset): string => {
  switch (offset) {
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
    case TooltipOffset.RIGHT:
    case TooltipOffset.BOTTOMRIGHT:
    case TooltipOffset.TOPRIGHT:
      return 'rotate(180deg)';
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
    right: (offset: TooltipOffset) => getLabelVertical(offset),
    bottom: 0,
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
    borderColor: 'transparent transparent transparent #000000',
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
