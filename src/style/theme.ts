import { ThemeOptions } from '@material-ui/core';
import { fontFamilyString, darkGrey } from './';

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
      fontSize: 29,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: 22,
      fontWeight: 400,
    },
    // body variants (like: newsflash data, widget contents etc)
    h1: {
      fontSize: 20,
      fontColor: darkGrey,
      fontWeight: 400,
    },
    h2: {
      fontSize: 18,
      fontWeight: 400,
    },
    h3: {
      fontSize: 16,
      fontWeight: 400,
    },
    h4: {
      fontSize: 15,
      fontWeight: 400,
    },
    h5: {
      fontSize: 14,
      fontWeight: 400,
    },
    h6: {
      fontSize: 13,
    },
  },
};

export { defaultThemeOptions };
