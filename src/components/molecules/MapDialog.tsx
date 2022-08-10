import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, DialogActions, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Dialog, Button, Typography } from 'components/atoms';
import LocationSelect from 'components/molecules/LocationSelect';
import { IPoint } from 'models/Point';
import { useStore } from 'store/storeConfig';
import { fetchStreetsByCity } from 'services/getCitiesAndStreets.service';

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
  const [streetsOptions, setStreetsOptions] = useState<Array<streetOption>>([]);
  const [cityValue, setCityValue] = useState<cityOption>({});
  const [streetValue, setStreetValue] = useState<streetOption>({});
  const store = useStore();

  interface cityOption {
    yishuv_name?: string;
    yishuv_symbol?: number;
  }
  interface streetOption {
    street?: number;
    street_hebrew?: string;
  }

  useEffect(() => {
    // api call to get all cities list
    store.fetchCitiesList();
  }, [store]);

  async function setCityGetStreets(event: ChangeEvent<{}>, value: cityOption | null | undefined) {
    setStreetsOptions([]);
    setStreetValue({});
    if (value) {
      setCityValue({ yishuv_name: value.yishuv_name, yishuv_symbol: value.yishuv_symbol });
      const streetsData = await fetchStreetsByCity(value.yishuv_symbol);
      setStreetsOptions(streetsData);
    }
  }

  function setChosenStreet(event: ChangeEvent<{}>, value: streetOption | null | undefined) {
    if (value) {
      setStreetValue(value);
    }
  }

  function streetCityResultsPage() {
    setCityValue({});
    setStreetValue({});
    onStreetAndCitySearch(cityValue.yishuv_name, streetValue.street_hebrew);
  }

  const SearchCityAndStreetScreen = () => {
    return (
      <Box>
        <Box height="60vh" display="flex" flexWrap="wrap">
          <Autocomplete
            className={classes.inputSpace}
            options={store.citiesList}
            getOptionLabel={(option) => (option.yishuv_name ? option.yishuv_name : '')}
            onChange={(event, value) => setCityGetStreets(event, value)}
            value={{ yishuv_name: cityValue.yishuv_name, yishuv_symbol: cityValue.yishuv_symbol }}
            style={{ minWidth: 300 }}
            renderInput={(params) => <TextField {...params} label={t('mapDialog.city')} variant="outlined" />}
          />
          <Autocomplete
            className={classes.inputSpace}
            options={streetsOptions}
            getOptionLabel={(option) => (option.street_hebrew ? option.street_hebrew : '')}
            style={{ minWidth: 300 }}
            value={{ street: streetValue.street, street_hebrew: streetValue.street_hebrew }}
            onChange={(event, value) => setChosenStreet(event, value)}
            disabled={streetsOptions.length === 0}
            renderInput={(params) => <TextField {...params} label={t('mapDialog.street')} variant="outlined" />}
          />
        </Box>
        <DialogActions className={classes.actions}>
          <Button.Standard onClick={streetCityResultsPage} disabled={!cityValue.yishuv_name || !streetValue.street}>
            {t('mapDialog.searchButton')}
          </Button.Standard>
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
        {searchScreen === 'segment' && <SearchSegmentScreen onLocationChange={onLocationChange} onClose={onClose}
                                                           onSearch={onSearch} section={section} roadNumber={roadNumber}/>}
        {searchScreen === 'cityAndStreet' && <SearchCityAndStreetScreen />}
      </Box>
    </Dialog>
  );
};


const SearchSegmentScreen : FC<any> = ({section, roadNumber, onLocationChange, onSearch, onClose}) => {
  const classes = useStyles();
  const { t } = useTranslation();

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


export default MapDialog;
