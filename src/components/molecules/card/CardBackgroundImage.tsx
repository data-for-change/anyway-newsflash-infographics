import { styled } from '@mui/material/styles';
import CardBackgrounMapImage from 'assets/card-bg-map.png';
import CardBackgrounRoadImage from 'assets/card-bg-road.png';
import React, { FC } from 'react';
import { HeaderVariant } from 'services/widgets.style.service';

const PREFIX = 'CardBackgroundImage';

const classes = {
  img: `${PREFIX}-img`,
};

const Root = styled('img')(({ theme }) => ({
  [`&.${classes.img}`]: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    right: 0,
    marginInlineStart: (props: any) => (props.variant === HeaderVariant.Label ? theme.spacing(1) : 0),
  },
}));

const ROAD_IMAGE_HEIGHT = 130;
const MAP_IMAGE_HEIGHT = '100%';

interface IProps {
  variant: HeaderVariant;
}

const CardBackgroundImage: FC<IProps> = ({ variant }) => {
  let src;
  let height;

  switch (variant) {
    case HeaderVariant.Centered:
    case HeaderVariant.Logo:
      src = CardBackgrounRoadImage;
      height = ROAD_IMAGE_HEIGHT;
      break;
    case HeaderVariant.Label:
      src = CardBackgrounMapImage;
      height = MAP_IMAGE_HEIGHT;
      break;
  }

  return <Root height={height} src={src} className={classes.img} alt="" />;
};
export default CardBackgroundImage;
