import { makeStyles } from '@material-ui/core/styles';
import { oceanBlueColor, skyBlueColor } from '../../style';
import { Button } from '../atoms';
import React from 'react';
import { AUTH_LOGIN_GOOGLE_URL } from '../../utils/utils';
import { AnyWayButton } from '../atoms/AnyWayButton';
import { openSignInWindow } from '../../services/signInWindow';
import { useTranslation } from 'react-i18next';
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
    openSignInWindow(AUTH_LOGIN_GOOGLE_URL, 'Google Authentication');
  };
  return (
    <AnyWayButton className={classes.link} onClick={handleClick}>
      <Button.Standard onClick={handleClick}>{t('login')}</Button.Standard>
    </AnyWayButton>
  );
};

export default LogInLinkGoogle;
