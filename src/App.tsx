import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { Footer } from './components/organisms/Footer';
import { Box, createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core';
import { StoreContext, useStore } from './store/storeConfig';
import Header from './components/molecules/Header';
import 'leaflet/dist/leaflet.css';
import PopUpRedirect from './services/PopUpRedirect';
import HomePageRedirect from './pages/HomePageRedirect';
import { useTranslation } from 'react-i18next';

// main components height - must add up to 100
const headerHeight = '5vh';
const pageContentHeight = '88vh';
const footerHeight = '7vh';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      direction: 'rtl',
    },
    pageContent: {
      overflow: 'auto',
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  const store = useStore();
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={store.settingsStore.theme}>
        <Router>
          <Box className={isRtl ? classes.root : ''}>
            <Box height={headerHeight} display="flex">
              <Header />
            </Box>
            <Box height={pageContentHeight} className={classes.pageContent}>
              <Switch>
                <Route exact path="/" component={HomePageRedirect} />
                <Route path="/:lng?/newsflash/:id" component={HomePage} />
                <Route path="/popup-redirect" component={PopUpRedirect}></Route>
              </Switch>
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
