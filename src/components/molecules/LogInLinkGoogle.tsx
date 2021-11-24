import { styled } from '@mui/material/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { openSignInWindow } from 'services/signInWindow';
import { oceanBlueColor, skyBlueColor } from 'style';
import { AUTH_LOGIN_GOOGLE_URL } from 'utils/utils';

const PREFIX = 'LogInLinkGoogle';

const classes = {
  userButton: `${PREFIX}-userButton`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.userButton}`]: {
    padding: theme.spacing(1),
    color: `${oceanBlueColor}`,
    textDecoration: 'none',
    '&:hover': {
      color: `${skyBlueColor}`,
    },
    cursor: 'pointer',
  },
}));

const LogInLinkGoogle = () => {
  const { t } = useTranslation();
  const handleClick = () => {
    openSignInWindow(AUTH_LOGIN_GOOGLE_URL, 'Google Authentication');
  };
  return (
    <Root onClick={handleClick} className={classes.userButton}>
      {t('login')}
    </Root>
  );
};

export default LogInLinkGoogle;
