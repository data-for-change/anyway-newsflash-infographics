import { makeStyles } from '@material-ui/core/styles';
import { oceanBlueColor, skyBlueColor } from '../../style';
import { Typography } from '../atoms';
import React from 'react';
import { openSignInWindow } from '../../services/signInWindow';
import { authServerUrl, redirectUrl } from '../../utils/utils';
import { AnyWayButton } from '../atoms/AnyWayButton';
import { useTranslation } from 'react-i18next';

const url: URL = new URL(`${authServerUrl}authorize/google`);
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
  const { t } = useTranslation();
  const handleClick = () => {
    openSignInWindow(url, 'Google Authentication');
  };
  return (
    <AnyWayButton className={classes.link} onClick={handleClick}>
      <Typography.Body4>{t('login')}</Typography.Body4>
    </AnyWayButton>
  );
};

export default LogInLinkGoogle;
