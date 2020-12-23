import React, { FC, useState } from 'react';
import { Card, CardContent, CardActions, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LamasImage from '../../../assets/cbs.png';
import AnywayImage from '../../../assets/anyway.png';
import widgetToImage from '../../../services/to-image.service';
import { AnyWayButton } from '../../atoms/AnyWayButton';
import { Logo } from '../../atoms';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import CardEditor from '../../organisms/CardEditorDialog';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

import { fontFamilyString, cardFooterHeight } from '../../../style';
import CardHeader from './CardHeader';
import { FooterVariant, getWidgetVariant, HeaderVariant } from '../../../services/widgets.style.service';
import { getSizes } from './card.util';
import CardBackgroundImage from './CardBackgroundImage';

const DEFAULTE_SIZE = 1;
export interface CardLayoutOptions {
  landscape?: boolean;
  size?: number;
}
interface IProps {
  widgetName: string;
  roadNumber: number;
  actionButtons?: boolean;
  layoutOptions?: CardLayoutOptions;
  getCardRef?: (element: HTMLElement) => any;
  title: string | undefined;
}

const getSizeFactor = (options: CardLayoutOptions | undefined): number =>
  options?.size ? options.size : DEFAULTE_SIZE;

const useStyles = makeStyles({
  root: {
    fontFamily: fontFamilyString,
    position: 'relative', // for meta tags
    boxSizing: 'border-box',
    zIndex: 0, // lower than background image
  },
  content: {
    height: '100%',
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

const AnyWayCard: FC<IProps> = ({
  widgetName,
  roadNumber,
  children,
  layoutOptions,
  getCardRef,
  actionButtons = true,
  title,
}) => {
  const [element, setElement] = useState({});
  const [isOpen, setOpen] = useState(false);
  const handleCardEditorOpen = () => setOpen(true);
  const handleCardEditorClose = () => setOpen(false);
  const variant = getWidgetVariant(widgetName);
  const factor = getSizeFactor(layoutOptions);
  const sizes = getSizes(variant, factor);

  const classes = useStyles();
  const imgDownloadHandler = () => {
    if (element && element instanceof HTMLElement) {
      widgetToImage(widgetName, element);
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

  const refFn = (element: HTMLDivElement) => {
    setElement(element);
    if (getCardRef) {
      getCardRef(element); // send ref to parent
    }
  };

  return (
    <div ref={refFn}>
      <Card className={classes.root} variant="outlined">
        <Box height={sizes.height} width={sizes.width} position="relative" padding={3}>
          {/* BACKGROUND IMAGE */}
          <CardBackgroundImage variant={variant.header} />

          {/* HEADER */}
          {variant.header !== HeaderVariant.None && (
            <Box height={sizes.headerHeight} width="100%">
              <CardHeader variant={variant.header} text={title} road={roadNumber}></CardHeader>
            </Box>
          )}

          {/* CONTENT */}
          <Box height={sizes.contentHeight} width="100%">
            <CardContent className={classes.content}>{children}</CardContent>
          </Box>

          {/* FOOTER */}
          {/* Todo: refactor footer as a seperate component */}
          {variant.footer !== FooterVariant.None && (
            <Box height={sizes.footerHeight} width="100%">
              <CardActions className={classes.actions}>
                {buttons}
                <CardEditor isOpen={isOpen} onClose={handleCardEditorClose} widgetName={widgetName} text={title} />
                <div className={classes.actionsSpace}></div>
                <Logo src={LamasImage} alt={'Lamas'} height={30} />
                <Logo src={AnywayImage} alt={'Anyway'} height={20} />
              </CardActions>
            </Box>
          )}
        </Box>
      </Card>
    </div>
  );
};
export default AnyWayCard;
