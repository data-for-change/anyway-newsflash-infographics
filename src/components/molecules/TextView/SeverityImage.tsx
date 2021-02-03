import React, { FC } from 'react';
import Person from '../../../assets/Person.png';
import Ambulance from '../../../assets/Ambulance.png';
import Crutches from '../../../assets/Crutches.png';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

interface SProps {
  severity: string;
}

const useStyles = makeStyles((theme) => ({
  image: {
    height: theme.spacing(11),
    width: 'auto',
  },
}));

const SeverityImage: FC<SProps> = ({ severity }) => {
  const classes = useStyles();
  interface SeverityTypesImages {
    [index: string]: string;
  }
  const imgBySeverity: SeverityTypesImages = { fatal: Person, severe: Ambulance, light: Crutches };
  return (
    <Box flex={1} display="flex" justifyContent="center">
      <img src={imgBySeverity[severity]} className={classes.image} alt={imgBySeverity[severity]} />
    </Box>
  );
};

export default SeverityImage;
