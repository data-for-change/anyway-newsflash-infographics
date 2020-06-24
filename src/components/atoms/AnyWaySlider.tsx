import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 150,
  },
});
const marks = [
  {
    value: 1,
    label: 'x1',
  },
  {
    value: 1.5,
    label: 'x1.5',
  },
  {
    value: 2,
    label: 'x2',
  },
  {
    value: 2.5,
    label: 'x2.5',
  },
  {
    value: 3,
    label: 'x3',
  },
];
const AnyWaySlider = ({ onChange }: any) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={1}
        onChange={onChange}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.5}
        marks={marks}
        min={1}
        max={3}
      />
    </div>
  );
};
export default AnyWaySlider;
