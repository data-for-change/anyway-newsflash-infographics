import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    color: '#000',
  },
}));

export const SignInIcon = () => {
  const styles = useStyles();
  
  return (
    <div className={styles.root}>
      <i className="material-icons">person</i>
    </div>
  );
};
