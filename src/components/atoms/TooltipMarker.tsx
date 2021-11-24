import { styled } from '@mui/material/styles';
import { useLocale } from 'hooks/date.hooks';
import L from 'leaflet';
import { ClockPosition } from 'models/ClockPosition';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker } from 'react-leaflet';
import { blackColor, tooltipMarkerBorderColorArrow, transparentColor, whiteColor } from 'style';
import { dateFormat } from 'utils/time.utils';

const PREFIX = 'TooltipMarker';

const classes = {
  icon: `${PREFIX}-icon`,
  root: `${PREFIX}-root`,
  content: `${PREFIX}-content`,
  arrow: `${PREFIX}-arrow`,
};

const StyledMarker = styled(Marker)({
  [`& .${classes.icon}`]: {
    width: 0,
    height: 0,
    backgroundColor: transparentColor,
  },
  [`& .${classes.root}`]: {
    position: 'absolute',
    right: 16,
    bottom: 0,
    transform: (prop: any) => getLabelPosition(prop.offset as ClockPosition),
    display: 'flex',
    flexFlow: (prop: any) => getLabelFlexFlow(prop.offset as ClockPosition),
    alignItems: 'center',
  },
  [`& .${classes.content}`]: {
    position: 'relative',
    order: (prop: any) => (prop.order ? 0 : 1),
    padding: ' 1px 3px',
    borderRadius: '5px 7px 7px 5px',
    whiteSpace: 'nowrap',
    color: whiteColor,
    backgroundColor: blackColor,
  },
  [`& .${classes.arrow}`]: {
    display: 'inline-flex',
    borderStyle: 'solid',
    borderWidth: '5px 0 5px 20px',
    borderColor: tooltipMarkerBorderColorArrow,
    transform: (prop: any) => getLabelArrowRotation(prop.offset as ClockPosition),
  },
});

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

const TooltipMarker = ({ data, position, offset }: any) => {
  const locale = useLocale();
  const iconText = `${dateFormat(data.accident_timestamp, locale)}`;
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

  return <StyledMarker icon={tooltipIcon} position={position} />;
};

export default TooltipMarker;
