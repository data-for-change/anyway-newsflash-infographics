import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AnywayAppBar } from '../atoms';
import { Logo } from '../atoms/Logo';
import AnywayImage from '../../assets/anyway.png';
import { SignInIcon } from '../atoms/SignInIcon';
import LogInLinkGoogle from './LogInLinkGoogle';
import { Box } from '@material-ui/core';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import UserProfileHeader from './UserProfileHeader';
import { makeStyles } from '@material-ui/core/styles';
import LanguageButtons from '../molecules/LanguageButtons';

const useStyles = makeStyles({
  settingsBox: {
    display: 'flex',
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
  if (store.isUserAuthenticated) {
    authElement = <UserProfileHeader name={store.userName} />;
  } else {
    authElement = (
      <div>
        <LogInLinkGoogle />
      </div>
    );
  }
  return (
    <AnywayAppBar>
      <Logo src={AnywayImage} alt={'Anyway'} height={'30px'} onClick={reloadHomePage} />
      <Box className={classes.settingsBox}>
        <LanguageButtons />
        {authElement}
        <SignInIcon />
      </Box>
    </AnywayAppBar>
  );
};

export default observer(Header);
