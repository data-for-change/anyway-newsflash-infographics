import React, { FC, useCallback } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import News from './News';
import NewsFlashFilterPanel from 'components/molecules/NewsFlashFilterPanel';
import OverlayLoader from '../molecules/OverlayLoader';
import { silverSmokeColor } from 'style';
import { Typography, ErrorBoundary } from 'components/atoms';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';
import { InfiniteScroll } from 'components/atoms';
import SideBarMap from 'components/molecules/SideBarMap';
import { useTranslation } from 'react-i18next';

const INFINITE_SCROLL_FETCH_SIZE = 100;

interface IProps {}

const useStyles = makeStyles({
  newsContainer: {
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    border: 1,
    borderColor: silverSmokeColor,
  },
});

const SideBar: FC<IProps> = () => {
  const store: RootStore = useStore();
  const classes = useStyles();
  const { t } = useTranslation();
  const { newsFlashStore } = store;

  const mapTitle = `${t('sideBar')}`;
  const location = newsFlashStore.activeNewsFlashLocation;
  const loading = newsFlashStore.newsFlashLoading;

  const fetchMoreNewsItems = useCallback(() => {
    newsFlashStore.infiniteFetchLimit(INFINITE_SCROLL_FETCH_SIZE);
  }, [newsFlashStore]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="stretch">
      <Box className={classes.newsContainer}>
        <OverlayLoader show={loading} />
        <Box>
          <ErrorBoundary>
            <NewsFlashFilterPanel />
          </ErrorBoundary>
        </Box>
        <InfiniteScroll onScrollEnd={fetchMoreNewsItems}>
          <News />
        </InfiniteScroll>
      </Box>
      <Box borderTop={`1px solid ${silverSmokeColor}`} flexShrink={0} flexGrow={0} p={1}>
        <Typography.Body4 children={mapTitle} />
      </Box>
      <Box flexBasis={200} flexShrink={0} px={1} pb={1}>
        {location && (
          <ErrorBoundary>
            <SideBarMap items={[location]} />
          </ErrorBoundary>
        )}
      </Box>
    </Box>
  );
};

export default observer(SideBar);
