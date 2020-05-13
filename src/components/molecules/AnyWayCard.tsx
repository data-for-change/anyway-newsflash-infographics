import React, { FC, useRef } from 'react';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RoadImage from '../../assets/road-image.png';
import widgetToJpeg from '../../services/to-image.service';
import { AnyWayButton } from '../atoms/AnyWayButton';
import { Logo } from '../atoms/Logo';
import LamasImage from '../../assets/cbs.png';
import AnywayImage from '../../assets/anyway.png';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';

interface IProps {
  widgetName: string;
}

const useStyles = makeStyles({
  root: {
    position: 'relative', // for meta tags
    width: '360px',
    height: '440px',
    borderRadius: '15px',
    margin: '10px',
    padding: '16px',
    backgroundImage: `url(${RoadImage})`,
    letterSpacing: 1,
  },
  dimension: {
    width: '100%',
    height: '90%',
    padding: 0,
  },
  space: {
    justifyContent: 'space-between',
  },
  logoSpace: {
    display: 'inline',
    margin: '10px',
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
    if(widget && widget.current) {
      widgetToJpeg(widgetName, widget.current);
    }
  };

  return (
    <Card ref={widget} className={classes.root} variant="outlined">
      <CardContent className={classes.dimension}>{children}</CardContent>
      <CardActions className={classes.space}>
        <AnyWayButton className={classes.button} disableRipple={true} onClick={imgDownloadHandler}>
          <GetAppOutlinedIcon />
        </AnyWayButton>
        <div>
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
