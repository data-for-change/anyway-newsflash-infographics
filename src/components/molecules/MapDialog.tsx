import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, DialogActions } from '@material-ui/core';
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
    },
    actions: {
      gap: theme.spacing(1),
    },
    chosenSection: {
      marginBlock: theme.spacing(2),
    },
  }),
);

const MapDialog: FC<IProps> = ({ section, open, onClose, roadNumber,onLocationChange, onSearch }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Dialog isShowing={open} onClose={onClose} maxWidth='lg' fullWidth>
      <Box className={classes.wrapper}>
        <Box className={classes.dialogHeader}>
          <Typography.Title1>{t('mapDialog.searchSection')}</Typography.Title1>
        </Box>
        <Box display='flex' flexDirection='column' height='75vh'>
          <Box display='contents'>
            <LocationSelect onLocationChange={onLocationChange} />
          </Box>
          <div className={classes.chosenSection}>
            <Typography.Body1 bold>{t('mapDialog.chosenSegment')}</Typography.Body1>
            <Typography.Body1>{roadNumber && section &&` ${t('mapDialog.road')} ${roadNumber} - ${section}`}</Typography.Body1>
          </div>
        </Box>
        <DialogActions className={classes.actions}>
          <Button.Standard disabled={!section} onClick={onSearch}>
            {t('mapDialog.searchButton')}
          </Button.Standard>
          <Button.Outlined onClick={onClose}>{t('mapDialog.cancelButton')}</Button.Outlined>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default MapDialog;
