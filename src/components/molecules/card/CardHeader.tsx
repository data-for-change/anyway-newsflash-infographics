import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnywayImage from 'assets/anyway.png';
import LamasImage from 'assets/cbs.png';
import { Logo, Typography } from 'components/atoms';
import React, { FC } from 'react';
import { HeaderVariant } from 'services/widgets.style.service';
import { opacity80percent, silverSmokeColor } from 'style/';
import { splitTextHeader } from 'utils/string.utils';
import RoadNumberImage from './RoadNumberImage';

const PREFIX = 'CardHeader';

const classes = {
  wrapper: `${PREFIX}-wrapper`,
  textWrapper: `${PREFIX}-textWrapper`,
  roadImageWrapper: `${PREFIX}-roadImageWrapper`,
  logosContainer: `${PREFIX}-logosContainer`,
  labelWrapper: `${PREFIX}-labelWrapper`,
  label: `${PREFIX}-label`,
};

const StyledBox = styled(Box)({
  [`& .${classes.wrapper}`]: {
    width: '100%',
    height: '100%',
  },
  [`& .${classes.textWrapper}`]: {
    width: '100%',
  },
  [`& .${classes.roadImageWrapper}`]: {
    position: 'relative',
    top: '40%',
  },
  [`& .${classes.logosContainer}`]: {
    height: '100%',
  },
  [`& .${classes.labelWrapper}`]: {
    backgroundColor: silverSmokeColor + opacity80percent,
    position: 'absolute',
    width: 'fit-content',
    display: 'flex',
    right: 0,
  },
  [`& .${classes.label}`]: {
    maxWidth: 'min-content',
  },
});

interface IProps {
  variant: HeaderVariant;
  text: string | undefined;
  road: number;
}
const CardHeader: FC<IProps> = ({ variant, text, road }) => {
  let headerContent = null;
  const headerText = splitTextHeader(text);

  switch (variant) {
    case HeaderVariant.Centered:
      headerContent = (
        <StyledBox display="flex" alignItems="center" flex={1}>
          <RoadNumberImage roadNumber={road} />
          <Box display="flex" justifyContent="center" px={2} className={classes.textWrapper}>
            <Box display="flex" flexDirection="column">
              <Typography.Body1>{headerText?.textLine1}</Typography.Body1>
              <Typography.Body1>{headerText?.textLine2}</Typography.Body1>
            </Box>
          </Box>
        </StyledBox>
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
            <Box className={classes.logosContainer} mx={1}>
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
