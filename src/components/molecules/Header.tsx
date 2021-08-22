import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AppBar, Logo } from '../atoms';
import LogInLinkGoogle from './LogInLinkGoogle';
import { Box } from '@material-ui/core';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import UserProfileHeader from './UserProfileHeader';
import { makeStyles } from '@material-ui/core/styles';
import LanguageMenu from '../organisms/LanguageMenu';
import { FEATURE_FLAGS } from '../../utils/env.utils';
import { anywayLogo } from '../../utils/LogoMap';

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
  const isUserDetailsRequired: boolean = !!store.userInfo?.meta.isCompleteRegistration;

  const classes = useStyles();
  useEffect(() => {
    store.getUserLoginDetails();
  }, [store]);

  let authElement;
  let logo : string = '';
  if (FEATURE_FLAGS.login) {
    //login or logout- depend on authentication state
    if (store.isUserAuthenticated) {
      const { ...userDetails } = store.userInfo;
       logo = anywayLogo  ;
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
      logo = anywayLogo;
    }
  }

  return (
    <AppBar>
      <Logo src={logo} alt={'Anyway'} height={30} onClick={reloadHomePage} />
      <Box className={classes.userSection}>
        <LanguageMenu />
        {authElement && (
          <>
            {authElement}
          </>
        )}
      </Box>
    </AppBar>
  );
};

export default observer(Header);
