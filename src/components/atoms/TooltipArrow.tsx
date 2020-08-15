import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';

export enum ArrowDirection {
  TOP,
  TOPRIGHT,
  RIGHT,
  BOTTOMRIGHT,
  BOTTOM,
  BOTTOMLEFT,
  LEFT,
  TOPLEFT,
}

interface IProps {
  type: ArrowDirection;
}

const getArrowDirection = (type: ArrowDirection) => {
  switch (type) {
    case ArrowDirection.TOP: {
      return 'rotate(-135deg)';
    }
    case ArrowDirection.TOPRIGHT: {
      return 'rotate(270deg)';
    }
    case ArrowDirection.TOPLEFT: {
      return 'rotate(-180deg)';
    }
    case ArrowDirection.RIGHT: {
      return 'rotate(-45deg)';
    }
    case ArrowDirection.LEFT: {
      return 'rotate(135deg)';
    }
    case ArrowDirection.BOTTOM: {
      return 'rotate(45deg)';
    }
    case ArrowDirection.BOTTOMRIGHT: {
      return 'rotate(0deg)';
    }
    case ArrowDirection.BOTTOMLEFT: {
      return 'rotate(-270deg)';
    }
  }
};

const useStyles = makeStyles({
  arrow: {
    border: 'solid black',
    borderWidth: '0 2px 2px 0',
    display: 'inline-block',
    padding: '6px',
    transform: (type: ArrowDirection) => getArrowDirection(type),
  },
});
const TooltipArrow: FC<IProps> = ({ type }) => {
  const classes = useStyles(type);
  return <i className={classes.arrow}></i>;
};
export default TooltipArrow;
