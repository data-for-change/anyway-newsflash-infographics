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

const useStyles = makeStyles({
  container: {},
  newsFeed: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
  },
});

<img src="" alt="" />;

const News: FC = () => {
  const store: RootStore = useStore();
  const classes = useStyles();
  const { gpsId, street, city, newsId = '' } = useParams<IRouteProps>();
  const { newsFlashStore } = store;
  const selectedItemRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (newsId && newsFlashStore.newsFlashCollection.data.length > 0 && !newsFlashStore.newsFlashLoading) {
      // Find selected item index
      const itemIndex = newsFlashStore.newsFlashCollection.data.findIndex((item) => item.id.toString() === newsId);

      if (itemIndex !== -1) {
        setTimeout(() => {
          selectedItemRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={classes.newsFeed}>
      {gpsId && <LocationSearchIndicator searchType={'gps'} />}
      {street && city && <LocationSearchIndicator searchType={'cityAndStreet'} />}
      {newsFlashStore.newsFlashCollection.data.length > 0 ? (
        newsFlashStore.newsFlashCollection.data.map((news, index) => {
          return (
            <div key={news.id} ref={selectedItemRef}>
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
