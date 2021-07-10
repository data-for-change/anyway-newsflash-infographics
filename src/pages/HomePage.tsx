import React, { FC, useEffect } from 'react';
import WidgetsTemplate from '../components/organisms/WidgetsTemplate';
import { Box } from '@material-ui/core';
import SideBar from '../components/organisms/SideBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { RouteComponentProps, Redirect } from 'react-router';
import { silverSmokeColor } from '../style';
import FilterBar from '../components/organisms/FilterBar';
import OverlayLoader from '../components/molecules/OverlayLoader';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeConfig';
import RootStore from '../store/root.store';
import DemoPage from './DemoPage';
import { Route, Switch } from 'react-router-dom';

interface IProps {}

interface IRouteProps {
  id?: string;
  lng?: string;
}

const useStyles = makeStyles({
  mainBox: {
    height: 'inherit',
  },

  widgetBox: {
    height: 'inherit',
    overflow: 'auto',
  },
  sideBarWrapper: {
    borderInlineEnd: `1px solid ${silverSmokeColor}`,
  },
});

const HomePage: FC<IProps & RouteComponentProps<IRouteProps>> = ({ match }) => {
  const classes = useStyles();
  const store: RootStore = useStore();
  const id = match.params.id ? parseInt(match.params.id) : null;
  const loading = store.widgetBoxLoading;

  useEffect(() => {
    if (id) {
      store.selectNewsFlash(id);
    }
  }, [id, store]);

  useEffect(() => {
    if (match.params.lng) {
      store.changeLanguage(match.params.lng);
    } else {
      store.changeLanguage('he');
    }
  }, [match.params.lng, store]);

  if (!id) {
    return <Redirect to="/" />;
  }

  return (
    <Box display="flex" flexGrow={1} className={classes.mainBox}>
      <Box flexGrow={1} width={319} display="flex" borderColor={silverSmokeColor} className={classes.sideBarWrapper}>
        <SideBar />
      </Box>
      <Box flexGrow={5} className={classes.widgetBox} position="relative">
        <OverlayLoader show={loading} />
        <FilterBar />
        {/* main Content */}
        <Switch>
          <Route path="/:lng?/newsflash/999" component={DemoPage} />
          <Route path="/:lng?/newsflash/:id" component={WidgetsTemplate} />
        </Switch>
      </Box>
    </Box>
  );
};

export default observer(HomePage);
