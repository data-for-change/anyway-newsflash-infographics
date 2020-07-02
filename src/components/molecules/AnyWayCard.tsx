import React, { FC, useRef, useState } from 'react';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RoadImage from '../../assets/road-image.png';
import widgetToImage from '../../services/to-image.service';
import { AnyWayButton } from '../atoms/AnyWayButton';
import { Logo } from '../atoms/Logo';
import LamasImage from '../../assets/cbs.png';
import AnywayImage from '../../assets/anyway.png';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import CardEditor from '../organisms/CardEditorDialog';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

import { fontFamilyString, cardWidth, cardHeight, cardPadding, cardFooterHeight } from '../../style';

const DEFAULTE_SIZE = 1;
export interface CardLayoutOptions {
  landscape?: boolean;
  size?: number;
}
interface IProps {
  widgetName: string;
  actionButtons?: boolean;
  layoutOptions?: CardLayoutOptions;
}

const getSize = (options: CardLayoutOptions | undefined): number =>
  options && options.size ? options.size : DEFAULTE_SIZE;

const getCardWidth = (options: CardLayoutOptions | undefined) => {
  const baseValue = options && options.landscape ? cardHeight : cardWidth;
  return baseValue * getSize(options);
};

const getCardHeight = (options: CardLayoutOptions | undefined) => {
  const baseValue = options && options.landscape ? cardWidth : cardHeight;
  return baseValue * getSize(options);
};

const getContentHeight = (options: CardLayoutOptions | undefined) => {
  const height = getCardHeight(options);
  return height - cardFooterHeight - 2 * cardPadding;
};

const useStyles = makeStyles({
  root: {
    fontFamily: fontFamilyString,
    position: 'relative', // for meta tags
    width: (options) => getCardWidth(options),
    height: (options: CardLayoutOptions | undefined) => getCardHeight(options),
    padding: cardPadding,
    backgroundImage: `url(${RoadImage})`,
    boxSizing: 'border-box',
  },
  content: {
    height: (options: CardLayoutOptions | undefined) => getContentHeight(options),
    boxSizing: 'border-box',
    padding: 0,
  },
  actions: {
    boxSizing: 'border-box',
    height: cardFooterHeight,
    padding: 0,
    alignItems: 'flex-end',
  },
  actionsSpace: {
    flex: 1,
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

const AnyWayCard: FC<IProps> = ({ widgetName, children, layoutOptions, actionButtons = true }) => {
  const [isOpen, setOpen] = useState(false);
  const handleCardEditorOpen = () => setOpen(true);
  const handleCardEditorClose = () => setOpen(false);

  const classes = useStyles(layoutOptions);
  const widget = useRef<HTMLDivElement>(null);
  const imgDownloadHandler = () => {
    if (widget && widget.current) {
      widgetToImage(widgetName, widget.current);
    }
  };
  const buttons = !actionButtons ? null : (
    <>
      <AnyWayButton className={classes.button} disableRipple={true} onClick={imgDownloadHandler}>
        <GetAppOutlinedIcon />
      </AnyWayButton>
      <AnyWayButton className={classes.button} disableRipple={true} onClick={handleCardEditorOpen}>
        <SettingsOverscanIcon />
      </AnyWayButton>
    </>
  );
  return (
    <Card ref={widget} className={classes.root} variant="outlined">
      <CardContent className={classes.content}>{children}</CardContent>
      <CardActions className={classes.actions}>
        {buttons}
        <CardEditor isOpen={isOpen} onClose={handleCardEditorClose} widgetName={widgetName} />
        <div className={classes.actionsSpace}></div>
        <Logo src={LamasImage} alt={'Lamas'} height={'30px'} />
        <Logo src={AnywayImage} alt={'Anyway'} height={'20px'} />
      </CardActions>
    </Card>
  );
};
export default AnyWayCard;
