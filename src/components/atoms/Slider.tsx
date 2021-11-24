import MatSlider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import React from 'react';

const PREFIX = 'Slider';

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    padding: 10,
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
];
const Slider = ({ onChange }: any) => {
  return (
    <Root className={classes.root}>
      <MatSlider
        defaultValue={1}
        onChange={onChange}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        marks={marks}
        min={1}
        max={2}
      />
    </Root>
  );
};
export default Slider;
