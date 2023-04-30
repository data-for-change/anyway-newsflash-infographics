import React, { FC } from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import { Box, makeStyles } from '@material-ui/core';
import { Typography } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import { silverSmokeColor } from 'style';
import { INewsFlash } from "models/NewFlash";
import { useStore } from "store/storeConfig";

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
});

const LocationApprove: FC<IProps> = ({ isOpen, onClose, news, newFlashTitle }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const store = useStore();
  const { userStore } = store;
  const userAllowedChange = userStore.isUserAuthenticated && userStore.isAdmin;
  // const userInfo = userStore.userInfo && userStore.userInfo.data ?
  //   userStore.userInfo.data.firstName.concat(userStore.userInfo.data.lastName) : null;

  return (
    <DialogWithHeader fullWidth={false} isShowing={isOpen} onClose={onClose} title={t('LocationApprove.title')}>
       <Box className={classes.mainWindow} >
         <Box mt={2} className={classes.block} >
           <Typography.Body3 bold>{t('LocationApprove.newsFlash')}:</Typography.Body3>
           <Box mt={2} flexDirection={'column'} className={classes.newsFlashBox}>
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
           <Box>
             <Typography.Body3 bold>{t('LocationApprove.accident')}:</Typography.Body3>
             <Typography.Body3> ({t('LocationApprove.changeAllowed')})</Typography.Body3>
           </Box>
           <Box>
             <Typography.Body3 bold>{t('LocationApprove.updater')}:</Typography.Body3>
             <Typography.Body3> Shaked</Typography.Body3>
           </Box>
         </Box>
         <Box mt={2} className={classes.block} >
           <Typography.Body3 bold>{t('LocationApprove.segment')}:</Typography.Body3>
           <Box>
             <Typography.Body3>{news.location}</Typography.Body3>
           </Box>
         </Box>
       </Box>
     </DialogWithHeader>
   );
 };

export default LocationApprove;
