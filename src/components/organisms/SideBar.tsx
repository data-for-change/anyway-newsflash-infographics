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
import SideBarMap from 'components/molecules/SideBarMap';
import { useTranslation } from 'react-i18next';
import { Direction } from 'models/ScrollObserver.model';

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
  const currentPageNumber = newsFlashStore.newsFlashPageNumber;
  const lastPrevPage = newsFlashStore.newsFlashLastPrevPage;
  const totalPages = newsFlashStore.newsFlashCollection.pagination.totalPages;

  const fetchMoreNewsItems = useCallback(
    (direction: Direction) => {
      if (loading) return;
      if (direction === Direction.PREV && currentPageNumber > 1 && lastPrevPage > 1) {
        newsFlashStore.filterNewsFlashCollection(direction);
        return;
      }
      if (direction === Direction.NEXT && totalPages > currentPageNumber) {
        newsFlashStore.filterNewsFlashCollection(direction);
      }
    },
    [currentPageNumber, lastPrevPage, loading, newsFlashStore, totalPages],
  );

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="stretch">
      <Box className={classes.newsContainer}>
        <OverlayLoader show={loading} />
        <Box>
          <ErrorBoundary>
            <NewsFlashFilterPanel />
          </ErrorBoundary>
        </Box>
        <News onScroll={fetchMoreNewsItems} />
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
