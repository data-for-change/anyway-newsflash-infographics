import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { AppBar,Button, Logo } from 'components/atoms';
import LogInLinkGoogle from './LogInLinkGoogle';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';
import UserProfileHeader from './UserProfileHeader';
import LanguageMenu from 'components/organisms/LanguageMenu';
import { FEATURE_FLAGS } from 'utils/env.utils';
import anywayLogo from 'assets/anyway.png';
import { SignInIcon } from 'components/atoms/SignInIcon';


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
  const isUserDetailsRequired: boolean = !store.userInfo?.meta.isCompleteRegistration;
  const { t } = useTranslation();

  const classes = useStyles();
  useEffect(() => {
    store.getUserLoginDetails();
  }, [store]);

  let authElement;
  let logo : string = anywayLogo;
  if (FEATURE_FLAGS.login) {
    //login or logout- depend on authentication state
    if (store.isUserAuthenticated) {
      const { ...userDetails } = store.userInfo;
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
      authElement = <>
        <LogInLinkGoogle />
      <SignInIcon/>
      </>;
    }
  }

  return (
    <AppBar>
      <Logo src={logo} alt={'Anyway'} height={30} onClick={reloadHomePage} />
      <Box className={classes.userSection}>
        {FEATURE_FLAGS.location_search && <Button.Standard>{t('header.Search')}</Button.Standard>}
        {FEATURE_FLAGS.language && <LanguageMenu />}
        {authElement}
      </Box>
    </AppBar>
  );
};

export default observer(Header);
