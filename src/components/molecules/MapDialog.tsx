import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Dialog , Typography } from 'components/atoms';
import { IPoint } from 'models/Point';
import { useStore } from 'store/storeConfig';
import SearchCityAndStreetScreen from 'components/molecules/SearchCityAndStreetScreen';
import SearchSegmentScreen from 'components/molecules/SearchSegmentScreen';

interface IProps {
  section?: string;
  roadNumber?: string;
  open: boolean;
  onClose: () => void;
  onLocationChange: (location: IPoint) => void;
  onSearch: () => void;
  onStreetAndCitySearch: (street?: string, city?: string) => void;
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

const MapDialog: FC<IProps> = ({
  section,
  open,
  onClose,
  roadNumber,
  onLocationChange,
  onSearch,
  onStreetAndCitySearch,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [searchScreen, setSearchScreen] = useState<'segment' | 'cityAndStreet'>('segment');
  const store = useStore();

  useEffect(() => {
    // api call to get all cities list
    store.fetchCitiesList();
  }, [store]);

// the code I deleted should be here...
// SearchCityAndStreetScreen()

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
        {searchScreen === 'segment' && <SearchSegmentScreen onLocationChange={onLocationChange} roadNumber={roadNumber} section={section} onSearch={onSearch} onClose={onClose}/>}
        {searchScreen === 'cityAndStreet' && <SearchCityAndStreetScreen onStreetAndCitySearch={onStreetAndCitySearch} onClose={onClose}
        />}
      </Box>
    </Dialog>
  );
};

export default MapDialog;
