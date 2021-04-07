import { makeStyles } from '@material-ui/core/styles';
import { oceanBlueColor, skyBlueColor } from '../../style';
import { Button, Typography } from '../atoms';
import React, { useState } from 'react';
import { authServerUrl, useQuery } from '../../utils/utils';
import UserInfoForm from './UserUpdateForm';

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
  userGreeting: {
    color: 'black',
  },
});

interface IUserProfileHeader {
  firstName?: string;
}
const UserProfileHeader: React.FC<IUserProfileHeader> = ({ firstName }) => {
  const classes = useStyles();
  const userUpdateScreen = useQuery().get('updateUser') === 'true';

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(userUpdateScreen);
  const toggleUserUpdateScreen = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
  };
  return (
   <>
      <a className={classes.link} href={LINK}>
        <Button.Standard>LOGOUT</Button.Standard>
      </a>
      <Button.Standard onClick={toggleUserUpdateScreen.bind(null, true)}> User Info </Button.Standard>
      <Typography.Body1><span className={classes.userGreeting}>{` שלום ${firstName}`}</span></Typography.Body1>
      <UserInfoForm isShowing={isDialogOpen} onClose={toggleUserUpdateScreen.bind(null, false)} />
    </>
  );
};

export default UserProfileHeader;
