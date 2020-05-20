import React, { FC } from 'react';
import WidgetsTemplate from '../components/templates/WidgetsTemplate';
import { Box } from '@material-ui/core';
import SideBar from '../components/templates/SideBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { RouteComponentProps } from 'react-router';
import { borderColor } from '../style/_globals';
import FilterBar from '../components/organisms/FilterBar';
import OverlayLoader from '../components/molecules/OverlayLoader';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeConfig';
import RootStore from '../store/root.store';

interface IProps {}

interface IRouteProps {
  id?: string;
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
  const id = match.params.id ? parseInt(match.params.id) : null;
  const store: RootStore = useStore();
  const loading = store.widgetBoxLoading;

  return (
    <Box display="flex" flexGrow={1} className={classes.mainBox}>
      <Box flexGrow={1} maxWidth={319} display="flex" borderLeft={1} borderColor={borderColor}>
        <SideBar />
      </Box>
      <Box flexGrow={5} className={classes.widgetBox} position="relative">
        <OverlayLoader show={loading}/>
        <FilterBar />
        <WidgetsTemplate id={id} />
      </Box>
    </Box>
  );
};

export default observer(HomePage);
