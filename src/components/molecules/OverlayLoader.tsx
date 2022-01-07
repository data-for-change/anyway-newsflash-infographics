import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Loader from 'components/atoms/Loader';
import React, { FC } from 'react';
import { silverSmokeColor } from 'style';

const PREFIX = 'OverlayLoader';

const classes = {
  root: `${PREFIX}-root`,
};

const StyledBox = styled(Box)({
  [`&.${classes.root}`]: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: silverSmokeColor,
    opacity: 0.5,
    zIndex: 2,
    display: (show: any) => (show ? 'flex' : 'none'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface IProps {
  show: boolean;
}

const OverlayLoader: FC<IProps> = ({ show }) => {
  return (
    <StyledBox className={classes.root}>
      <Loader />
    </StyledBox>
  );
};
export default OverlayLoader;
