import { makeStyles } from '@material-ui/core/styles';
import { oceanBlueColor, skyBlueColor } from '../../style';
import { Typography } from '../atoms';
import React from 'react';
import { authServerUrl } from '../../utils/utils';
import { useTranslation } from 'react-i18next';

const LINK = `${authServerUrl}/auth/logout`;

const useStyles = makeStyles({
  link: {
    color: `${oceanBlueColor}`,
    textDecoration: 'none',
    '&:hover': {
      color: `${skyBlueColor}`,
    },
    cursor: 'pointer',
  },
  profile: {
    color: 'black',
  },
});

interface IUserProfileHeader {
  name: string;
}
const UserProfileHeader: React.FC<IUserProfileHeader> = ({ name }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.profile}>
      <a className={classes.link} href={LINK}>
        <Typography.Body1>{t('UserProfileHeader.logout')}</Typography.Body1>
      </a>
      <Typography.Body1>{`${t('UserProfileHeader.hallo')} ${name}`}</Typography.Body1>
    </div>
  );
};

export default UserProfileHeader;
