import React, { FC } from 'react';
import { Typography } from 'components/atoms';
import { Box, makeStyles } from '@material-ui/core';
import { useStore } from 'store/storeConfig';
import { useParams } from 'react-router-dom';
import RootStore from 'store/root.store';
import { observer } from 'mobx-react-lite';
import LocationSearchIndicator from 'components/molecules/LocationSearchIndicator';
import { IRouteProps } from 'models/Route';
import NewsFlashComp from "components/molecules/NewsFlashComp";


const useStyles = makeStyles({
  container: {},
  newsFeed: {
    overflow: 'auto',
  },
});

<img src="" alt="" />
const News: FC = () => {
  const store: RootStore = useStore();
  const classes = useStyles();
  const { gpsId, street, city } = useParams<IRouteProps>();
  const { newsFlashStore } = store;

  return (
    <Box flexGrow={1} display="flex" flexDirection="column" className={classes.newsFeed}>
      <Box flexGrow={1}>
        <Box className={classes.container} flexDirection={'column'}>
          {gpsId && <LocationSearchIndicator searchType={'gps'} />}
          {street && city && <LocationSearchIndicator searchType={'cityAndStreet'} />}
          {newsFlashStore.newsFlashCollection.length > 0 ? (
            newsFlashStore.newsFlashCollection.map((news) =>
              <NewsFlashComp news={news} />
            )
          ) : (
            <Box p={1}>
              <Typography.Body4>לא נמצאו תוצאות מהמקור המבוקש</Typography.Body4>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default observer(News);
