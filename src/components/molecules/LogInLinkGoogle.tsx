import { makeStyles } from '@material-ui/core/styles';
import { oceanBlue, skyBlue } from '../../style';
import { Typography } from '../atoms';
import React from 'react';
import { openSignInWindow } from '../../services/signInWindow';
import { authServerUrl } from '../../utils/utils';
import { AnyWayButton } from '../atoms/AnyWayButton';

const LINK = `${authServerUrl}/auth/google-login`;

const useStyles = makeStyles({
  link: {
    color: `${oceanBlue}`,
    textDecoration: 'none',
    '&:hover': {
      color: `${skyBlue}`,
    },
    cursor: 'pointer',
  },
});
const LogInLinkGoogle = () => {
  const classes = useStyles();
  const handleClick = () => {
    openSignInWindow(LINK, 'Google Authentication');
  };
  return (
    <AnyWayButton className={classes.link} onClick={handleClick}>
      <Typography.Body4>LOGIN</Typography.Body4>
    </AnyWayButton>
  );
};

export default LogInLinkGoogle;
