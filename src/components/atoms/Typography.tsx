import React, { FC } from 'react';
import Typo from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

interface IBold {
  bold?: boolean;
}
interface IText {
  [property: string]: FC<IBold>;
}

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: 'bold',
  },
}));

const useBold = (bold: boolean) => {
  const classes = useStyles();
  return bold ? classes.bold : '';
};

// for styles of each variant - see 'theme.ts'
const Typography: IText = {
  Title1: ({ children, bold = false }) => (
    <Typo className={useBold(bold)} variant="subtitle1" component="h2">
      {children}
    </Typo>
  ),
  Title2: ({ children, bold = false }) => (
    <Typo className={useBold(bold)} variant="subtitle2" component="h3">
      {children}
    </Typo>
  ),
  Body1: ({ children, bold = false }) => (
    <Typo className={useBold(bold)} variant="h1" component="span">
      {children}
    </Typo>
  ),
  Body2: ({ children, bold = false }) => (
    <Typo className={useBold(bold)} variant="h2" component="span">
      {children}
    </Typo>
  ),
  Body3: ({ children, bold = false }) => (
    <Typo className={useBold(bold)} variant="h3" component="span">
      {children}
    </Typo>
  ),
  Body4: ({ children, bold = false }) => (
    <Typo className={useBold(bold)} variant="h4" component="span">
      {children}
    </Typo>
  ),
  Body5: ({ children, bold = false }) => (
    <Typo className={useBold(bold)} variant="h5" component="span">
      {children}
    </Typo>
  ),
  Body6: ({ children, bold = false }) => (
    <Typo className={useBold(bold)} variant="h6" component="span">
      {children}
    </Typo>
  ),
};
export default Typography;
