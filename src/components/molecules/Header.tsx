import React, {FC, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { AnywayAppBar } from '../atoms/AnywayAppBar';
import { Logo } from '../atoms/Logo';
import AnywayImage from '../../assets/anyway.png';
import { SignInIcon } from '../atoms/SignInIcon';
import LogInLinkGoogle from './LogInLinkGoogle';
import { Box } from '@material-ui/core'
import {useStore} from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import UserProfileHeader from './UserProfileHeader';


 const Header: FC = () => {
  const store : RootStore = useStore();

  useEffect(()=>{
    store.getUserLoginDetails();
  },[store]);
  let logElement;
  if(store.isUserAuthenticated){
    logElement = <UserProfileHeader name={store.userName}/>
  }
  else{
    logElement = <div>
      <LogInLinkGoogle/>
      <SignInIcon/>
    </div>
  }
  return (
    <AnywayAppBar>
      <Logo src={AnywayImage} alt={'Anyway'} height={'30px'} />
      <Box >
        {logElement}
      </Box>
    </AnywayAppBar>
  );
};

 export default observer(Header);
