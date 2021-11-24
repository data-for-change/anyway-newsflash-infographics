import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ErrorBoundary, InfiniteScroll, Typography } from 'components/atoms';
import NewsFlashFilterPanel from 'components/molecules/NewsFlashFilterPanel';
import SideBarMap from 'components/molecules/SideBarMap';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import RootStore from 'store/root.store';
import { useStore } from 'store/storeConfig';
import { silverSmokeColor } from 'style';
import OverlayLoader from '../molecules/OverlayLoader';
import News from './News';

const PREFIX = 'SideBar';

const classes = {
  newsContainer: `${PREFIX}-newsContainer`,
};

const StyledBox = styled(Box)({
  [`& .${classes.newsContainer}`]: {
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    border: 1,
    borderColor: silverSmokeColor,
  },
});

const INFINITE_SCROLL_FETCH_SIZE = 100;

interface IProps {}

const SideBar: FC<IProps> = () => {
  const store: RootStore = useStore();

  const { t } = useTranslation();

  const mapTitle = `${t('sideBar')}`;
  const location = store.activeNewsFlashLocation;
  const loading = store.newsFlashLoading;

  const fetchMoreNewsItems = useCallback(() => {
    store.infiniteFetchLimit(INFINITE_SCROLL_FETCH_SIZE);
  }, [store]);

  return (
    <StyledBox display="flex" flexDirection="column" justifyContent="center" alignItems="stretch">
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
    </StyledBox>
  );
};

export default observer(SideBar);
