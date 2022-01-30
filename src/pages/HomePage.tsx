import React, { FC, useEffect } from 'react';
import { Box } from '@material-ui/core';
import SideBar from 'components/organisms/SideBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { silverSmokeColor } from '../style';
import FilterBar from 'components/organisms/FilterBar';
import OverlayLoader from 'components/molecules/OverlayLoader';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';
import { Navigate, useParams } from 'react-router-dom';
import { IRouteProps } from 'models/Route';
import { LANG } from 'const/languages.const';

interface IProps {
  component: React.FunctionComponent<{}>;
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

const HomePage: FC<IProps> = ({ component: Component }) => {
  const classes = useStyles();
  const store: RootStore = useStore();
  const { gpsId, newsId, lng } = useParams<IRouteProps>();
  console.log('useParams', useParams());
  const loading = store.widgetBoxLoading;

  useEffect(() => {
    if (newsId) {
      store.selectNewsFlash(parseInt(newsId));
    }
    if (gpsId) {
      store.selectLocationId(parseInt(gpsId));
    }
  }, [newsId, store, gpsId]);

  useEffect(() => {
    if (lng) {
      store.changeLanguage(lng);
    } else {
      store.changeLanguage(LANG.HE);
    }
  }, [lng, store]);

  if (!newsId && !gpsId) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box display="flex" flexGrow={1} className={classes.mainBox}>
      <Box flexGrow={1} width={319} display="flex" className={classes.sideBarWrapper}>
        <SideBar />
      </Box>
      <Box flexGrow={5} className={classes.widgetBox} position="relative">
        <OverlayLoader show={loading} />
        <FilterBar />
        {/* main Content */}
        <Component />
      </Box>
    </Box>
  );
};

export default observer(HomePage);
