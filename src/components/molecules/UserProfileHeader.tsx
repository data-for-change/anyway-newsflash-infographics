import { Typography } from 'components/atoms';
import React, { useState } from 'react';
import UserInfoForm, { IFormInput } from './UserUpdateForm';
import AdminManagementForm from './AdminManagementForm';
import { useTranslation } from 'react-i18next';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { oceanBlueColor, skyBlueColor } from 'style';
import Box from '@material-ui/core/Box';
import { Avatar } from '@material-ui/core';
import { IAnywayUserDetails } from '../../services/user.service';
import { ROLE_ADMIN_NAME } from '../../utils/utils';
import { mockAdminManagementData, labels } from '../../services/mocks/adminManagementData.mock.data';

const avatarSize = '40px';

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
    width: avatarSize,
    height: avatarSize,
  },
}));

interface IUserProfileHeader {
  userDetails: IAnywayUserDetails;
  isUpdateScreenOpen: boolean;
  handleLogout: () => any;
  isAdmin: boolean;
}
const UserProfileHeader: React.FC<IUserProfileHeader> = ({
  userDetails,
  isUpdateScreenOpen,
  handleLogout,
  isAdmin,
}) => {
  const { t } = useTranslation();
  const defaultFormInput: IFormInput = {
    email: userDetails.data.email,
    firstName: userDetails.data.firstName,
    lastName: userDetails.data.lastName,
    workplace: userDetails.data.roles.filter((role) => role !== ROLE_ADMIN_NAME)[0], // first role that is not admin
  };
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(isUpdateScreenOpen);
  const toggleUserUpdateScreen = (isOpen: boolean) => setIsDialogOpen(isOpen);

  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState<boolean>(false);
  const toggleAdminManagementScreen = (isOpen: boolean) => setIsAdminDialogOpen(isOpen);

  return (
    // change later to "isAdmin"
    <>
      {true && (
        <Box className={classes.userButton} onClick={() => toggleAdminManagementScreen(true)}>
          {t('header.management')}
        </Box>
      )}
      <Box className={classes.userButton} onClick={handleLogout}>
        {t('UserProfileHeader.logout')}
      </Box>
      <Box className={classes.userButton} onClick={() => toggleUserUpdateScreen(true)}>
        {t('header.User Info Update')}
      </Box>
      <Box className={classes.welcomeMsg}>
        <Typography.Body2>{`${t('header.User Greeting')} ${defaultFormInput.firstName || ''}`}</Typography.Body2>
      </Box>
      <Avatar
        className={classes.avatar}
        alt={defaultFormInput.firstName?.substr(0, 1).toUpperCase()}
        src={userDetails.data.imgUrl}
      />

      <UserInfoForm
        defaultValues={defaultFormInput}
        isShowing={isDialogOpen}
        onClose={() => toggleUserUpdateScreen(false)}
      />

      <AdminManagementForm
        labels={labels}
        defaultValues={mockAdminManagementData}
        isShowing={isAdminDialogOpen}
        onClose={() => toggleAdminManagementScreen(false)}
      />
    </>
  );
};

export default UserProfileHeader;
