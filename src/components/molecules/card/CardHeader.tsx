import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';
import { HeaderVariant } from '../../../services/widgets.style.service';
import RoadNumberImage from './RoadNumberImage';
import LamasImage from '../../../assets/cbs.png';
import AnywayImage from '../../../assets/anyway.png';
import { Typography, Logo } from '../../atoms';
import { useTranslation } from 'react-i18next';
import { silverSmokeColor, opacity80percent } from '../../../style/_globals';

const MAX_WORDS_PER_TITLE_LINE = 5;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    labelWrapper: {
      backgroundColor: silverSmokeColor + opacity80percent,
      position: 'absolute',
      width: 'fit-content',
      display: 'flex',
    },
    label: {
      maxWidth: 'min-content',
    },
  }),
);

interface IProps {
  variant: HeaderVariant;
  text: string | undefined;
  road: number;
}
const CardHeader: FC<IProps> = ({ variant, text, road }) => {
  const { i18n } = useTranslation();
  const classes = useStyles();

  let headerContent = null;
  let textLine1 = text;
  let textLine2;
  const textWordsArr = text?.split(' ');
  const textWordLength = textWordsArr?.length;
  if (textWordLength && textWordLength > MAX_WORDS_PER_TITLE_LINE) {
    const indexToSplit = Math.floor(textWordLength / 2);
    textLine1 = textWordsArr?.slice(0, indexToSplit).join(' ');
    textLine2 = textWordsArr?.slice(indexToSplit).join(' ');
  }

  switch (variant) {
    case HeaderVariant.Centered:
      headerContent = (
        <Box display="flex" alignItems="center" flex={1}>
          <RoadNumberImage roadNumber={road} />
          <Box flex={1} px={2} textAlign="center">
            <Typography.Body1>{textLine1} </Typography.Body1>
            {textLine2 && <Typography.Body1>{textLine2}</Typography.Body1>}
          </Box>
        </Box>
      );
      break;
    case HeaderVariant.Label:
      headerContent = (
        <Box className={classes.labelWrapper}>
          <Box display="flex" justifyContent="center" alignItems="center" pr={2}>
            <RoadNumberImage roadNumber={road} />
          </Box>
          <Box textAlign="center" pl={2} pr={1} className={classes.label}>
            <Typography.Body1>{textLine1} </Typography.Body1>
            {textLine2 && <Typography.Body1>{textLine2}</Typography.Body1>}
          </Box>
        </Box>
      );
      break;
    case HeaderVariant.Logo:
      headerContent = (
        <Box display="flex" flex={1}>
          <Box position={'relative'} top={'40%'}>
            <RoadNumberImage roadNumber={road} />
          </Box>
          <Box ml={'7%'} display="flex" flex={1} justifyContent="flex-end" alignItems="flex-end" height={30}>
            <Box height={'100%'} m={i18n.language === 'he' ? '0 0 0 2.5%' : '0 2.5% 0 0'}>
              <Logo src={LamasImage} alt={'Lamas'} height={30} />
            </Box>
            <Logo src={AnywayImage} alt={'Anyway'} height={20} />
          </Box>
        </Box>
      );
      break;
  }

  return (
    <Box height="100%" width="100%" display="flex">
      {headerContent}
    </Box>
  );
};
export default CardHeader;
