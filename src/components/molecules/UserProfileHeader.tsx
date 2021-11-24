import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Typography } from 'components/atoms';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { oceanBlueColor, skyBlueColor } from 'style';
import { IUserInfo } from 'services/user.service';
import UserInfoForm from './UserUpdateForm';

const PREFIX = 'UserProfileHeader';

const classes = {
  userButton: `${PREFIX}-userButton`,
  welcomeMsg: `${PREFIX}-welcomeMsg`,
  avatar: `${PREFIX}-avatar`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.userButton}`]: {
    color: `${oceanBlueColor}`,
    padding: theme.spacing(1),
    textDecoration: 'none',
    '&:hover': {
      color: `${skyBlueColor}`,
    },
    cursor: 'pointer',
  },

  [`& .${classes.welcomeMsg}`]: {
    padding: theme.spacing(1),
  },

  [`& .${classes.avatar}`]: {
    width: avatarSize,
    height: avatarSize,
  },
}));

const avatarSize = '40px';

interface IUserProfileHeader {
  userDetails: IUserInfo;
  isUpdateScreenOpen: boolean;
  handleLogout: () => any;
}
const UserProfileHeader: React.FC<IUserProfileHeader> = ({ userDetails, isUpdateScreenOpen, handleLogout }) => {
  const { t } = useTranslation();
  const userData = userDetails.data;

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(isUpdateScreenOpen);
  const toggleUserUpdateScreen = (isOpen: boolean) => setIsDialogOpen(isOpen);

  return (
    <Root>
      <Box className={classes.userButton} onClick={handleLogout}>
        {t('UserProfileHeader.logout')}
      </Box>
      <Box className={classes.userButton} onClick={() => toggleUserUpdateScreen(true)}>
        {t('header.User Info Update')}
      </Box>
      <Box className={classes.welcomeMsg}>
        <Typography.Body2>{`${t('header.User Greeting')} ${userData.firstName || ''}`}</Typography.Body2>
      </Box>
      <Avatar className={classes.avatar} alt={userData.firstName?.substr(0, 1).toUpperCase()} src={userData.imgUrl} />
      <UserInfoForm defaultValues={userData} isShowing={isDialogOpen} onClose={() => toggleUserUpdateScreen(false)} />
    </Root>
  );
};

export default UserProfileHeader;
