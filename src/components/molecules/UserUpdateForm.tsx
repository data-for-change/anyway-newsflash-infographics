import React from 'react';
import DialogWithHeader from './DialogWithHeader';
import { FormControl, Input } from '@material-ui/core';
import { useStore } from '../../store/storeConfig';

interface IProps{
  email? :string;
  isShowing :boolean,


}

const UserInfoForm :React.FC<IProps> = ({email,isShowing}) => {

  const store = useStore();

  const  handleClose = ()=>{

  }

  return (
    <DialogWithHeader isShowing={isShowing} title={'other Details'} onClose={handleClose}>
      <FormControl focused>
        <Input id='name'placeholder={'Please enter your name'}/>
        <Input  id = 'email' defaultValue={store.userInfo.email} placeholder={'Please enter your name'}/>
        <Input placeholder={'Please enter Your Name'}/>

      </FormControl>

    </DialogWithHeader>
  )
}

export default UserInfoForm;
