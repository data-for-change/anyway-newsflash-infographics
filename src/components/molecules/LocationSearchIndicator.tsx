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
  },
});


const LocationSearchIndicator: FC = () => {
	const classes = useStyles();
  	const { t } = useTranslation();


  return (
    <Box className={classes.root} display="flex" justifyContent="center" p={2}>
      <Typography.Body5>{t('locationIndicator')}</Typography.Body5>
    </Box>
  );
};

export default LocationSearchIndicator;
