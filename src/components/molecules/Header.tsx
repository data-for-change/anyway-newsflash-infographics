import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import anywayLogo from 'assets/anyway.png';
import { AppBar, Button, Logo } from 'components/atoms';
import { SignInIcon } from 'components/atoms/SignInIcon';
import MapDialog from 'components/molecules/MapDialog';
import LanguageMenu from 'components/organisms/LanguageMenu';
import { observer } from 'mobx-react-lite';
import { IPoint } from 'models/Point';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RootStore from 'store/root.store';
import { useStore } from 'store/storeConfig';
import { FEATURE_FLAGS } from 'utils/env.utils';
import LogInLinkGoogle from './LogInLinkGoogle';
import UserProfileHeader from './UserProfileHeader';

const PREFIX = 'Header';

const classes = {
  userSection: `${PREFIX}-userSection`,
};

const StyledAppBar = styled(AppBar)({
  [`& .${classes.userSection}`]: {
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

  const onLocationChange = (location: IPoint) => {
    store.fetchGpsLocation(location);
    setLocation(location);
  };

  const onLocationSearch = () => {
    if (roadSegmentLocation) {
      store.fetchSelectedNewsFlashWidgetsByLocation(roadSegmentLocation?.road_segment_id, selectedLanguage);
      setOpen(false);
    }
  };

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
    <StyledAppBar>
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
    </StyledAppBar>
  );
};

export default observer(Header);
