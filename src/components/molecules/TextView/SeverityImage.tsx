import React, { FC } from 'react';
import Person from 'assets/Person.png';
import Ambulance from 'assets/Ambulance.png';
import Crutches from 'assets/Crutches.png';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

interface SProps {
  severity: string;
  inRecord?: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
  },
  singleType: {
    height: '40%',
    width: 'auto',
  },
  list: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  image: {
    height: '80%',
    width: 'auto',
  },
}));

const SeverityImage: FC<SProps> = ({ severity, inRecord }) => {
  const classes = useStyles();
  interface SeverityTypesImages {
    [index: string]: string;
  }
  const imgBySeverity: SeverityTypesImages = { fatal: Person, severe: Ambulance, light: Crutches };
  const root = classNames(classes.root, inRecord ? classes.list : classes.singleType);
  return (
    <Box className={root}>
      <img className={classes.image} src={imgBySeverity[severity]} alt={imgBySeverity[severity]} />
    </Box>
  );
};

export default SeverityImage;
