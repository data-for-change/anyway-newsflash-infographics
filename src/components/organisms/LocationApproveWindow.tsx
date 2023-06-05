import React, {FC, useCallback, useState} from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import {Box, RadioGroup, Radio, FormControlLabel, FormControl, makeStyles } from '@material-ui/core';
import { Button, Typography } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import { oceanBlueColor, roseColor, silverGrayColor, silverSmokeColor } from 'style';
import { INewsFlash } from "models/NewFlash";
import { useStore } from "store/storeConfig";
import {ReactComponent as CheckCircleIcon} from 'assets/check_blue_24dp.svg';
import {ReactComponent as CancelCircleIcon} from 'assets/cancel_red_24dp.svg';
import {IPoint} from "models/Point";
import {locationQualificationOptions} from '../molecules/NewsFlashComp';
import LocationSelect from "../molecules/LocationSelect";

const APPROVE = "approve";

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
    // width: 600,
    // height: 600,
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
  icon: {
    height: 23,
    width:23,
  },
});

const LocationApprove: FC<IProps> = ({ isOpen, onClose, news, newFlashTitle }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const store = useStore();
  const { userStore } = store;
  const [shouldApprove, setApproveStatus] = useState(true);
  const [location, setLocation] = useState(news.location);
  const userInfo = userStore.userInfo && userStore.userInfo.data &&
                   userStore.userInfo.data.firstName ?
    userStore.userInfo.data.firstName.concat(userStore.userInfo.data.lastName) : null;

  function handleApproveButton () {
    news.location_qualifying_user = userStore.userInfo;
    if (shouldApprove) {
      // Save location changes
      store.setNewsFleshInfo(news.id, locationQualificationOptions.VERIFIED);
    } else {
      store.setNewsFleshInfo(news.id, locationQualificationOptions.REJECTED);
    }
    onClose();
  }

  const handleCloseButton = () => onClose();

  const handleApproveStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value === APPROVE) {
      setApproveStatus(true);
    } else {
      setApproveStatus(false);
    }
  };
  const checkedApproveIcon = <CheckCircleIcon fill={oceanBlueColor} className={classes.icon} />
  const uncheckedApproveIcon = <CheckCircleIcon fill={silverGrayColor} className={classes.icon} />
  const checkedRejectIcon = <CancelCircleIcon fill={roseColor} className={classes.icon} />
  const uncheckedRejectIcon = <CancelCircleIcon fill={silverGrayColor} className={classes.icon} />

  const onLocationChange = (location: IPoint) => {
    setLocation(location.latitude.toString());
  };
  const newsInitialLocation: IPoint = {longitude: news.lon, latitude: news.lat};

  return (
    <DialogWithHeader fullWidth={false} isShowing={isOpen} onClose={onClose} title={t('LocationApprove.title')}>
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
           {/*Display map to choose location*/}
           <Box>
             <Typography.Body3 bold>{t('LocationApprove.accident')}:</Typography.Body3>
             <Typography.Body3> ({t('LocationApprove.changeAllowed')})</Typography.Body3>
             <Box display="contents">
               <LocationSelect onLocationChange={onLocationChange} initialLocation={newsInitialLocation} />
             </Box>
           </Box>
           <Box>
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
                 <FormControl>
                   <RadioGroup defaultValue={APPROVE} name="location-approve" onChange={handleApproveStatusChange}>
                     <FormControlLabel value={APPROVE}
                                       control={<Radio checkedIcon={checkedApproveIcon} icon={uncheckedApproveIcon} />}
                                       label={t('LocationApprove.verifyLocation')} />
                     <FormControlLabel value="reject"
                                       control={<Radio checkedIcon={checkedRejectIcon} icon={uncheckedRejectIcon} />}
                                       label={t('LocationApprove.rejectLocation')} />
                   </RadioGroup>
                 </FormControl>
               </Box>
             </Box>
           </Box>
         </Box>
         {/*Segment*/}
         <Box mt={2} className={classes.block} >
           <Typography.Body3 bold>{t('LocationApprove.segment')}:</Typography.Body3>
           <Box>
             <Typography.Body3>{location}</Typography.Body3>
           </Box>
         </Box>
         {/*Buttons*/}
         <Box mt={2} display={'flex'}
              sx={{ flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
           <Box sx={{ ml: 2 }}><Button.Small onClick={handleCloseButton}>
             {t('LocationApprove.cancelButton')}
           </Button.Small></Box>
           <Box sx={{ ml: 2 }}><Button.Small onClick={handleApproveButton}>
             {t('LocationApprove.approveButton')}
           </Button.Small></Box>
         </Box>
       </Box>
     </DialogWithHeader>
   );
 };

export default LocationApprove;
