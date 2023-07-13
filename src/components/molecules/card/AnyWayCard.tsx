import React, { FC, useState } from 'react';
import { Card, CardContent, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import widgetToImage from 'services/to-image.service';
// TEXT BOX COMPONENT ADD FEATURE
import  TextBox from 'components/organisms/TextBox'
import { AnyWayButton } from 'components/atoms/AnyWayButton';
import Tooltip from '@material-ui/core/Tooltip';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import TitleIcon from '@material-ui/icons/Title';
import { fontFamilyString } from 'style';
import CardHeader from './CardHeader';
import SocialShare from 'components/atoms/SocialShare';
import { FooterVariant, getWidgetVariant, HeaderVariant } from 'services/widgets.style.service';
import { getSizes } from './card.util';
import CardBackgroundImage from './CardBackgroundImage';
import CardFooter from './CardFooter';
import CardEditor from 'components/organisms/CardEditorDialog';
import { transparent } from 'style';
import { IDateComments } from 'models/WidgetData';
import { OrgLogoData } from 'const/cards.const';

const DEFAULTE_SIZE = 1;
export interface CardSizeOptions {
  size?: number;
}
interface IProps {
  widgetName: string;
  roadNumber: number;
  actionButtons?: boolean;
  sizeOptions?: CardSizeOptions;
  getCardRef?: (element: HTMLElement) => any;
  title: string | undefined;
  dateComment: IDateComments;
  information?: string;
  organizationData?: OrgLogoData;
  subtitle?: string;
  transcription?:string;
}

const getSizeFactor = (options: CardSizeOptions | undefined): number => (options?.size ? options.size : DEFAULTE_SIZE);

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: fontFamilyString,
    position: 'relative', // for meta tags
    boxSizing: 'border-box',
    zIndex: 0,
  },
  content: {
    height: '100%',
    boxSizing: 'border-box',
    padding: 0,
  },
  button: {
    '&:hover': {
      backgroundColor: transparent,
    },
  },
  information: {
    minWidth: theme.spacing(8),
    textAlign: 'center',
    lineHeight: '0.75',
    cursor: 'pointer',
  },
}));

const AnyWayCard: FC<IProps> = ({
  widgetName,
  roadNumber,
  children,
  sizeOptions,
  getCardRef,
  actionButtons = true,
  title,
  dateComment,
  information,
  organizationData,
  subtitle,
  transcription
}) => {
  const [element, setElement] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [widgateOpen,SetWidgetOpen] = useState('')

  const handleCardEditorOpen = (name:string) =>{ 
    SetWidgetOpen(name)
    setOpen(true)
  };

  const handleCardEditorClose = () => setOpen(false);
  const variant = getWidgetVariant(widgetName);
  const factor = getSizeFactor(sizeOptions);
  const sizes = getSizes(variant, factor);

  const classes = useStyles();
  const imgDownloadHandler = () => {
    if (element && element instanceof HTMLElement) {
      widgetToImage(widgetName, element);
    }
  };

  let Widget;

  switch(widgateOpen){

    case 'TextBox':
      Widget = <TextBox isOpen={isOpen} onClose={handleCardEditorClose} widgetName={widgetName} text={transcription} />
      break 
    case 'CardEditor':
      Widget = <CardEditor isOpen={isOpen} onClose={handleCardEditorClose} widgetName={widgetName} text={title} />
  }

  const buttons = !actionButtons ? null : (
    <>
      <AnyWayButton className={classes.button} disableRipple={true} onClick={imgDownloadHandler}>
        <GetAppOutlinedIcon />
      </AnyWayButton>
      <AnyWayButton className={classes.button} disableRipple={true} onClick={() =>{handleCardEditorOpen('CardEditor')}}>
        <SettingsOverscanIcon />
      </AnyWayButton>
      {information && (
        <Box className={classes.information}>
          <Tooltip title={information} placement="top" aria-label="info">
            <span>
              <InfoOutlinedIcon />
            </span>
          </Tooltip>
        </Box>
      )}
     {transcription?(
      <AnyWayButton className={classes.button} disableRipple={true} onClick={() =>{handleCardEditorOpen('TextBox')}}>
      <TitleIcon />
    </AnyWayButton>):null}
    </>
  );
  const refFn = (element: HTMLDivElement) => {
    setElement(element);
    if (getCardRef) {
      getCardRef(element);
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
              <CardHeader
                orgIconPath={organizationData?.path}
                variant={variant.header}
                text={subtitle ? `${title} ${subtitle}` : title}
                road={roadNumber}
              />
            </Box>
          )}

          {/* CONTENT */}
          <Box height={sizes.contentHeight} width="100%">
            <CardContent className={classes.content}>{children}</CardContent>
          </Box>

          {/* FOOTER */}
          {variant.footer !== FooterVariant.None && (
            <Box height={sizes.footerHeight} width="100%">
              <CardFooter
                orgIconPath={organizationData?.path}
                dateComment={dateComment}
                showRange={variant.footer === FooterVariant.LogoWithRange}
              />
            </Box>
          )}
          {Widget}
        </Box>
      </Card>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          {buttons}
        </Box>
        <SocialShare />
      </Box>
    </>
  );
};
export default AnyWayCard;
