import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { AppBar, Logo } from '../atoms';
import AnywayImage from '../../assets/anyway.png';
import { SignInIcon } from '../atoms/SignInIcon';
import LogInLinkGoogle from './LogInLinkGoogle';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LanguageMenu from '../organisms/LanguageMenu';

const useStyles = makeStyles({
  settings: {
    display: 'flex',
  },
});

const reloadHomePage = () => {
  document.location.href = '/';
};
// comment out user details from auth server until cors policy bloc  will be handled.
const Header: FC = () => {
  //const store: RootStore = useStore();
  const classes = useStyles();
  /*useEffect(() => {
    store.getUserLoginDetails();
  }, [store]);*/
  //login or logout- depend on authentication state
  /*if (store.isUserAuthenticated) {
    authElement = <UserProfileHeader name={store.userName} />;
  } else {*/
  const authElement = (
    <div>
      <LogInLinkGoogle />
    </div>
  );
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
