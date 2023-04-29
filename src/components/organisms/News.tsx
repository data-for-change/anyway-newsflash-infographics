import { FC } from 'react';
import { Link, Typography, Button } from 'components/atoms';
import { Box, makeStyles } from '@material-ui/core';
import { cherryJamColor, oceanBlueColor, silverSmokeColor } from 'style';
import { useStore } from 'store/storeConfig';
import { useParams } from 'react-router-dom';
import RootStore from 'store/root.store';
import { observer } from 'mobx-react-lite';
import { dateFormat } from 'utils/time.utils';
import { useLocale } from 'hooks/date.hooks';
import LocationSearchIndicator from 'components/molecules/LocationSearchIndicator';
import { IRouteProps } from 'models/Route';
import { ReactComponent as CheckCircleIcon } from 'assets/check_blue_24dp.svg';
import { ReactComponent as CancelCircleIcon } from 'assets/cancel_red_24dp.svg';
import { ReactComponent as CriticalIcon } from 'assets/critical.svg';
import { useTranslation } from 'react-i18next';

const ICON_HEIGHT = 18

const enum locationQualificationOptions {
  VERIFIED = "verified",
  NOT_VERIFIED = "not verified",
  REJECTED = "rejected",
}

const useStyles = makeStyles({
  container: {},
  newsFeed: {
    overflow: 'auto',
  },
  activeNewsFlash: {
    backgroundColor: silverSmokeColor,
  },
  icon: {
    height: ICON_HEIGHT,
    width: 18,
  },
});

<img src="" alt="" />
const News: FC = () => {
  const store: RootStore = useStore();
  const classes = useStyles();
  const locale = useLocale();
  const { gpsId, street, city } = useParams<IRouteProps>();
  const { newsFlashStore, settingsStore } = store;
  const { t } = useTranslation();

  function getVerificationIcon(verificationText: string) {
    if (verificationText === locationQualificationOptions.REJECTED) {
      return <CancelCircleIcon fill={cherryJamColor} className={classes.icon} />
    } else if (verificationText === locationQualificationOptions.VERIFIED) {
      return <CheckCircleIcon fill={oceanBlueColor} className={classes.icon}/>
    } else if (verificationText === locationQualificationOptions.NOT_VERIFIED) {
      return
    } else {
      return
    }
  }

  const handleClick = () => {
    // TODO
  };

  return (
    <Box flexGrow={1} display="flex" flexDirection="column" className={classes.newsFeed}>
      <Box flexGrow={1}>
        <Box className={classes.container} flexDirection={'column'}>
          {gpsId && <LocationSearchIndicator searchType={'gps'} />}
          {street && city && <LocationSearchIndicator searchType={'cityAndStreet'} />}
          {newsFlashStore.newsFlashCollection.length > 0 ? (
            newsFlashStore.newsFlashCollection.map((news) => {
              const verificationIcon = getVerificationIcon(news.newsflash_location_qualification);
              const criticalIcon = news.critical && <CriticalIcon className={classes.icon} />;
              const locationChangeButton = <Button.Small onClick={handleClick} buttonHeight={ICON_HEIGHT}>
                  {t('changeLocationButton')}
                </Button.Small>
              const className = news.id === newsFlashStore.activeNewsFlashId ? classes.activeNewsFlash : '';
              const date = news.date == null ? '' : dateFormat(new Date(news.date.replace(/-/g, '/')), locale);
              return (
                <Link key={news.id} to={`${settingsStore.currentLanguageRouteString}/newsflash/${news.id}`}>
                  <Box border={1} borderColor={silverSmokeColor} p={1} className={className}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                      <p>
                        <Typography.Body5>
                          {date}, {news.display_source} {verificationIcon}{criticalIcon}
                        </Typography.Body5>
                      </p>
                      {locationChangeButton}
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
