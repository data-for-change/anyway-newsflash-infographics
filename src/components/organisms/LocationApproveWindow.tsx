import React, {FC, useState} from 'react';
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
import LocationSelect from "../molecules/LocationSelect";
import SearchCityAndStreet from "../molecules/SearchCityAndStreet";
import {ICityOption, IStreetOption} from "models/Map";

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
  const [locationChanged, setLocationChanged] = useState(false);
  const [location, setLocation] = useState(news.location);
  const userInfo = userStore.userInfo && userStore.userInfo.data &&
                   userStore.userInfo.data.firstName ?
    userStore.userInfo.data.firstName.concat(userStore.userInfo.data.lastName) : null;

  function handleApproveButton () {
    if (shouldApprove && locationChanged) {
      // Save location changes
      store.setNewsFleshInfo(news.id, locationQualificationOptions.MANUAL, userStore.userInfo);
    } else if (shouldApprove) {
      store.setNewsFleshInfo(news.id, locationQualificationOptions.VERIFIED, userStore.userInfo);
    } else {
      store.setNewsFleshInfo(news.id, locationQualificationOptions.REJECTED, userStore.userInfo);
    }
    onClose();
  }

  const handleCloseButton = () => onClose();

  const handleApproveStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value === APPROVE) {
      setApproveStatus(true);
    } else {
      setLocation(news.location);
      setApproveStatus(false);
    }
  };
  const checkedApproveIcon = <CheckCircleIcon fill={oceanBlueColor} className={classes.icon} />
  const uncheckedApproveIcon = <CheckCircleIcon fill={silverGrayColor} className={classes.icon} />
  const checkedRejectIcon = <CancelCircleIcon fill={roseColor} className={classes.icon} />
  const uncheckedRejectIcon = <CancelCircleIcon fill={silverGrayColor} className={classes.icon} />

  const onMapLocationChange = (location: IPoint) => {
    setLocationChanged(true);
    setLocation(location.latitude.toString());

    // store.fetchGpsLocation(location).then(response => {
    //   // if (response) {
    //     console.log("##########");
    //     console.log(response);
    //     console.log("##########");
    //   // }
    // });
  }
  const newsInitialLocation: IPoint = {longitude: news.lon, latitude: news.lat};

  const onStreetAndCityChoice = (street: IStreetOption, city: ICityOption) => {
    setLocationChanged(true);
    setLocation(t('mapDialog.street') + " " + street.street_hebrew + " " +
      t('textView.on') + city.yishuv_name);
  }

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
           {/*Display map and search to choose location*/}
           <Box display={'flex'} width={650} height={"40vh"} sx={{ flexGrow: 1, p: 2, flexWrap: 'wrap', flexDirection: 'col',
             justifyContent: 'space-around'}}>
             <Typography.Body3 bold>{t('LocationApprove.accident')}:</Typography.Body3>
             <Typography.Body3> ({t('LocationApprove.changeAllowed')})</Typography.Body3>
             <Box mb={2} className={classes.block}>
               <SearchCityAndStreet onStreetAndCityChoice={onStreetAndCityChoice} />
             </Box>
             <Box display="contents" >
                <LocationSelect onLocationChange={onMapLocationChange} initialLocation={newsInitialLocation} />
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
         <Box mt={12} display={'flex'} height={50}
              sx={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
           {/*Segment*/}
           <Box display={'flex'}
                sx={{ flexWrap: 'wrap', justifyContent: 'space-between'}} >
             <Typography.Body3 bold>{t('LocationApprove.segment')}:</Typography.Body3>
             <Box ml={1} mr={1}>
               <Typography.Body3>{location}</Typography.Body3>
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
