import React, { FC } from 'react';
import Typo from '@material-ui/core/Typography';

interface IText {
  [property: string]: FC;
}

// for styles of each variant - see 'theme.ts'
const Text: IText = {
  Title1: ({ children }) => (
    <Typo variant="body1" component="h2">
      {children}
    </Typo>
  ),
  Title2: ({ children }) => (
    <Typo variant="body2" component="h3">
      {children}
    </Typo>
  ),
  Body1: ({ children }) => (
    <Typo variant="h1" component="span">
      {children}
    </Typo>
  ),
  Body2: ({ children }) => (
    <Typo variant="h2" component="span">
      {children}
    </Typo>
  ),
  Body3: ({ children }) => (
    <Typo variant="h3" component="span">
      {children}
    </Typo>
  ),
  Body4: ({ children }) => (
    <Typo variant="h4" component="span">
      {children}
    </Typo>
  ),
  Body5: ({ children }) => (
    <Typo variant="h5" component="span">
      {children}
    </Typo>
  ),
  Body6: ({ children }) => (
    <Typo variant="h6" component="span">
      {children}
    </Typo>
  ),
};

export default Text;
