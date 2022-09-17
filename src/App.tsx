import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { Footer } from './components/organisms/Footer';
import { Box, createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core';
import { StoreContext, useStore } from './store/storeConfig';
import Header from './components/molecules/Header';
import 'leaflet/dist/leaflet.css';
import HomePageRedirect from './pages/HomePageRedirect';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';
import PopUpRedirect from './components/atoms/PopUpRedirect';
import WidgetsTemplate from './components/organisms/WidgetsTemplate';
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
  const classes = useStyles();
  const store = useStore();
  const theme = useTheme();

  const appDir = i18n.dir();

  useEffect(() => {
    // https://material-ui.com/guides/right-to-left/
    document.body.dir = appDir;
    theme.direction = appDir;
  }, [i18n, theme, theme.direction, appDir]);

  return (
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={store.settingsStore.theme}>
        <Router>
          <Box>
            <Box height={headerHeight} display="flex">
              <Header />
            </Box>
            <Box height={pageContentHeight} className={classes.pageContent}>
              <Routes>
                <Route path="/" element={<HomePageRedirect />} />
                <Route path="/login-popup-redirect" element={<PopUpRedirect />} />
                <Route element={<HomePage />}>
                  <Route path="/:lng/newsflash/:newsId/*" element={<WidgetsTemplate />} />
                  <Route path="/newsflash/:newsId/*" element={<WidgetsTemplate />} />
                  <Route path="/:lng/location/:gpsId/*" element={<WidgetsTemplate />} />
                  <Route path="/location/:gpsId/*" element={<WidgetsTemplate />} />
                  <Route path="/:lng/cityAndStreet/:city/:street/*" element={<WidgetsTemplate />} />
                  <Route path="/cityAndStreet/:city/:street/*" element={<WidgetsTemplate />} />
                </Route>
              </Routes>
            </Box>
            <Box height={footerHeight} display="flex">
              <Footer />
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </StoreContext.Provider>
  );
};
export default App;
