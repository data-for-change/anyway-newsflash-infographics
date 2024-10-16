import { makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';
import { HeaderVariant } from 'services/widgets.style.service';
import CardBackgrounRoadImage from 'assets/card-bg-road.png';
import CardBackgrounRoadImageOrYarok from 'assets/card-bg-road-oryarok.png';
import CardBackgrounMapImage from 'assets/card-bg-map.png';

const ROAD_IMAGE_HEIGHT = 130;
const MAP_IMAGE_HEIGHT = '100%';
let backgroundImage = CardBackgrounRoadImage;

interface IProps {
  variant: HeaderVariant;
  org?: string;
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

const CardBackgroundImage: FC<IProps> = ({ variant,  org = 'no_organization'}) => {
  const classes = useStyles({ variant });
  let src;
  let height;

  switch (org) {
    case 'or_yarok':
      backgroundImage = CardBackgrounRoadImageOrYarok;
      break;
    case 'no_organization':
      backgroundImage = CardBackgrounRoadImage;
      break;
  }

  switch (variant) {
    case HeaderVariant.Centered:
    case HeaderVariant.CenteredNoTitle:
    case HeaderVariant.Logo:
      src = backgroundImage;
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
