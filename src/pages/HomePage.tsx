import React, { FC, useEffect } from 'react';
import WidgetsTemplate from '../components/organisms/WidgetsTemplate';
import { Box } from '@material-ui/core';
import SideBar from '../components/organisms/SideBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { RouteComponentProps, Redirect } from 'react-router';
import { cloud } from '../style';
import FilterBar from '../components/organisms/FilterBar';
import OverlayLoader from '../components/molecules/OverlayLoader';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeConfig';
import RootStore from '../store/root.store';

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
});

const HomePage: FC<IProps & RouteComponentProps<IRouteProps>> = ({ match }) => {
  const classes = useStyles();
  const store: RootStore = useStore();

  const id = match.params.id ? parseInt(match.params.id) : null;
  const loading = store.widgetBoxLoading;
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
      <Box flexGrow={1} maxWidth={319} display="flex" borderLeft={1} borderColor={cloud}>
        <SideBar />
      </Box>
      <Box flexGrow={5} className={classes.widgetBox} position="relative">
        <OverlayLoader show={loading} />
        <FilterBar />
        <WidgetsTemplate id={id} />
      </Box>
    </Box>
  );
};

export default observer(HomePage);
