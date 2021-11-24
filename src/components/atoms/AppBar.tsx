import MatAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';
import { smokeWhiteColor } from 'style';

const PREFIX = 'AppBar';

const classes = {
  root: `${PREFIX}-root`,
};

const StyledMatAppBar = styled(MatAppBar)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    position: 'relative',
    flexGrow: 1,
    backgroundColor: smokeWhiteColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '2vw',
    paddingRight: '2vw',
    color: 'inherit',
  },
}));

const AppBar: FC = ({ children }) => {
  return <StyledMatAppBar className={classes.root}>{children}</StyledMatAppBar>;
};

export default AppBar;
