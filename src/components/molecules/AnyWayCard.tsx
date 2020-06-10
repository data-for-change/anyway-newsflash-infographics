import React, { FC, useRef } from 'react';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RoadImage from '../../assets/road-image.png';
import widgetToImage from '../../services/to-image.service';
import { AnyWayButton } from '../atoms/AnyWayButton';
import { Logo } from '../atoms/Logo';
import LamasImage from '../../assets/cbs.png';
import AnywayImage from '../../assets/anyway.png';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import {
  fontFamilyString,
  cardWidth,
  cardHeight,
  cardPadding,
  cardContentHeight,
  cardActionsHeight,
} from '../../style';

interface IProps {
  widgetName: string;
}

const useStyles = makeStyles({
  root: {
    fontFamily: fontFamilyString,
    position: 'relative', // for meta tags
    width: cardWidth,
    height: cardHeight,
    padding: cardPadding,
    backgroundImage: `url(${RoadImage})`,
    boxSizing: 'border-box',
  },
  content: {
    height: cardContentHeight,
    boxSizing: 'border-box',
    padding: 0,
  },
  actions: {
    boxSizing: 'border-box',
    height: cardActionsHeight,
    padding: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  logoSpace: {
    display: 'inline',
    margin: '10px',
  },
  logoContainer: {
    marginRight: 'auto',
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

const AnyWayCard: FC<IProps> = ({ widgetName, children }) => {
  const classes = useStyles();
  const widget = useRef<HTMLDivElement>(null);
  const imgDownloadHandler = () => {
    if (widget && widget.current) {
      widgetToImage(widgetName, widget.current);
    }
  };

  return (
    <Card ref={widget} className={classes.root} variant="outlined">
      <CardContent className={classes.content}>{children}</CardContent>
      <CardActions className={classes.actions}>
        <AnyWayButton className={classes.button} disableRipple={true} onClick={imgDownloadHandler}>
          <GetAppOutlinedIcon />
        </AnyWayButton>
        <div className={classes.logoContainer}>
          <div className={classes.logoSpace}>
            <Logo src={LamasImage} alt={'Lamas'} height={'30px'} />
          </div>
          <Logo src={AnywayImage} alt={'Anyway'} height={'20px'} />
        </div>
      </CardActions>
    </Card>
  );
};
export default AnyWayCard;
