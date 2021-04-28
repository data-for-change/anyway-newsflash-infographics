import React, { FC } from 'react';
import Typo from '@material-ui/core/Typography';

interface IBold {
  bold?: boolean;
}
interface IText {
  [property: string]: FC<IBold>;
}

const style = { fontWeight: 'bold' } as const;

// for styles of each variant - see 'theme.ts'
const Typography: IText = {
  Title1: ({ children }, bold) => (
    <Typo style={bold && style} variant="subtitle1" component="h2">
      {children}
    </Typo>
  ),
  Title2: ({ children }, bold) => (
    <Typo style={bold && style} variant="subtitle2" component="h3">
      {children}
    </Typo>
  ),
  Body1: ({ children }, bold) => (
    <Typo style={bold && style} variant="h1" component="span">
      {children}
    </Typo>
  ),
  Body2: ({ children }, bold) => (
    <Typo style={bold && style} variant="h2" component="span">
      {children}
    </Typo>
  ),
  Body3: ({ children }, bold) => (
    <Typo style={bold && style} variant="h3" component="span">
      {children}
    </Typo>
  ),
  Body4: ({ children }, bold) => (
    <Typo style={bold && style} variant="h4" component="span">
      {children}
    </Typo>
  ),
  Body5: ({ children }, bold) => (
    <Typo style={bold && style} variant="h5" component="span">
      {children}
    </Typo>
  ),
  Body6: ({ children }, bold) => (
    <Typo style={bold && style} variant="h6" component="span">
      {children}
    </Typo>
  ),
};

export default Typography;
