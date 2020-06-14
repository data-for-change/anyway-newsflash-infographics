import React from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import road90 from '../assets/road90.svg.png';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.spacing(7),
    height: theme.spacing(5),
  },
}));
const RoadNumberImage = () => {
  const classes = useStyles();
  return <img src={road90} className={classes.root} />;
};
export default RoadNumberImage;
