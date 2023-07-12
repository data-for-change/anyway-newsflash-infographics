import {ChangeEvent, FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {ICityOption, IStreetOption} from "models/Map";
import {useStore} from "store/storeConfig";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {fetchStreetsByCity} from "services/getCitiesAndStreets.service";
import {Box, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface ISearchCityAndStreet{
  onStreetAndCityChoice: (street: IStreetOption, city: ICityOption) => void;
}

const SearchCityAndStreet : FC<ISearchCityAndStreet> = ({onStreetAndCityChoice}) => {
  const { t } = useTranslation();
  const [streetsOptions, setStreetsOptions] = useState<Array<IStreetOption>>([]);
  const [cityValue, setCityValue] = useState<ICityOption>({});
  const [streetValue, setStreetValue] = useState<IStreetOption>({});
  const store = useStore();

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      inputSpace: {
        marginTop: 20,
        marginInlineEnd: 20,
      },
    }),
  );

  const classes = useStyles();

  async function setCityGetStreets(event: ChangeEvent<{}>, value?: ICityOption | null) {
    setStreetsOptions([]);
    setStreetValue({});
    if (value) {
      setCityValue({ yishuv_name: value.yishuv_name, yishuv_symbol: value.yishuv_symbol });
      const streetsData = await fetchStreetsByCity(value.yishuv_symbol);
      setStreetsOptions(streetsData);
    }
  }

  function setChosenStreet(event: ChangeEvent<{}>, value?:IStreetOption | null) {
    if (value) {
      setStreetValue(value);
      onStreetAndCityChoice(value, cityValue);
    }
  }

  return(
    <Box display="flex" flexWrap="wrap">
      <Autocomplete
        className={classes.inputSpace}
        options={store.citiesList}
        getOptionLabel={(option) => (option.yishuv_name ? option.yishuv_name : '')}
        onChange={(event, value) => setCityGetStreets(event, value)}
        value={{ yishuv_name: cityValue.yishuv_name, yishuv_symbol: cityValue.yishuv_symbol }}
        style={{ minWidth: 300 }}
        renderInput={(params) =>
          <TextField {...params} label={t('mapDialog.city')} variant="outlined" />}
      />
      <Autocomplete
        className={classes.inputSpace}
        options={streetsOptions}
        getOptionLabel={(option) => (option.street_hebrew ? option.street_hebrew : '')}
        style={{ minWidth: 300 }}
        value={{ street: streetValue.street, street_hebrew: streetValue.street_hebrew }}
        onChange={(event, value) => setChosenStreet(event, value)}
        disabled={streetsOptions.length === 0}
        renderInput={(params) =>
          <TextField {...params} label={t('mapDialog.street')} variant="outlined" />}
      />
    </Box>)
}

export default SearchCityAndStreet;
