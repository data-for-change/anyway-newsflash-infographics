import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { onLinkColor, onLinkColorHover } from '../../style/_globals';
import {Text, TextType} from '../atoms'

const LINK = process.env.REACT_APP_GOOGLE_LOGIN_LINK;

const useStyles = makeStyles({
  link: {
    color: `${onLinkColor}`,
    textDecoration: 'none',
    '&:hover': {
      color: `${onLinkColorHover}`,
    },
    cursor: 'pointer',
  },
});
const LogInLinkGoogle = () => {
  const classes = useStyles();

  return (
    <a className={classes.link} href={LINK}>
      <Text type={TextType.CONTENT}>LOGIN</Text>
    </a>
  );
};

export default LogInLinkGoogle;
