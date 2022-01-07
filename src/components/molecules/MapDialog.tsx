import { Box, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button, Dialog, Typography } from 'components/atoms';
import LocationSelect from 'components/molecules/LocationSelect';
import { IPoint } from 'models/Point';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const PREFIX = 'MapDialog';

const classes = {
  dialogFooter: `${PREFIX}-dialogFooter`,
  wrapper: `${PREFIX}-wrapper`,
  dialogHeader: `${PREFIX}-dialogHeader`,
  actions: `${PREFIX}-actions`,
  chosenSection: `${PREFIX}-chosenSection`,
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.dialogFooter}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
  },

  [`& .${classes.wrapper}`]: {
    minWidth: 500,
    padding: theme.spacing(2),
  },

  [`& .${classes.dialogHeader}`]: {
    padding: 0,
  },

  [`& .${classes.actions}`]: {
    gap: theme.spacing(1),
  },

  [`& .${classes.chosenSection}`]: {
    marginBlock: theme.spacing(2),
  },
}));

interface IProps {
  section?: string;
  open: boolean;
  location: IPoint | undefined;
  onClose: () => void;
  onLocationChange: (location: IPoint) => void;
  onSearch: () => void;
}

const MapDialog: FC<IProps> = ({ section = '', open, onClose, location, onLocationChange, onSearch }) => {
  const { t } = useTranslation();

  return (
    <StyledDialog isShowing={open} onClose={onClose} maxWidth="lg" fullWidth>
      <Box className={classes.wrapper}>
        <Box className={classes.dialogHeader}>
          <Typography.Title1>{t('mapDialog.searchSection')}</Typography.Title1>
        </Box>
        <Box display="flex" flexDirection="column" height="75vh">
          <Box display="contents">
            <LocationSelect location={location} onLocationChange={onLocationChange} />
          </Box>
          <div className={classes.chosenSection}>
            <Typography.Body1 bold>{t('mapDialog.chosenSegment')}</Typography.Body1>
            <Typography.Body1>{section}</Typography.Body1>
          </div>
        </Box>
        <DialogActions className={classes.actions}>
          <Button.Standard onClick={onSearch}>{t('mapDialog.searchButton')}</Button.Standard>
          <Button.Outlined onClick={onClose}>{t('mapDialog.cancelButton')}</Button.Outlined>
        </DialogActions>
      </Box>
    </StyledDialog>
  );
};

export default MapDialog;
