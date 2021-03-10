import { makeStyles } from '@material-ui/core/styles';
import { oceanBlueColor, skyBlueColor } from '../../style';
import { Typography } from '../atoms';
import React from 'react';
import { AUTH_LOGIN_GOOGLE_URL } from '../../utils/utils';
import { AnyWayButton } from '../atoms/AnyWayButton';

const useStyles = makeStyles({
  link: {
    color: `${oceanBlueColor}`,
    textDecoration: 'none',
    '&:hover': {
      color: `${skyBlueColor}`,
    },
    cursor: 'pointer',
  },
});

const LogInLinkGoogle = () => {
  const classes = useStyles();
  const handleClick = () => {
    //openSignInWindow(AUTH_LOGIN_GOOGLE_URL, 'Google Authentication');
  };
  return (
    <AnyWayButton className={classes.link} onClick={handleClick}>
      <Typography.Body4>
        <a href={AUTH_LOGIN_GOOGLE_URL.toString()}>LOGIN</a>
      </Typography.Body4>
    </AnyWayButton>
  );
};

export default LogInLinkGoogle;
