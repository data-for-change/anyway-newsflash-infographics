import { Typography } from '../atoms';
import React, { useState } from 'react';
import UserInfoForm  from './UserUpdateForm';
import { useTranslation } from 'react-i18next';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { oceanBlueColor, skyBlueColor } from '../../style';
import Box from '@material-ui/core/Box';
import { Avatar } from '@material-ui/core';
import { ActualiUserInfo } from '../../services/user.service';

const useStyles = makeStyles((theme) => ({
  userButton: {
    color: `${oceanBlueColor}`,
    padding: theme.spacing(1),
    textDecoration: 'none',
    '&:hover': {
      color: `${skyBlueColor}`,
    },
    cursor: 'pointer',
  },
  welcomeMsg: {
    padding: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  }
}));

interface IUserProfileHeader {
  userDetails: ActualiUserInfo;
  isUpdateScreenOpen: boolean;
  handleLogout: () => any;
}
const UserProfileHeader: React.FC<IUserProfileHeader> = ({ userDetails, isUpdateScreenOpen, handleLogout }) => {
  const { t } = useTranslation();
  const userData = userDetails.data
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(isUpdateScreenOpen);
  const toggleUserUpdateScreen = (isOpen: boolean) => setIsDialogOpen(isOpen);

  return (
    <>
      <Box className={classes.userButton} onClick={handleLogout}>
        {t('UserProfileHeader.logout')}
      </Box>
      <Box className={classes.userButton} onClick={() => toggleUserUpdateScreen(true)}>
        {t('header.User Info Update')}
      </Box>
      <Box className={classes.welcomeMsg}>
        <Typography.Body2>{`${t('header.User Greeting')} ${userData.firstName || ''}`}</Typography.Body2>
      </Box>
      <Avatar className={classes.avatar} alt={userData.firstName?.substr(0,1).toUpperCase()} src={userData.imgUrl} />

      <UserInfoForm
        defaultValues={userData}
        isShowing={isDialogOpen}
        onClose={() => toggleUserUpdateScreen(false)}
      />
    </>
  );
};

export default UserProfileHeader;
