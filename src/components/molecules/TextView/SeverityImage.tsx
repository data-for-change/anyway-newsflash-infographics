import React, { FC } from 'react';
import Person from 'assets/Person.png';
import Ambulance from 'assets/Ambulance.png';
import Crutches from 'assets/Crutches.png';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

interface SProps {
  severity: string;
  inRecord?: boolean;
}

const useStyles = makeStyles((theme) => ({

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
  const root =  inRecord ? classes.list : classes.singleType;
  return (
    <Box className={root}>
      <img className={classes.image} src={imgBySeverity[severity]} alt={imgBySeverity[severity]} />
    </Box>
  );
};

export default SeverityImage;
