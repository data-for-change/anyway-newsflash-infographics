import React, { FC, useEffect } from 'react';
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
import { useTheme } from '@material-ui/core/styles';
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

  useEffect(() => {
    // https://material-ui.com/guides/right-to-left/
    //add dir tag to the body
    document.body.dir = i18n.dir();
    //change dir in theme
    theme.direction = i18n.dir();
  }, [i18n, theme.direction, store.changeLanguage]);

  return (
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={store.settingsStore.theme}>
        <Router>
          <Box>
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
