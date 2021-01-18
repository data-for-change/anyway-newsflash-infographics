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

  root:{
    display : 'flex',
    justifyContent:'center',
    alignItems : 'flex-end',
    paddingRight : '10px'
  },
  image: {
    height: theme.spacing(8),
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
    <Box className={classes.root}>
      <img src={imgBySeverity[severity]} className={classes.image} alt={imgBySeverity[severity]} />
    </Box>
  );
};

export default SeverityImage;
