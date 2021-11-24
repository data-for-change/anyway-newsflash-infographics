import { styled } from '@mui/material/styles';
import { ClockPosition } from 'models/ClockPosition';
import React, { FC } from 'react';
import { blackColor } from 'style';

const PREFIX = 'TooltipArrow';

const classes = {
  arrow: `${PREFIX}-arrow`,
};

const Root = styled('i')({
  [`&.${classes.arrow}`]: {
    border: `solid ${blackColor}`,
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: '6px',
    transform: (type: any) => getArrowDirection(type as ClockPosition),
  },
});

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

const TooltipArrow: FC<IProps> = ({ type }) => {
  return <Root className={classes.arrow}></Root>;
};
export default TooltipArrow;
