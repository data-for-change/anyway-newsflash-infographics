import React, { FunctionComponent, useRef } from 'react';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import widgetToJpeg from '../../services/to-image.service';
import Image from '../../assets/road-image.png';
import { AnywayLogo } from '../atoms/AnywayLogo';
import { AnyWayButton } from '../atoms/AnyWayButton';
interface IProps {}

const useStyles = makeStyles({
  root: {
    width: '360px',
    height: '440px',
    borderRadius: '15px',
    margin: '10px',
    padding: '16px',
    backgroundImage: `url(${Image})`,
  },
  space: {
    justifyContent: 'space-between',
  },
  dimension: {
    width: '100%',
    height: '90%',
    padding: 0,
  },
});
const AnyWayCard: FunctionComponent<IProps> = (props) => {
  const classes = useStyles();
  const widget = useRef<HTMLDivElement>(null);
  const imgDownloadHandler = () => {
    widgetToJpeg(widget);
  };

  return (
    <Card ref={widget} className={classes.root}>
      <CardContent className={classes.dimension}>{props.children}</CardContent>
      <CardActions className={classes.space}>
        <AnyWayButton onClick={imgDownloadHandler}>
          <SvgIcon viewBox="0 0 24 24">
            <path
              fill="#000000"
              d="M13,5V11H14.17L12,13.17L9.83,11H11V5H13M15,3H9V9H5L12,16L19,9H15V3M19,18H5V20H19V18Z"
            />
          </SvgIcon>
        </AnyWayButton>
        <AnywayLogo height={'25px'} />
      </CardActions>
    </Card>
  );
};
export default AnyWayCard;
