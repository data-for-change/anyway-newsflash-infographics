import { Box, DialogActions, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Dialog, Button, Typography } from 'components/atoms';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useStore } from 'store/storeConfig';
import { useTranslation } from 'react-i18next';
import LocationSelect from 'components/molecules/LocationSelect';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      gap: theme.spacing(1),
    },
    chosenSection: {
      marginBlock: theme.spacing(2),
    },
  }),
);

export default function SearchSegmentScreen ({onLocationChange, roadNumber, section, onSearch, onClose}:{
    onLocationChange:any, roadNumber:any, section:any, onSearch:any, onClose:any
}){

    const { t } = useTranslation();


    const classes = useStyles();
    const store = useStore();

    return (
      <Box>
        <Box display="flex" flexDirection="column" height="60vh">
          <Box display="contents">
            <LocationSelect onLocationChange={onLocationChange} />
          </Box>
          <div className={classes.chosenSection}>
            <Typography.Body1 bold>{t('mapDialog.chosenSegment')}</Typography.Body1>
            <Typography.Body1>
              {roadNumber && section && ` ${t('mapDialog.road')} ${roadNumber} - ${section}`}
            </Typography.Body1>
          </div>
        </Box>
        <DialogActions className={classes.actions}>
          <Button.Standard disabled={!section} onClick={onSearch}>
            {t('mapDialog.searchButton')}
          </Button.Standard>
          <Button.Outlined onClick={onClose}>{t('mapDialog.cancelButton')}</Button.Outlined>
        </DialogActions>
      </Box>
    );
  };

