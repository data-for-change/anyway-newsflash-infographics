import { FC, useEffect, useState } from 'react';
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
import MapDialog from 'components/molecules/MapDialog';
import { IPoint } from 'models/Point';


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
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<IPoint | undefined>();

  const isUserDetailsRequired: boolean = !store.userInfo?.meta.isCompleteRegistration;
  const roadSegmentLocation = store.gpsLocationData;
  const selectedLanguage = store.selectedLanguage;
  const { t } = useTranslation();

  const classes = useStyles();

  const onLocationChange = (location: IPoint) => {
    store.fetchGpsLocation(location);
    setLocation(location);
  };

  const onLocationSearch = () => {
    if (roadSegmentLocation) {
      store.fetchSelectedNewsFlashWidgetsByLocation(roadSegmentLocation?.road_segment_id, selectedLanguage);
      setOpen(false);
    }
  }

  useEffect(() => {
    store.getUserLoginDetails();
  }, [store]);

  let authElement;
  const logo = anywayLogo;
  if (FEATURE_FLAGS.login) {
    //login or logout- depend on authentication state
    if (store.isUserAuthenticated) {
      const { ...userDetails } = store.userInfo;
      const handleLogout = () => {
        store.logOutUser();
      };
      authElement = (
        <UserProfileHeader
          isAdmin={store.isAdmin}
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
        <Button.Standard onClick={() => setOpen(true)}>{t('header.Search')}</Button.Standard>
        {FEATURE_FLAGS.language && <LanguageMenu />}
        {authElement}
      </Box>
      <MapDialog
        open={open}
        location={location}
        section={roadSegmentLocation?.road_segment_name}
        onLocationChange={onLocationChange}
        onClose={() => {
          setOpen(false);
          setLocation(undefined);
        }}
        onSearch={onLocationSearch}
      />
    </AppBar>
  );
};

export default observer(Header);
