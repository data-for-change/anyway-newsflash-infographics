import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { ClockPosition } from 'models/ClockPosition';
import { blackColor } from 'style';

interface IProps {
  type: ClockPosition;
}

const getArrowDirection = (type: ClockPosition) => {
  switch (type) {
    case ClockPosition.TOP: {
      return 'rotate(-135deg)';
    }
    case ClockPosition.TOPRIGHT: {
      return 'rotate(270deg)';
    }
    case ClockPosition.TOPLEFT: {
      return 'rotate(-180deg)';
    }
    case ClockPosition.RIGHT: {
      return 'rotate(-45deg)';
    }
    case ClockPosition.LEFT: {
      return 'rotate(135deg)';
    }
    case ClockPosition.BOTTOM: {
      return 'rotate(45deg)';
    }
    case ClockPosition.BOTTOMRIGHT: {
      return 'rotate(0deg)';
    }
    case ClockPosition.BOTTOMLEFT: {
      return 'rotate(-270deg)';
    }
  }
};

const useStyles = makeStyles({
  arrow: {
    border: `solid ${blackColor}`,
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: '6px',
    transform: (type) => getArrowDirection(type as ClockPosition),
  },
});
const TooltipArrow: FC<IProps> = ({ type }) => {
  const classes = useStyles(type);
  return <i className={classes.arrow}></i>;
};
export default TooltipArrow;
