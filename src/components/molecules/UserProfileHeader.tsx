import { makeStyles } from '@material-ui/core/styles';
import { oceanBlueColor, skyBlueColor } from '../../style';
import { Typography } from '../atoms';
import React from 'react';
import { authServerUrl } from '../../utils/utils';

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

  return (
    <div className={classes.profile}>
      <a className={classes.link} href={LINK}>
        <Typography.Body1>LOGOUT</Typography.Body1>
      </a>
      <Typography.Body1>{`שלום ${name}`}</Typography.Body1>
    </div>
  );
};

export default UserProfileHeader;
