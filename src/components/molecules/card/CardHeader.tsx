import { Box, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { HeaderVariant } from 'services/widgets.style.service';
import RoadNumberImage from './RoadNumberImage';
import LamasImage from 'assets/cbs.png';
import AnywayImage from 'assets/anyway.png';
import { Typography, Logo } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import { silverSmokeColor, opacity80percent } from 'style/';
import { splitTextHeader } from 'utils/string.utils';

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    width: '100%',
  },
  roadImageWrapper: {
    position: 'relative',
    top: '40%',
  },
  logosContainer: {
    height: '100%',
  },
  labelWrapper: {
    backgroundColor: silverSmokeColor + opacity80percent,
    position: 'absolute',
    width: 'fit-content',
    display: 'flex',
    right: 0,
  },
  label: {
    maxWidth: 'min-content',
  },
});

interface IProps {
  variant: HeaderVariant;
  text: string | undefined;
  road: number;
}
const CardHeader: FC<IProps> = ({ variant, text, road }) => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  let headerContent = null;

  const headerText = splitTextHeader(text);

  switch (variant) {
    case HeaderVariant.Centered:
      headerContent = (
        <Box display="flex" alignItems="center" flex={1}>
          <RoadNumberImage roadNumber={road} />
          <Box display="flex" justifyContent="center" px={2} className={classes.textWrapper}>
            <Box display="flex" flexDirection="column">
              <Typography.Body1>{headerText?.textLine1}</Typography.Body1>
              <Typography.Body1>{headerText?.textLine2}</Typography.Body1>
            </Box>
          </Box>
        </Box>
      );
      break;
    case HeaderVariant.Label:
      headerContent = (
        <Box className={classes.labelWrapper} pr={2}>
          <Box display="flex" justifyContent="center" alignItems="center" mr={4}>
            <RoadNumberImage roadNumber={road} />
          </Box>
          <Box textAlign="center" px={2} className={classes.label}>
            <Typography.Body1>{text}</Typography.Body1>
          </Box>
        </Box>
      );
      break;
    case HeaderVariant.Logo:
      headerContent = (
        <Box display="flex" flex={1}>
          <Box className={classes.roadImageWrapper}>
            <RoadNumberImage roadNumber={road} />
          </Box>
          <Box ml={'7%'} display="flex" flex={1} justifyContent="flex-end" alignItems="flex-end" height={30}>
            <Box className={classes.logosContainer} m={i18n.language === 'he' ? '0 0 0 2.5%' : '0 2.5% 0 0'}>
              <Logo src={LamasImage} alt={'Lamas'} height={30} />
            </Box>
            <Logo src={AnywayImage} alt={'Anyway'} height={20} />
          </Box>
        </Box>
      );
      break;
  }

  return (
    <Box className={classes.wrapper} display="flex">
      {headerContent}
    </Box>
  );
};
export default CardHeader;
