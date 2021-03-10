import { makeStyles } from '@material-ui/core/styles';
import { oceanBlueColor, skyBlueColor } from '../../style';
import { Typography } from '../atoms';
import React from 'react';
import { openSignInWindow } from '../../services/signInWindow';
import { authServerUrl , redirectUrl} from '../../utils/utils';
import { AnyWayButton } from '../atoms/AnyWayButton';

const url :URL = new URL(`${authServerUrl}authorize/google`);
url.searchParams.append('redirect_url', redirectUrl!);


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
    openSignInWindow(url, 'Google Authentication');
  };
  return (
    <AnyWayButton className={classes.link} onClick={handleClick}>
      <Typography.Body4>LOGIN</Typography.Body4>
    </AnyWayButton>
  );
};

export default LogInLinkGoogle;
