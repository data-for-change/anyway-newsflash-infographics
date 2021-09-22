import React from 'react';
import MatSlider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: 10,
  },
});
const marks = [
  {
    value: 1,
    label: 'x1',
  },
  {
    value: 1.25,
    label: 'x1.25',
  },
  {
    value: 1.5,
    label: 'x1.5',
  },
];
const Slider = ({ onChange }: any) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MatSlider
        defaultValue={1}
        onChange={onChange}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        marks={marks}
        min={1}
        max={1.5}
      />
    </div>
  );
};
export default Slider;
