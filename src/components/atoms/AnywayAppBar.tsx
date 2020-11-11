import React, { FC } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { whiteColor } from '../../style';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      flexGrow: 1,
      backgroundColor: whiteColor,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: '2vw',
      paddingRight: '2vw',
    },
  }),
);

const AnywayAppBar: FC = ({ children }) => {
  const classes = useStyles();

  return <AppBar className={classes.root}>{children}</AppBar>;
};

export default AnywayAppBar;
