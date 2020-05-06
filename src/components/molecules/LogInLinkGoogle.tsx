import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { onLinkColor, onLinkColorHover } from '../../style/_globals';

const GOOGLE_LOGIN_LINK = 'https://anyway-mock-server.herokuapp.com/auth/google-login';

const useStyles = makeStyles({
  link: {
    color: `${onLinkColor}`,
    textDecoration: 'none',
    '&:hover': {
      color: `${onLinkColorHover}`,
    },
  },
});
const LogInLinkGoogle = () => {
  const classes = useStyles();

    return <a className={classes.link}  href={GOOGLE_LOGIN_LINK}>LOGIN</a>
};

export default LogInLinkGoogle