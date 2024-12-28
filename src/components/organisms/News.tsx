import { FC, useEffect, useRef } from 'react';
import { Typography } from 'components/atoms';
import { Box, makeStyles } from '@material-ui/core';
import { useStore } from 'store/storeConfig';
import { useParams } from 'react-router-dom';
import RootStore from 'store/root.store';
import { observer } from 'mobx-react-lite';
import LocationSearchIndicator from 'components/molecules/LocationSearchIndicator';
import { IRouteProps } from 'models/Route';
import NewsFlashComp from 'components/molecules/NewsFlashComp';
import { useScrollObserver } from 'hooks/useScrollObserver.hooks';
import { Direction } from 'models/ScrollObserver.model';
import { combineRefs } from 'utils/element.util';

const useStyles = makeStyles({
  container: {},
  newsFeed: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
  },
});

interface InfiniteScrollProps {
  onScroll: (direction: Direction) => void;
}

const News: FC<InfiniteScrollProps> = ({ onScroll }) => {
  const store: RootStore = useStore();
  const classes = useStyles();
  const { gpsId, street, city, newsId = '' } = useParams<IRouteProps>();
  const { newsFlashStore } = store;
  const containerRef = useRef<HTMLDivElement>(null);

  const { firstItemRef, lastItemRef, selectedItemRef } = useScrollObserver({
    newsId,
    onScroll,
    containerRef,
    newsData: newsFlashStore.newsFlashCollection.data,
    newsLoading: newsFlashStore.newsFlashLoading,
  });

  const isNotFirstPage = newsFlashStore.newsFlashLastPrevPage > 1;
  const selectedItemIsFirst = newsId && newsFlashStore.newsFlashCollection.data[0]?.id === +newsId;
  const shouldShowSpacer = isNotFirstPage && selectedItemIsFirst;

  useEffect(() => {
    if (shouldShowSpacer && containerRef.current) {
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = 100;
        }
      }, 0);
    }
  }, [shouldShowSpacer, newsFlashStore.newsFlashCollection.data]);

  return (
    <div ref={containerRef} className={classes.newsFeed}>
      {gpsId && <LocationSearchIndicator searchType={'gps'} />}
      {street && city && <LocationSearchIndicator searchType={'cityAndStreet'} />}
      {shouldShowSpacer && <div ref={firstItemRef} style={{ height: '100px', flexShrink: 0 }} />}
      {newsFlashStore.newsFlashCollection.data.length > 0 ? (
        newsFlashStore.newsFlashCollection.data.map((news, index) => {
          const isFirst = index === 0;
          const isLast = index === newsFlashStore.newsFlashCollection.data.length - 1;
          const selectedItem = news.id === +newsId ? selectedItemRef : undefined;

          return (
            <>
              <div
                key={news.id}
                ref={combineRefs(
                  !shouldShowSpacer && isFirst ? firstItemRef : undefined,
                  isLast ? lastItemRef : undefined,
                  selectedItem,
                )}
              >
                <NewsFlashComp news={news} />
              </div>
            </>
          );
        })
      ) : (
        <Box p={1}>
          <Typography.Body4>לא נמצאו תוצאות מהמקור המבוקש</Typography.Body4>
        </Box>
      )}
    </div>
  );
};

export default observer(News);
