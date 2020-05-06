import React, { FC, useRef } from 'react'
import { Card, CardContent, CardActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/road-image.png';
import widgetToJpeg from '../../services/to-image.service';
import { LamasLogo } from '../atoms/LamasLogo';
import { AnywayLogo } from '../atoms/AnywayLogo';
import { AnyWayButton } from '../atoms/AnyWayButton';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';

interface IProps {}

const useStyles = makeStyles({
    root: {
      position: 'relative', // for meta tags
      width: '360px',
      height: '440px',
      borderRadius: '15px',
      margin: '10px',
      padding: '16px',
      backgroundImage: `url(${Image})`,
    },
    dimension: {
			width: '100%',
      height: '90%',
      padding: 0,
    },
		space: {
			justifyContent: 'space-between',
		},
    button: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  });

const AnyWayCard: FC<IProps> = ({children}) => {
  const classes = useStyles();
  const widget = useRef<HTMLDivElement>(null);
  const imgDownloadHandler = () => {
    widgetToJpeg(widget);
  };

  return (
    <Card ref={widget} className={classes.root}>
      <CardContent className={classes.dimension}>{children}</CardContent>
      <CardActions className={classes.space}>
        <AnyWayButton className={classes.button } onClick={imgDownloadHandler}>
          <GetAppOutlinedIcon />
        </AnyWayButton>
				<div>
					<div style={{ display: 'inline', margin: '10px' }}>
						<LamasLogo height={'30px'} />
					</div>
					<AnywayLogo height={'20px'} />
				</div>
      </CardActions>
    </Card>
  );
};
export default AnyWayCard;
