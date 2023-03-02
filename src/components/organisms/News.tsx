import { FC } from 'react';
import { Link, Typography } from 'components/atoms';
import { Box, makeStyles } from '@material-ui/core';
import { silverSmokeColor } from 'style';
import { useStore } from 'store/storeConfig';
import { useParams } from 'react-router-dom';
import RootStore from 'store/root.store';
import { observer } from 'mobx-react-lite';
import { dateFormat } from 'utils/time.utils';
import { useLocale } from 'hooks/date.hooks';
import LocationSearchIndicator from 'components/molecules/LocationSearchIndicator';
import { IRouteProps } from 'models/Route';
import CriticalIcon from 'assets/critical.jpg';

const useStyles = makeStyles({
  container: {},
  newsFeed: {
    overflow: 'auto',
  },
  activeNewsFlash: {
    backgroundColor: silverSmokeColor,
  },
});

const News: FC = () => {
  const store: RootStore = useStore();
  const classes = useStyles();
  const locale = useLocale();
  const { gpsId, street, city } = useParams<IRouteProps>();
  const { newsFlashStore, settingsStore } = store;
  return (
    <Box flexGrow={1} display="flex" flexDirection="column" className={classes.newsFeed}>
      <Box flexGrow={1}>
        <Box className={classes.container} flexDirection={'column'}>
          {gpsId && <LocationSearchIndicator searchType={'gps'} />}
          {street && city && <LocationSearchIndicator searchType={'cityAndStreet'} />}
          {newsFlashStore.newsFlashCollection.length > 0 ? (
            newsFlashStore.newsFlashCollection.map((news) => {
              const className = news.id === newsFlashStore.activeNewsFlashId ? classes.activeNewsFlash : '';
              const date = news.date == null ? '' : dateFormat(new Date(news.date.replace(/-/g, '/')), locale);
              return (
                <Link key={news.id} to={`${settingsStore.currentLanguageRouteString}/newsflash/${news.id}`}>
                  <Box border={1} borderColor={silverSmokeColor} p={1} className={className}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                      <p>
                        <Typography.Body5>
                          {date}, {news.display_source}
                        </Typography.Body5>
                      </p>
                      {news.critical && <img src={CriticalIcon} style={{ height: "30px", width: "30px", mixBlendMode: "multiply" }} />}
                    </Box>
                    <Typography.Body5>{news.title}</Typography.Body5>
                  </Box>
                </Link>
              );
            })
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
