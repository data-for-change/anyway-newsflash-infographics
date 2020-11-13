import React, { FC } from 'react';
import MatAppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { appBarBackgroundColor } from '../../style';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      flexGrow: 1,
      backgroundColor: appBarBackgroundColor,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: '2vw',
      paddingRight: '2vw',
    },
  }),
);

const AppBar: FC = ({ children }) => {
  const classes = useStyles();

  return <MatAppBar className={classes.root}>{children}</MatAppBar>;
};

export default AppBar;
