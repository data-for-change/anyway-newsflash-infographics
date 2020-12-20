import React, { FC, useState } from 'react';
import { Card, CardContent, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import widgetToImage from '../../../services/to-image.service';
import { AnyWayButton } from '../../atoms/AnyWayButton';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

import { fontFamilyString } from '../../../style';
import CardHeader from './CardHeader';
import {
  FooterVariant,
  getWidgetTitle,
  getWidgetVariant,
  HeaderVariant,
} from '../../../services/widgets.style.service';
import { getSizes } from './card.util';
import CardBackgroundImage from './CardBackgroundImage';
import CardFooter from './CardFooter';
import CardEditor from '../../organisms/CardEditorDialog';

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
  dateComment: string;
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
  dateComment,
}) => {
  const [element, setElement] = useState({});
  const [isOpen, setOpen] = useState(false);
  const handleCardEditorOpen = () => setOpen(true);
  const handleCardEditorClose = () => setOpen(false);
  const variant = getWidgetVariant(widgetName);
  const factor = getSizeFactor(layoutOptions);
  const sizes = getSizes(variant, factor);
  const title = getWidgetTitle(widgetName);

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
    <>
      <Card ref={refFn} className={classes.root} variant="outlined">
        <Box height={sizes.height} width={sizes.width} position="relative" padding={3}>
          {/* BACKGROUND IMAGE */}
          <CardBackgroundImage variant={variant.header} />

          {/* HEADER */}
          {variant.header !== HeaderVariant.None && (
            <Box height={sizes.headerHeight} width="100%">
              <CardHeader variant={variant.header} text={title} road={roadNumber} />
            </Box>
          )}

          {/* CONTENT */}
          <Box height={sizes.contentHeight} width="100%">
            <CardContent className={classes.content}>{children}</CardContent>
          </Box>

          {/* FOOTER */}
          {variant.footer !== FooterVariant.None && (
            <Box height={sizes.footerHeight} width="100%">
              <CardFooter dateComment={dateComment} />
            </Box>
          )}
          <CardEditor isOpen={isOpen} onClose={handleCardEditorClose} widgetName={widgetName} />
        </Box>
      </Card>
      {buttons}
    </>
  );
};
export default AnyWayCard;
