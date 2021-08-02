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
import { FEATURE_FLAGS } from '../../utils/env.utils';

const useStyles = makeStyles({
  userSection: {
    display: 'flex',
    alignItems: 'center',
  },
});

const reloadHomePage = () => {
  document.location.href = '/';
};

const Header: FC = () => {
  const store: RootStore = useStore();
  const isUserDetailsRequired: boolean = store.userInfo?.meta.isCompleteRegistration === false;

  const classes = useStyles();
  useEffect(() => {
    store.getUserLoginDetails();
  }, [store]);

  let authElement;
  if (FEATURE_FLAGS.login) {
    //login or logout- depend on authentication state
    if (store.isUserAuthenticated) {
      const { ...userDetails } = store.userInfo!.data;
      const handleLogout = () => {
        store.logOutUser();
      };
      authElement = (
        <UserProfileHeader
          handleLogout={handleLogout}
          isUpdateScreenOpen={isUserDetailsRequired}
          userDetails={userDetails}
        />
      );
    } else {
      authElement = <LogInLinkGoogle />;
    }
  }

  if (FEATURE_FLAGS.login) {
    return <AppBar>
      <Logo src={AnywayImage} alt={'Anyway'} height={30} onClick={reloadHomePage} />
      <Box className={classes.userSection}>
        {authElement}
      </Box>
    </AppBar>
  } else {
    return <AppBar>
      <Logo src={AnywayImage} alt={'Anyway'} height={30} onClick={reloadHomePage} />
      <Box className={classes.userSection}>
        <LanguageMenu />
        {authElement && (
          <>
            {authElement}
            <SignInIcon />
          </>
        )}
      </Box>
    </AppBar>
  };
};

export default observer(Header);
