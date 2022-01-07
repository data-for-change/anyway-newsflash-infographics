import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, Typography } from 'components/atoms';
import LocationSearchIndicator from 'components/molecules/LocationSearchIndicator';
import { useLocale } from 'hooks/date.hooks';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import RootStore from 'store/root.store';
import { useStore } from 'store/storeConfig';
import { silverSmokeColor } from 'style';
import { dateFormat } from 'utils/time.utils';

const PREFIX = 'News';

const classes = {
  container: `${PREFIX}-container`,
  newsFeed: `${PREFIX}-newsFeed`,
  activeNewsFlash: `${PREFIX}-activeNewsFlash`,
};

const StyledBox = styled(Box)({
  [`& .${classes.container}`]: {},
  [`&.${classes.newsFeed}`]: {
    overflow: 'auto',
  },
  [`& .${classes.activeNewsFlash}`]: {
    backgroundColor: silverSmokeColor,
  },
});

const News: FC = () => {
  const store: RootStore = useStore();

  const locale = useLocale();

  return (
    <StyledBox flexGrow={1} display="flex" flexDirection="column" className={classes.newsFeed}>
      <Box flexGrow={1}>
        <Box className={classes.container} flexDirection={'column'}>
          {store.gpsLocationData && <LocationSearchIndicator />}
          {store.newsFlashCollection.length > 0 ? (
            store.newsFlashCollection.map((news) => {
              const className = news.id === store.activeNewsFlashId ? classes.activeNewsFlash : '';
              const date = news.date == null ? '' : dateFormat(new Date(news.date.replace(/-/g, '/')), locale);
              return (
                <Link key={news.id} to={`${store.currentLanguageRouteString}/newsflash/${news.id}`}>
                  <Box border={1} borderColor={silverSmokeColor} p={1} className={className}>
                    <p>
                      <Typography.Body5>
                        {date}, {news.display_source}
                      </Typography.Body5>
                    </p>
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
    </StyledBox>
  );
};

export default observer(News);
