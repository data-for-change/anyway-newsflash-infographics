import { ThemeOptions } from '@material-ui/core';
import { fontFamilyString } from './_globals';

const defaultThemeOptions: ThemeOptions = {
  palette: {},
  overrides: {
    MuiCardContent: {
      root: {
        '&:last-child': {
          paddingBottom: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: fontFamilyString,
    // title variants (like: card headers)
    subtitle1: {
      fontSize: 24,
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: 22,
      fontWeight: 700,
    },
    // body variants (like: newsflash data, widget contents etc)
    h1: {
      fontSize: 20,
      fontWeight: 700,
    },
    h2: {
      fontSize: 18,
      fontWeight: 700,
    },
    h3: {
      fontSize: 16,
      fontWeight: 700,
    },
    h4: {
      fontSize: 15,
      fontWeight: 700,
    },
    h5: {
      fontSize: 14,
      fontWeight: 700,
    },
    h6: {
      fontSize: 13,
    },
  },
};

export { defaultThemeOptions };
