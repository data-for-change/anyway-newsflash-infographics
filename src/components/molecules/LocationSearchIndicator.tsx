import { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import { Typography } from 'components/atoms';
import { oceanBlueColor, secondaryBgColor } from 'style';

const useStyles = makeStyles({
  root: {
    color: oceanBlueColor,
    backgroundColor: secondaryBgColor,
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
  },
});

const gps = 'gps';
const cityAndStreet = 'cityAndStreet';

const LocationSearchIndicator: FC<any> = ({ searchType }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Box className={classes.root}>
      <Typography.Body5>
        {searchType === gps && t('locationIndicator')}
        {searchType === cityAndStreet && t('cityAndStreetIndicator')}
      </Typography.Body5>
    </Box>
  );
};

export default LocationSearchIndicator;
