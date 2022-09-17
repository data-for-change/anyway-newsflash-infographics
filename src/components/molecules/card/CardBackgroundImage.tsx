import { makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';
import { HeaderVariant } from 'services/widgets.style.service';
import CardBackgrounRoadImage from 'assets/card-bg-road.png';
import CardBackgrounMapImage from 'assets/card-bg-map.png';

const ROAD_IMAGE_HEIGHT = 130;
const MAP_IMAGE_HEIGHT = '100%';

interface IProps {
  variant: HeaderVariant;
}

const useStyles = makeStyles<Theme, IProps>((theme) => ({
  img: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    right: 0,
    marginInlineStart: (props) => (props.variant === HeaderVariant.Label ? theme.spacing(1) : 0),
  },
}));

const CardBackgroundImage: FC<IProps> = ({ variant }) => {
  const classes = useStyles({ variant });
  let src;
  let height;

  switch (variant) {
    case HeaderVariant.Centered:
    case HeaderVariant.CenteredNoTitle:
    case HeaderVariant.Logo:
      src = CardBackgrounRoadImage;
      height = ROAD_IMAGE_HEIGHT;
      break;
    case HeaderVariant.Label:
      src = CardBackgrounMapImage;
      height = MAP_IMAGE_HEIGHT;
      break;
  }

  return <img height={height} src={src} className={classes.img} alt="" />;
};
export default CardBackgroundImage;
