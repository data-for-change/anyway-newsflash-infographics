import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Ambulance from 'assets/Ambulance.png';
import Crutches from 'assets/Crutches.png';
import Person from 'assets/Person.png';
import classNames from 'classnames';
import React, { FC } from 'react';

const PREFIX = 'SeverityImage';

const classes = {
  root: `${PREFIX}-root`,
  singleType: `${PREFIX}-singleType`,
  list: `${PREFIX}-list`,
  image: `${PREFIX}-image`,
};

const StyledBox = styled(Box)(() => ({
  [`& .${classes.root}`]: {
    width: '50%',
  },

  [`& .${classes.singleType}`]: {
    height: '40%',
    width: 'auto',
  },

  [`& .${classes.list}`]: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  [`& .${classes.image}`]: {
    height: '80%',
    width: 'auto',
  },
}));

interface SProps {
  severity: string;
  inRecord?: boolean;
}

const SeverityImage: FC<SProps> = ({ severity, inRecord }) => {
  interface SeverityTypesImages {
    [index: string]: string;
  }
  const imgBySeverity: SeverityTypesImages = { fatal: Person, severe: Ambulance, light: Crutches };
  const root = classNames(classes.root, inRecord ? classes.list : classes.singleType);
  return (
    <StyledBox className={root}>
      <img className={classes.image} src={imgBySeverity[severity]} alt={imgBySeverity[severity]} />
    </StyledBox>
  );
};

export default SeverityImage;
