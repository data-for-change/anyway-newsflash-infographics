import { Typography } from 'components/atoms';
import React, { useState } from 'react';
import UserInfoForm, { IFormInput } from './UserUpdateForm';
import { useTranslation } from 'react-i18next';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { oceanBlueColor, skyBlueColor } from 'style';
import Box from '@material-ui/core/Box';

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
}));

interface IUserProfileHeader {
  userDetails: IFormInput;
  isUpdateScreenOpen: boolean;
  handleLogout: () => any;
}
const UserProfileHeader: React.FC<IUserProfileHeader> = ({ userDetails, isUpdateScreenOpen, handleLogout }) => {
  const { t } = useTranslation();
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
        <Typography.Body2>{`${t('header.User Greeting')} ${userDetails.firstName}`}</Typography.Body2>
      </Box>
      <UserInfoForm
        defaultValues={userDetails}
        isShowing={isDialogOpen}
        onClose={() => toggleUserUpdateScreen(false)}
      />
    </>
  );
};

export default UserProfileHeader;
