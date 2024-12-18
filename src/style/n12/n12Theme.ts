import { ThemeOptions } from '@material-ui/core';
import { defaultThemeOptions } from 'style/default/defaultTheme'
import { n12FontFamilyString } from "style";
import {n12ThemeColors, whiteColor} from "style";

const n12ThemeOptions: ThemeOptions = { ...defaultThemeOptions };
n12ThemeOptions.palette = {
  primary: n12ThemeColors
}
n12ThemeOptions.typography = {
  ...n12ThemeOptions.typography,
  fontFamily: n12FontFamilyString,
  subtitle2: {
    fontSize: 22,
    color: whiteColor,
    fontWeight: 400,
  },
  h1: {
    fontSize: 20,
    color: whiteColor,
    fontWeight: 400,
  },
  h2: {
    fontSize: 18,
    fontWeight: 400,
  },
  h3: {
    fontSize: 16,
    color: whiteColor,
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
    color: whiteColor,
  },
}

export { n12ThemeOptions };
