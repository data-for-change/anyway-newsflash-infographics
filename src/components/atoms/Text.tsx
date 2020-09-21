import React, { FC, ElementType } from 'react';
import MaterialTypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export enum TextType {
  PAGE_TITLE,
  CONTENT_TITLE,
  CONTENT,
  NEWS_FLASH_TITLE,
  NEWS_FLASH_CONTENT,
  NEWS_FLASH_DATETIME,
  WIDGET_TITLE,
  WIDGET_CONTENT,
  WIDGET_TABLE_TITLE,
  WIDGET_TABLE_CONTENT,
  WIDGET_TABLE_HEADER,
}

interface TProps {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'srOnly'
    | 'inherit';
  component: ElementType;
}
interface IProps {
  type: TextType;
}

const useStyles = makeStyles({
  ltr: {
    direction: 'ltr',
  },
});

const Typography: FC<TProps> = ({ component, variant, children }) => {
  const { i18n } = useTranslation();
  const isLtr = i18n.dir() === 'ltr';
  const classes = useStyles();
  return (
    <MaterialTypography className={isLtr ? classes.ltr : ''} variant={variant} component={component}>
      {children}
    </MaterialTypography>
  );
};

const Text: FC<IProps> = ({ type, children }) => {
  switch (type) {
    case TextType.PAGE_TITLE:
      return (
        <Typography variant="h4" component="h1">
          {children}
        </Typography>
      );

    case TextType.CONTENT_TITLE:
      return (
        <Typography variant="body1" component="h2">
          {children}
        </Typography>
      );

    case TextType.CONTENT:
      return (
        <Typography variant="body1" component="p">
          {children}
        </Typography>
      );

    case TextType.NEWS_FLASH_TITLE:
      return (
        <Typography variant="body1" component="p">
          {children}
        </Typography>
      );

    case TextType.NEWS_FLASH_CONTENT:
      return (
        <Typography variant="body1" component="p">
          {children}
        </Typography>
      );

    case TextType.NEWS_FLASH_DATETIME:
      return (
        <p>
          <time>{children}</time>
        </p>
      );
    case TextType.WIDGET_TITLE:
      return (
        <Typography variant="body1" component="h2">
          {children}
        </Typography>
      );

    case TextType.WIDGET_CONTENT:
      return (
        <Typography variant="body1" component="p">
          {children}
        </Typography>
      );
    // todo: convert to Typography item
    case TextType.WIDGET_TABLE_TITLE:
      return <h4>{children}</h4>;

    case TextType.WIDGET_TABLE_HEADER:
      return <h5>{children}</h5>;

    case TextType.WIDGET_TABLE_CONTENT:
      return <p>{children}</p>;
  }
};

export default Text;
