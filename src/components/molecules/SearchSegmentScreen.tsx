import { Box, DialogActions } from '@material-ui/core';
import { Button, Typography } from 'components/atoms';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import LocationSelect from 'components/molecules/LocationSelect';
import { FC } from 'react';
import { IPoint } from 'models/Point';

interface ISearchSegmentScreen{
  onClose : () => void;
  onLocationChange : (location: IPoint) => void;
  onSearch: () => void;
  roadNumber? : string;
  section? : string;
}

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

const  SearchSegmentScreen : FC<ISearchSegmentScreen>  = ({onLocationChange, roadNumber, section, onSearch, onClose}) => {

    const { t } = useTranslation();
    const classes = useStyles();

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

export default SearchSegmentScreen;

