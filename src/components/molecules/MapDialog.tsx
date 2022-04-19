import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, DialogActions, TextField } from '@material-ui/core';
import { Dialog, Button, Typography } from 'components/atoms';
import LocationSelect from 'components/molecules/LocationSelect';
import { IPoint } from 'models/Point';

interface IProps {
  section?: string;
  roadNumber?: string;
  open: boolean;
  onClose: () => void;
  onLocationChange: (location: IPoint) => void;
  onSearch: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: theme.spacing(1),
    },
    wrapper: {
      minWidth: 500,
      padding: theme.spacing(2),
    },
    dialogHeader: {
      padding: 0,
      display: 'flex',
    },
    actions: {
      gap: theme.spacing(1),
    },
    chosenSection: {
      marginBlock: theme.spacing(2),
    },
    notChosen: {
      marginInlineEnd: 60,
      color: 'grey',
      cursor: 'pointer',
    },
    chosen: {
      marginInlineEnd: 60,
      color: 'black',
      cursor: 'pointer',
    },
    inputSpace: {
      marginTop: 20,
      marginInlineEnd: 20,
    },
  }),
);

const MapDialog: FC<IProps> = ({ section, open, onClose, roadNumber, onLocationChange, onSearch }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [searchScreen, setSearchScreen] = useState<'segment' | 'cityAndStreet'>('segment');

  const SearchSegmentScreen = () => {
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

  const SearchCityAndStreetScreen = () => {
    return (
      <Box>
        <Box height="60vh">
          <TextField
            className={classes.inputSpace}
            id="outlined-basic"
            label={t('mapDialog.city')}
            variant="outlined"
          />
          <TextField
            className={classes.inputSpace}
            id="outlined-basic"
            label={t('mapDialog.street')}
            variant="outlined"
          />
        </Box>
        <DialogActions className={classes.actions}>
          <Button.Standard disabled={true}>{t('mapDialog.searchButton')}</Button.Standard>
          <Button.Outlined onClick={onClose}>{t('mapDialog.cancelButton')}</Button.Outlined>
        </DialogActions>
      </Box>
    );
  };
  return (
    <Dialog isShowing={open} onClose={onClose} maxWidth="lg" fullWidth>
      <Box className={classes.wrapper}>
        <Box className={classes.dialogHeader}>
          <Box
            className={searchScreen === 'segment' ? classes.chosen : classes.notChosen}
            onClick={() => setSearchScreen('segment')}
          >
            <Typography.Title1>{t('mapDialog.searchSection')}</Typography.Title1>
          </Box>
          <Box
            className={searchScreen === 'cityAndStreet' ? classes.chosen : classes.notChosen}
            onClick={() => setSearchScreen('cityAndStreet')}
          >
            <Typography.Title1>{t('mapDialog.searchStreetAndCity')}</Typography.Title1>
          </Box>
        </Box>
        {searchScreen === 'segment' && <SearchSegmentScreen />}
        {searchScreen === 'cityAndStreet' && <SearchCityAndStreetScreen />}
      </Box>
    </Dialog>
  );
};

export default MapDialog;
