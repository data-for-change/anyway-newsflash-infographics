import { Box, DialogActions } from '@material-ui/core';
import { Button } from 'components/atoms';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {FC, useState} from 'react';
import { ICityOption, IStreetOption } from 'models/Map';
import SearchCityAndStreet from "./SearchCityAndStreet";


interface ISearchCityAndStreetScreen{
  onStreetAndCitySearch: (street?: string, city?: string) => void;
  onClose:() => void;
}

const SearchCityAndStreetScreen : FC<ISearchCityAndStreetScreen> = ({onStreetAndCitySearch, onClose}) => {

  const { t } = useTranslation();
  const [cityValue, setCityValue] = useState<ICityOption>({});
  const [streetValue, setStreetValue] = useState<IStreetOption>({});

  const useStyles = makeStyles((theme: Theme) =>
      createStyles({
        actions: {
          gap: theme.spacing(1),
        },
      }),
  );

  const classes = useStyles();

  function onStreetAndCityChoice(street: IStreetOption, city: ICityOption) {
    setCityValue(city);
    setStreetValue(street);
  }

  function streetCityResultsPage() {
    setCityValue({});
    setStreetValue({});
    onStreetAndCitySearch(cityValue.yishuv_name, streetValue.street_hebrew);
  }

  return(<> <Box>
    <Box height="60vh" display="flex" flexWrap="wrap">
      <SearchCityAndStreet onStreetAndCityChoice={onStreetAndCityChoice} />
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

