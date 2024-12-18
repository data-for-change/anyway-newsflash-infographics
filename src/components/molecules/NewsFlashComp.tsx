import React, {FC, useState} from 'react';
import { Link, Typography, Button } from 'components/atoms';
import { Box, makeStyles } from '@material-ui/core';
import { cherryJamColor, oceanBlueColor, silverSmokeColor } from 'style';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';
import { dateFormat } from 'utils/time.utils';
import { useLocale } from 'hooks/date.hooks';
import { ReactComponent as CheckCircleIcon } from 'assets/check_blue_24dp.svg';
import { ReactComponent as CancelCircleIcon } from 'assets/cancel_red_24dp.svg';
import { ReactComponent as CriticalIcon } from 'assets/critical.svg';
import { useTranslation } from 'react-i18next';
import LocationApprove from 'components/organisms/LocationApproveWindow';
import {locationQualificationOptions} from 'components/organisms/LocationApproveWindow';
import { INewsFlash } from 'models/NewFlash';
import {useParams} from 'react-router-dom'
import { observer } from "mobx-react-lite";

const ICON_HEIGHT = 18

interface IProps {
  news: INewsFlash;
}

const useStyles = makeStyles({
  activeNewsFlash: {
    backgroundColor: silverSmokeColor,
  },
  icon: {
    height: ICON_HEIGHT,
    width: 18,
  },
});


const NewsFlashComp: FC<IProps> = ({ news }) => {
  const store: RootStore = useStore();
  const classes = useStyles();
  const locale = useLocale();
  const { userStore, settingsStore } = store;
  const { t } = useTranslation();

  function getVerificationIcon(verificationText: string) {
    if (verificationText === locationQualificationOptions.REJECTED) {
      return <CancelCircleIcon fill={cherryJamColor} className={classes.icon} />
    } else if (verificationText === locationQualificationOptions.VERIFIED ||
                verificationText === locationQualificationOptions.MANUAL) {
      return <CheckCircleIcon fill={oceanBlueColor} className={classes.icon}/>
    } else if (verificationText === locationQualificationOptions.NOT_VERIFIED) {
      return
    } else {
      return
    }
  }

  const [isOpen, setOpen] = useState(false);
  const verificationIcon = getVerificationIcon(news.newsflash_location_qualification);
  const criticalIcon = news.critical && <CriticalIcon className={classes.icon} />;
  const {newsId} = useParams()
  const newsID = newsId ? parseInt(newsId) : '';
  const className = news.id === newsID ? classes.activeNewsFlash : '';
  const date = news.date == null ? '' : dateFormat(new Date(news.date.replace(/-/g, '/')), locale);
  const handleLocationEditorOpen = () => setOpen(true);
  const handleLocationEditorClose = () => setOpen(false);

  const locationChangeButton = (userStore.isUserAdmin || userStore.isUserLocationApprover) &&
    <Button.Small onClick={handleLocationEditorOpen} buttonHeight={ICON_HEIGHT}>
      {t('changeLocationButton')}
    </Button.Small>

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
      <LocationApprove isOpen={isOpen} onClose={handleLocationEditorClose}
                       newFlashTitle={date.concat(", ", news.display_source)} news={news} />
    </Link>
  );
}

export default observer(NewsFlashComp);
