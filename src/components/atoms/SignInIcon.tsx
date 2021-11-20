import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { blackColor } from 'style';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: blackColor,
      marginRight: '5px',
      cursor: 'default',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

export const SignInIcon = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <i className="material-icons">person</i>
    </div>
  );
};
