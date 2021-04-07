import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AppBar, Logo } from '../atoms';
import AnywayImage from '../../assets/anyway.png';
import { SignInIcon } from '../atoms/SignInIcon';
import LogInLinkGoogle from './LogInLinkGoogle';
import { Box } from '@material-ui/core';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import UserProfileHeader from './UserProfileHeader';
import { makeStyles } from '@material-ui/core/styles';
import LanguageMenu from '../organisms/LanguageMenu';

const useStyles = makeStyles({
  settings: {
    display: 'flex',
    width: '40%',
    justifyContent: 'space-evenly',
  },
});

const reloadHomePage = () => {
  document.location.href = '/';
};

const Header: FC = () => {
  const store: RootStore = useStore();
  const classes = useStyles();
  useEffect(() => {
    store.getUserLoginDetails();
  }, [store]);
  //login or logout- depend on authentication state
  let authElement;
  const userInfo = store.userInfo;
  if (userInfo.email) {
    authElement = <UserProfileHeader firstName={userInfo.firstName} />;
  } else {
    authElement = (
      <div>
        <LogInLinkGoogle />
      </div>
    );
  }
  return (
    <AppBar>
      <Logo src={AnywayImage} alt={'Anyway'} height={30} onClick={reloadHomePage} />
      <Box className={classes.settings}>
        <LanguageMenu />
        {authElement}
        <SignInIcon />
      </Box>
    </AppBar>
  );
};

export default observer(Header);
