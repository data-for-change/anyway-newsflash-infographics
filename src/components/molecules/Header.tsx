import { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { AppBar, Button, Logo } from 'components/atoms';
import LogInLinkGoogle from './LogInLinkGoogle';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';
import UserProfileHeader from './UserProfileHeader';
import LanguageMenu from 'components/organisms/LanguageMenu';
import { FEATURE_FLAGS } from 'utils/env.utils';
import anywayLogo from 'assets/anyway.png';
import { SignInIcon } from 'components/atoms/SignInIcon';
import MapDialog from 'components/molecules/MapDialog';
import { IPoint } from 'models/Point';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const classes = useStyles();
  const store: RootStore = useStore();
  const { userStore, settingsStore } = store;

  const [open, setOpen] = useState(false);

  const isUserDetailsRequired: boolean = !userStore.userInfo?.meta.isCompleteRegistration;
  const roadSegmentLocation = store.gpsLocationData;

  const onLocationChange = useCallback(
    (location: IPoint) => {
      store.fetchGpsLocation(location);
    },
    [store],
  );

  const onLocationSearch = () => {
    if (roadSegmentLocation) {
      navigate(`${settingsStore.currentLanguageRouteString}/location/${roadSegmentLocation?.road_segment_id}`);
      setOpen(false);
      store.setGpsLocationData(null);
    }
  };

  const onStreetAndCitySearch = (street?: string, city?: string) => {
    // change to constant values until backend issues are fixed
    console.log('city is', city);
    console.log('street is', street);
    navigate(`${settingsStore.currentLanguageRouteString}/cityAndStreet/${street}/${city}`);
    setOpen(false);
  };

  useEffect(() => {
    userStore.getUserLoginDetails();
  }, [userStore]);

  let authElement;
  const logo = anywayLogo;
  if (FEATURE_FLAGS.login) {
    //login or logout- depend on authentication state
    if (userStore.isUserAuthenticated) {
      const { ...userDetails } = userStore.userInfo;
      const handleLogout = () => {
        userStore.logOutUser();
      };
      authElement = (
        <UserProfileHeader
          isAdmin={userStore.isAdmin}
          handleLogout={handleLogout}
          isUpdateScreenOpen={isUserDetailsRequired}
          userDetails={userDetails}
        />
      );
    } else {
      authElement = (
        <>
          <LogInLinkGoogle />
          <SignInIcon />
        </>
      );
    }
  }

  return (
    <AppBar>
      <Logo src={logo} alt={'Anyway'} height={30} onClick={reloadHomePage} />
      <Box className={classes.userSection}>
        <Button.Standard onClick={() => setOpen(true)}>{t('header.Search')}</Button.Standard>
        {FEATURE_FLAGS.language && <LanguageMenu />}
        {authElement}
      </Box>
      <MapDialog
        open={open}
        section={roadSegmentLocation?.road_segment_name}
        roadNumber={roadSegmentLocation?.road1}
        onLocationChange={onLocationChange}
        onClose={() => {
          setOpen(false);
          store.setGpsLocationData(null);
        }}
        onSearch={onLocationSearch}
        onStreetAndCitySearch={onStreetAndCitySearch}
      />
    </AppBar>
  );
};

export default observer(Header);
