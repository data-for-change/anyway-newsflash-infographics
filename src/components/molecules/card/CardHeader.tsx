import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { HeaderVariant } from '../../../services/widgets.style.service';
import RoadNumberImage from './RoadNumberImage';
import { Logo } from '../../atoms/Logo';
import LamasImage from '../../../assets/cbs.png';
import AnywayImage from '../../../assets/anyway.png';

interface IProps {
  variant: HeaderVariant;
  text: string;
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
            {text}
          </Box>
        </Box>
      );
      break;
    case HeaderVariant.Logo:
      headerContent = (
        <Box display="flex">
          <RoadNumberImage roadNumber={road} />
          <Logo src={LamasImage} alt={'Lamas'} height={30} />
          <Logo src={AnywayImage} alt={'Anyway'} height={20} />
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
