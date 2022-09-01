import { Box, DialogActions, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button } from 'components/atoms';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useStore } from 'store/storeConfig';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, FC } from 'react';
import { ICityOption, IStreetOption } from 'models/Map';


interface ISearchCityAndStreetScreen{
  streetsOptions:Array<IStreetOption>;
  streetValue:IStreetOption;
  setChosenStreet:Function;
  streetCityResultsPage:() => void;
  onClose:() => void;
  setCityGetStreets:(event : ChangeEvent<{}> ,value? : ICityOption | null) => void,
  cityValue:ICityOption,
}
const  SearchCityAndStreetScreen : FC<ISearchCityAndStreetScreen> = (
{setCityGetStreets, cityValue, streetsOptions, streetValue,
setChosenStreet, streetCityResultsPage, onClose}
) => {

  const { t } = useTranslation();
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  actions: {
    gap: theme.spacing(1),
  },
  inputSpace: {
    marginTop: 20,
    marginInlineEnd: 20,
  },
}),
);


  const classes = useStyles();
  const store = useStore();

return(<> <Box>
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
</Box></>)
}

export default SearchCityAndStreetScreen;

