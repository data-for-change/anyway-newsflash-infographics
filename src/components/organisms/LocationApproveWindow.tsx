import React, {FC, useCallback, useState} from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import {Box, makeStyles } from '@material-ui/core';
import { Button, Typography } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import { silverSmokeColor } from 'style';
import { INewsFlash } from "models/NewFlash";
import { useStore } from "store/storeConfig";
import {IPoint} from "models/Point";
import {IGpsData, IStreetData} from "models/WidgetData";
import LocationSelect from "../molecules/LocationSelect";
import SearchCityAndStreet from "../molecules/SearchCityAndStreet";
import {ICityOption, IStreetOption} from "models/Map";
import ApproveLocationRadioButtons from "../molecules/ApproveLocationRadioButtons";
import { updateNews } from "services/news.data.service";

const APPROVE = "approve";

export enum locationQualificationOptions {
  VERIFIED = "verified",
  NOT_VERIFIED = "not_verified",
  REJECTED = "rejected",
  MANUAL = "manual",
}

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  news: INewsFlash;
  newFlashTitle: string;
}

const useStyles = makeStyles({
  newsFlashBox: {
    display: 'flex',
    backgroundColor: silverSmokeColor
  },
  mainWindow: {
    display: "flex",
    width: 1000,
    height: 700,
    flexBasis: 200,
    minWidth: 200,
    alignContent: 'space-around',
    flexDirection: 'column'
  },
  block: {
    display: "flex",
    alignContent: 'space-around',
    flexDirection: 'column',
  },
});

const LocationApprove: FC<IProps> = ({ isOpen, onClose, news, newFlashTitle }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const store = useStore();
  const { userStore } = store;
  const [shouldApprove, setApproveStatus] = useState(true);
  const [locationChanged, setLocationChanged] = useState(false);
  const [newStreetLoc, setNewStreetLoc] = useState<IStreetData|null>(null);
  const [newGpsLoc, setNewGpsLoc] = useState<IGpsData|null>(null);
  const [locationToDisplay, setLocationToDisplay] = useState(news.location);
  // Unauthorized user shouldn't be able to open the window in the first place
  const userInfo = userStore.userInfo && userStore.userInfo.data && userStore.userInfo.data.firstName ?
    userStore.userInfo.data.firstName.concat(userStore.userInfo.data.lastName) : null;

  function handleApproveButton () {
    if (shouldApprove && locationChanged) {
      if (newStreetLoc) {
        updateNews(news.id, locationQualificationOptions.MANUAL, newStreetLoc, null);
      } else {
        updateNews(news.id, locationQualificationOptions.MANUAL, null, newGpsLoc);
      }
    } else if (shouldApprove) {
      updateNews(news.id, locationQualificationOptions.VERIFIED, null, null);
    } else {
      updateNews(news.id, locationQualificationOptions.REJECTED, null, null);
    }
    onCloseInitValues();
    window.location.reload();
  }

  const handleCloseButton = () => onCloseInitValues();

  const handleApproveStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value === APPROVE) {
      setApproveStatus(true);
    } else {
      setLocationToDisplay(news.location);
      setApproveStatus(false);
    }
  };

  const onMapLocationChange = useCallback(
    (location: IPoint) => {
      setLocationChanged(true);
      store.fetchGpsLocation(location);
      if (store.gpsLocationData) {
        setNewGpsLoc(store.gpsLocationData);
        setLocationToDisplay(t('mapDialog.road') + " " + store.gpsLocationData.road1 + " - " +
          store.gpsLocationData.road_segment_name);
      }
    },
    [t, store],
  );

  const newsGetInitialLocation = useCallback(() => (
    {longitude: news.lon, latitude: news.lat}),
    [news.lat, news.lon]
  );

  const onStreetAndCityChoice = (street: IStreetOption, city: ICityOption) => {
    setLocationChanged(true);
    setLocationToDisplay(t('mapDialog.street') + " " + street.street_hebrew + " " +
      t('textView.on') + city.yishuv_name);
    setNewStreetLoc({street, city});
  }

  const onCloseInitValues = () => {
    setApproveStatus(true);
    setLocationChanged(false);
    setLocationToDisplay(news.location);
    onClose();
  }

  return (
    <DialogWithHeader fullWidth={false} isShowing={isOpen} onClose={onCloseInitValues} title={t('LocationApprove.title')}>
       <Box className={classes.mainWindow} >
         {/*The newsflash*/}
         <Box className={classes.block} >
           <Typography.Body3 bold>{t('LocationApprove.newsFlash')}:</Typography.Body3>
           <Box mt={1} flexDirection={'column'} className={classes.newsFlashBox}>
             <Box style={{fontStyle: "italic"}}>
               <Typography.Body4>{newFlashTitle}</Typography.Body4>
             </Box>
             <Box>
               <Typography.Body4 bold>{news.title}</Typography.Body4>
             </Box>
             <Typography.Body4>{news.description}</Typography.Body4>
           </Box>
         </Box>
         <Box mt={2} display={'flex'}
              sx={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around' }}>
           {/*Display map and search to choose location*/}
           <Box display={'flex'} width={650} height={"40vh"} sx={{ flexGrow: 1, p: 2, flexWrap: 'wrap', flexDirection: 'col',
             justifyContent: 'space-around'}}>
             <Typography.Body3 bold>{t('LocationApprove.accident')}:</Typography.Body3>
             <Typography.Body3> ({t('LocationApprove.changeAllowed')})</Typography.Body3>
             <Box mb={2} className={classes.block}>
               <SearchCityAndStreet onStreetAndCityChoice={onStreetAndCityChoice} />
             </Box>
             <Box display="contents" >
                <LocationSelect onLocationChange={onMapLocationChange} initialLocationGetter={newsGetInitialLocation} />
             </Box>
           </Box>
           <Box width={300} height={350} mt={2}>
             {/*Display user name */}
             <Box>
               <Typography.Body3 bold>{t('LocationApprove.updater')}:</Typography.Body3>
               <Typography.Body3> {userInfo}</Typography.Body3>
             </Box>
             {/*Status chooser*/}
             <Box mt={2} className={classes.block} >
               <Box>
                 <Typography.Body3 bold>{t('LocationApprove.status')}:</Typography.Body3>
                 <Typography.Body3> ({t('LocationApprove.pleaseMark')})</Typography.Body3>
               </Box>
               <Box>
                 <ApproveLocationRadioButtons handleApproveStatusChange={handleApproveStatusChange}
                                              defaultValue={APPROVE} />
               </Box>
             </Box>
           </Box>
         </Box>
         <Box mt={12} display={'flex'} height={50}
              sx={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
           {/*Segment*/}
           <Box display={'flex'}
                sx={{ flexWrap: 'wrap', justifyContent: 'space-between'}} >
             <Typography.Body3 bold>{t('LocationApprove.segment')}:</Typography.Body3>
             <Box ml={1} mr={1}>
               <Typography.Body3>{locationToDisplay}</Typography.Body3>
             </Box>
           </Box>
           {/*Buttons*/}
           <Box display={'flex'}
                sx={{ flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
             <Box sx={{ ml: 2 }}><Button.Small onClick={handleCloseButton}>
               {t('LocationApprove.cancelButton')}
             </Button.Small></Box>
             <Box sx={{ ml: 2 }}><Button.Small onClick={handleApproveButton}>
               {t('LocationApprove.approveButton')}
             </Button.Small></Box>
           </Box>
         </Box>
       </Box>
     </DialogWithHeader>
   );
 };

export default LocationApprove;
