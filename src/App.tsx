import { Box, Theme, ThemeProvider, StyledEngineProvider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
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


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


// main components height - must add up to 100
const headerHeight = '5vh';
const pageContentHeight = '88vh';
const footerHeight = '7vh';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageContent: {
      overflow: 'auto',
    },
  }),
);

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
    <StoreContext.Provider value={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={store.settingsStore.theme}>
          <Router>
            <Box>
              <Box height={headerHeight} display="flex">
                <Header />
              </Box>
              <Box height={pageContentHeight} className={useStyles().pageContent}>
                <Switch>
                  <Route exact path="/" component={HomePageRedirect} />
                  <Route path="/:lng?/newsflash/:id" component={HomePage} />
                  <Route path="/login-popup-redirect" component={PopUpRedirect} />
                </Switch>
              </Box>
              <Box height={footerHeight} display="flex">
                <Footer />
              </Box>
            </Box>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </StoreContext.Provider>
  );
};
export default App;
