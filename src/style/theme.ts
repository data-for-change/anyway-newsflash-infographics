import {n12ThemeOptions} from "./n12/n12Theme";
import {defaultThemeOptions} from "./default/defaultTheme";
import {createMuiTheme, Theme} from "@material-ui/core";

export enum ThemeNames {
  DEFAULT = 'default',
  N12 = 'n12',
}

export const themeOptions : Record<ThemeNames, Theme> = {
    [ThemeNames.DEFAULT]: createMuiTheme(defaultThemeOptions),
    [ThemeNames.N12]: createMuiTheme(n12ThemeOptions),
  }
