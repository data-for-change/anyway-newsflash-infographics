import { Box, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { HeaderVariant } from 'services/widgets.style.service';
import RoadNumberImage from './RoadNumberImage';
import LamasImage from 'assets/cbs.png';
import AnywayImage from 'assets/anyway.png';
import { Typography, Logo } from 'components/atoms';
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
  orgIconPath?: string;
}
const CardHeader: FC<IProps> = ({ variant, text, road,orgIconPath }) => {
  const classes = useStyles();
  let headerContent = null;
  const headerText = splitTextHeader(text);
  const roadNumberComp: JSX.Element | null = road ? <RoadNumberImage roadNumber={road} /> : null;

  switch (variant) {
    case HeaderVariant.Centered :
    case HeaderVariant.CenteredNoTitle:
      headerContent = (
        <Box display="flex" alignItems="center" flex={1}>
          {roadNumberComp}
          <Box display="flex" justifyContent="center" px={2} className={classes.textWrapper}>
            <Box display="flex" flexDirection="column">
              { variant === HeaderVariant.Centered &&
                <>
                <Typography.Body1>{headerText?.textLine1}</Typography.Body1>
                <Typography.Body1>{headerText?.textLine2}</Typography.Body1>
                </>
              }
            </Box>
          </Box>
        </Box>
      );
      break;
    case HeaderVariant.Label:
      headerContent = (
        <Box className={classes.labelWrapper} pr={2}>
          <Box display="flex" justifyContent="center" alignItems="center" mr={4}>
            {roadNumberComp}
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
          <Box className={classes.roadImageWrapper}>{roadNumberComp}</Box>
          <Box ml={'7%'} display="flex" flex={1} justifyContent="flex-end" alignItems="flex-end" height={30}>
            <Box className={classes.logosContainer} mx={1}>
              <Logo src={AnywayImage} alt={'Anyway'} height={20} />
            </Box>
            <Logo src={orgIconPath || LamasImage} alt={'Lamas'} height={30} />

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
