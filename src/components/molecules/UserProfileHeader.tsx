import { Button, Typography } from '../atoms';
import React, { useState } from 'react';
import UserInfoForm, { IFormInput } from './UserUpdateForm';
import { useTranslation } from 'react-i18next';

interface IUserProfileHeader {
  userDetails: IFormInput;
  isUpdateScreenOpen: boolean;
  handleLogout: () => any;
}
const UserProfileHeader: React.FC<IUserProfileHeader> = ({ userDetails, isUpdateScreenOpen, handleLogout }) => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(isUpdateScreenOpen);
  const toggleUserUpdateScreen = (isOpen: boolean) => setIsDialogOpen(isOpen);

  return (
    <>
      <Button.Standard onClick={handleLogout}>LOGOUT</Button.Standard>
      <Button.Standard onClick={() => toggleUserUpdateScreen(true)}>{t('header.userinfoUpdate')}</Button.Standard>
      <Typography.Body1>
        <span>{`${t('header.userGreeting')} ${userDetails.firstName}`}</span>
      </Typography.Body1>
      <UserInfoForm
        defaultValues={userDetails}
        isShowing={isDialogOpen}
        onClose={() => toggleUserUpdateScreen(false)}
      />
    </>
  );
};

export default UserProfileHeader;
