import { Box } from '@mui/material';
import { StyledEngineProvider, ThemeProvider, styled, useTheme } from '@mui/material/styles';
import 'leaflet/dist/leaflet.css';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PopUpRedirect from './components/atoms/PopUpRedirect';
import Header from './components/molecules/Header';
import { Footer } from './components/organisms/Footer';
import HomePage from './pages/HomePage';
import HomePageRedirect from './pages/HomePageRedirect';
import { StoreContext, useStore } from './store/storeConfig';

const PREFIX = 'App';

const classes = {
  pageContent: `${PREFIX}-pageContent`,
};

const StyledStoreContextProvider = styled(StoreContext.Provider)(({ theme: Theme }) => ({
  [`& .${classes.pageContent}`]: {
    overflow: 'auto',
  },
}));

// main components height - must add up to 100
const headerHeight = '5vh';
const footerHeight = '7vh';

const App: FC = () => {
  const { i18n } = useTranslation();
  const store = useStore();
  const theme = useTheme();

  const appDir = i18n.dir();

  useEffect(() => {
    // https://mui.com/guides/right-to-left/
    document.body.dir = appDir;
    theme.direction = appDir;
  }, [i18n, theme, theme.direction, appDir]);

  return (
    <StyledStoreContextProvider value={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={store.settingsStore.theme}>
          <Router>
            <Box>
              <Box height={headerHeight} display="flex">
                <Header />
              </Box>
              <Switch>
                <Route exact path="/" component={HomePageRedirect} />
                <Route path="/:lng?/newsflash/:id" component={HomePage} />
                <Route path="/login-popup-redirect" component={PopUpRedirect} />
              </Switch>
              <Box height={footerHeight} display="flex">
                <Footer />
              </Box>
            </Box>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </StyledStoreContextProvider>
  );
};
export default App;
