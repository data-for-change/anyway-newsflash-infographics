import React, { FC } from 'react';
import { AnywayAppBar } from '../atoms/AnywayAppBar';
import { AnywayLogo } from '../atoms/AnywayLogo';
import { SignInIcon } from '../atoms/SignInIcon';
import LogInLinkGoogle from './LogInLinkGoogle';
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  navContainer: {
    display: 'flex',
    alignItems: 'center'
  }
});

export const Header: FC = () => {
  const classes = useStyles()

  return (
    <AnywayAppBar>
      <AnywayLogo height={'30px'} />
      <Box className={classes.navContainer}>
        <LogInLinkGoogle />
        <SignInIcon />
      </Box>
    </AnywayAppBar>
  );
};
