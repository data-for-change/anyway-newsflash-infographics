import React, { FC, useCallback } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import News from './News';
import { NewsFlashFilterPanel } from '../molecules/NewsFlashFilterPanel';
import OverlayLoader from '../molecules/OverlayLoader';
import { cloud } from '../../style';
import { Typography, ErrorBoundary } from '../atoms';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import { InfinitScroll } from '../atoms';
import SideBarMap from '../molecules/SideBarMap';
const INFINITE_SCROLL_FETCH_SIZE = 5;

interface IProps {}

const useStyles = makeStyles({
  newsContainer: {
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    border: 1,
    borderColor: cloud,
  },
});

const SideBar: FC<IProps> = () => {
  const store: RootStore = useStore();
  const classes = useStyles();
  const mapTitle = 'מיקום משוער:';
  const location = store.activeNewsFlashLocation;
  const loading = store.newsFlashLoading;
  const fetchMoreNewsItems = useCallback(() => {
    console.log('fetchMoreNewsItems');
    store.infiniteFetchLimit(INFINITE_SCROLL_FETCH_SIZE);
  }, [store]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="stretch">
      <Box className={classes.newsContainer}>
        <OverlayLoader show={loading} />
        <Box>
          <ErrorBoundary>
            <NewsFlashFilterPanel />
          </ErrorBoundary>
        </Box>
        <InfinitScroll onScrollEnd={fetchMoreNewsItems}>
          <News />
        </InfinitScroll>
      </Box>
      <Box borderTop={`1px solid ${cloud}`} flexShrink={0} flexGrow={0} p={1}>
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
