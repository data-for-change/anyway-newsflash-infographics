import { makeStyles } from '@material-ui/core/styles';
import { oceanBlueColor, skyBlueColor } from '../../style';
import { Button, Typography } from '../atoms';
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
  firstName?: string;
}
const UserProfileHeader: React.FC<IUserProfileHeader> = ({ firstName }) => {
  const classes = useStyles();

  return (
    <div className={classes.profile}>
      <a className={classes.link} href={LINK}>
        <Button.Standard>LOGOUT</Button.Standard>
      </a>
      <Typography.Body1>{` שלום ${firstName}`}</Typography.Body1>
    </div>
  );
};

export default UserProfileHeader;
