import React from 'react';
import { makeStyles } from '@material-ui/core';
import road90 from '../assets/road90.svg.png';

const useStyles = makeStyles({
  root: {
    width: '56px',
    height: '40px',
  },
});
const RoadNumberImage = () => {
  const classes = useStyles();
  return <img src={road90} className={classes.root} />;
};
export default RoadNumberImage;
