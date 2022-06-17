import React, { FC } from 'react';
import LocationMap from 'components/molecules/LocationMap';
import { IWidgetMostSevereAccidentsData } from 'models/WidgetData';
import { Box } from '@material-ui/core';
import carOrangeIcon from 'assets/map/car-orange-marker.png';
import carRedIcon from 'assets/map/car-red-marker.png';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

interface IProps {
  data: IWidgetMostSevereAccidentsData;
  sizeOptions: number;
}
const useStyles = makeStyles({
  carLogo: {
    height: '20px',
    width: '20px',
  },
  iconsContainer: {
    display: 'flex',
    paddingTop: '8px',
    marginInlineStart: '5px',
  },
  singleIcon: {
    display: 'flex',
    paddingTop: '4px',
    marginInlineEnd: '20px',
    fontWeight: 400,
    fontSize: '13px',
    alignItems: 'center',
  },
  logoTextSpace: {
    marginInlineStart: '5px',
  },
  mapBox: {
    height: '85%',
    paddingTop: '2rem',
  },
});

const MostSevereAccidentsMapWidget: FC<IProps> = ({ data, sizeOptions }) => {
  const classes = useStyles();
  const { items } = data;
  const { t } = useTranslation();

  return (
    <Box height={'100%'}>
      <Box className={classes.mapBox}>
        <LocationMap items={items} />
      </Box>
      <Box className={classes.iconsContainer}>
        <Box className={classes.singleIcon}>
          <img className={classes.carLogo} src={carRedIcon} alt="fatal car accident" />
          <Box className={classes.logoTextSpace}>{t('textView.fatal.singular')}</Box>
        </Box>
        <Box className={classes.singleIcon}>
          <img className={classes.carLogo} src={carOrangeIcon} alt="severe car accident" />
          <Box className={classes.logoTextSpace}>{t('textView.severe.singular')} </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default MostSevereAccidentsMapWidget;
