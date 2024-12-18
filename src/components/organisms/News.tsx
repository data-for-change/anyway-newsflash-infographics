import { FC, useRef } from 'react';
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

  return (
    <div ref={containerRef} className={classes.newsFeed}>
      {gpsId && <LocationSearchIndicator searchType={'gps'} />}
      {street && city && <LocationSearchIndicator searchType={'cityAndStreet'} />}
      {newsFlashStore.newsFlashCollection.data.length > 0 ? (
        newsFlashStore.newsFlashCollection.data.map((news, index) => {
          const isFirst = index === 0;
          const isLast = index === newsFlashStore.newsFlashCollection.data.length - 1;
          const selectedItem = news.id === +newsId ? selectedItemRef : undefined;

          return (
            <div
              key={news.id}
              ref={combineRefs(isFirst ? firstItemRef : undefined, isLast ? lastItemRef : undefined, selectedItem)}
            >
              <NewsFlashComp news={news} />
            </div>
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
