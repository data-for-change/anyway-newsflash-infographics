import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { HeaderVariant } from '../../../services/widgets.style.service';
import { cardHeaderHeight } from '../../../style';

interface IProps {
  variant: HeaderVariant;
  text: string;
  road: number;
}
const CardHeader: FC<IProps> = ({ variant, text, road }) => {
  let header = null;

  switch (variant) {
    case HeaderVariant.Centered:
      header = <Box height={cardHeaderHeight}>{text}</Box>;
      break;
    case HeaderVariant.Logo:
      header = <Box height={cardHeaderHeight}>{text}</Box>;
      break;
  }

  return header;
};
export default CardHeader;
