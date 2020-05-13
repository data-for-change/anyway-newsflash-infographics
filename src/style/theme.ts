import { ThemeOptions } from '@material-ui/core';
import { fontFamilyString } from './_globals';

const defaultThemeOptions: ThemeOptions = {
  palette: {},
  typography: {
    fontFamily: fontFamilyString,
    body1: {
      fontSize: 14,
      fontWeight: 700,
    },
    overline: {
      fontSize: 14,
      fontWeight: 700,
      height: '100%',
      width: '100%'
    }
  },
};

export { defaultThemeOptions };
