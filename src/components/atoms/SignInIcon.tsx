import { styled } from '@mui/material/styles';
import React from 'react';
import { blackColor } from 'style';

const PREFIX = 'SignInIcon';

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled('div')(({ theme: Theme }) => ({
  [`& .${classes.root}`]: {
    color: blackColor,
    marginRight: '5px',
    cursor: 'default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const SignInIcon = () => {
  return (
    <Root className={classes.root}>
      <i className="material-icons">person</i>
    </Root>
  );
};
