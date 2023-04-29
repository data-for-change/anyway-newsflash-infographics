import React, { FC } from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import { Box, makeStyles } from '@material-ui/core';
import { Typography } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import { silverSmokeColor } from 'style';
import {INewsFlash} from "models/NewFlash";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  news: INewsFlash;
  newFlashTitle: string;
}

const useStyles = makeStyles({
  newsFlashBox: {
    backgroundColor: silverSmokeColor
  },
});

const LocationApprove: FC<IProps> = ({ isOpen, onClose, news, newFlashTitle }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <DialogWithHeader fullWidth={false} isShowing={isOpen} onClose={onClose} title={t('LocationApprove.title')}>
       <Box display="flex"  sx={{width: 600, height: 600}} flexDirection={'column'}>
         <Box mt={2} flexDirection={'column'}>
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
         <Box mt={2}>
           <Typography.Body3 bold>{t('LocationApprove.accident')}:</Typography.Body3>
           <Typography.Body3> ({t('LocationApprove.changeAllowed')})</Typography.Body3>
         </Box>
         <Box mt={2} flexDirection={'column'}>
           <Typography.Body3 bold>{t('LocationApprove.segment')}:</Typography.Body3>
           <Box>
             <Typography.Body3>""</Typography.Body3>
           </Box>
         </Box>
       </Box>
     </DialogWithHeader>
   );
 };

export default LocationApprove;
