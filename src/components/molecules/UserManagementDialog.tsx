import  React from 'react'
import { IAnywayUserDetails } from '../../services/user.service';
import DialogWithHeader from './DialogWithHeader';
import { useTranslation } from 'react-i18next';



interface IUserManagementDialog {
  users : Array<IAnywayUserDetails>;
  isShowing : boolean;
  onClose : () => any;
}


const UserManagementDialog : React.FC<IUserManagementDialog> = ({users,isShowing, onClose}) => {
  const { t } =  useTranslation();
  return (
    <DialogWithHeader title={t('usersManagement.title')} isShowing={isShowing} onClose={onClose}/>
  )
}


export default UserManagementDialog
