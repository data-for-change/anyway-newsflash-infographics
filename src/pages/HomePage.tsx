import { useEffect, FC } from 'react';
import { Box } from '@material-ui/core';
import SideBar from 'components/organisms/SideBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { silverSmokeColor } from '../style';
import FilterBar from 'components/organisms/FilterBar';
import OverlayLoader from 'components/molecules/OverlayLoader';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';
import { Navigate, useParams, Outlet } from 'react-router-dom';
import { IRouteProps } from 'models/Route';
import { LANG } from 'const/languages.const';

interface IProps {}

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

const HomePage: FC<IProps> = () => {
  const classes = useStyles();
  const store: RootStore = useStore();
  const { newsFlashStore, widgetsStore, settingsStore } = store;
  const { gpsId, newsId, lng, city, street } = useParams<IRouteProps>();
  const loading = widgetsStore.widgetBoxLoading;

  useEffect(() => {
    if (city && street) {
      newsFlashStore.selectNewsFlashByCityAndStreet(city, street);
    }
    if (newsId) {
      newsFlashStore.selectNewsFlash(parseInt(newsId));
    }
    if (gpsId) {
      newsFlashStore.selectLocationId(parseInt(gpsId));
    }
  }, [newsId, newsFlashStore, gpsId, city, street]);

  useEffect(() => {
    if (lng) {
      settingsStore.changeLanguage(lng);
    } else {
      settingsStore.changeLanguage(LANG.HE);
    }
  }, [lng, settingsStore]);

  if (!newsId && !gpsId && !street && !city) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box display="flex" flexGrow={1} className={classes.mainBox}>
      <Box flexGrow={1} width={380} display="flex" className={classes.sideBarWrapper}>
        <SideBar />
      </Box>
      <Box flexGrow={5} className={classes.widgetBox} position="relative">
        <OverlayLoader show={loading} />
        <FilterBar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default observer(HomePage);
