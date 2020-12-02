import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { blackColor } from '../../style';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: blackColor,
      marginRight: '5px',
      cursor: 'default',
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
