import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { HeaderVariant } from '../../../services/widgets.style.service';
import RoadNumberImage from './RoadNumberImage';
import LamasImage from '../../../assets/cbs.png';
import AnywayImage from '../../../assets/anyway.png';
import { Typography, Logo } from '../../atoms';

interface IProps {
  variant: HeaderVariant;
  text: string | undefined;
  road: number;
}
const CardHeader: FC<IProps> = ({ variant, text, road }) => {
  let headerContent = null;

  switch (variant) {
    case HeaderVariant.Centered:
      headerContent = (
        <Box display="flex" alignItems="center" flex={1}>
          <RoadNumberImage roadNumber={road} />
          <Box flex={1} textAlign="center">
            <Typography.Body1>{text}</Typography.Body1>
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
            <Box height={'100%'} ml={'2.5%'}>
              {' '}
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
