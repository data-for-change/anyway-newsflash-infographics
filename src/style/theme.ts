import {n12ThemeOptions} from "./n12/n12Theme";
import {defaultThemeOptions} from "./default/defaultTheme";
import {createMuiTheme, Theme} from "@material-ui/core";

export enum ThemeNames {
  DEFAULT= 'default',
  N12 = 'n12',
}

export type ThemeData =  {key : ThemeNames, theme : Theme} ;

export const themeOptions : ThemeData[] = [
    {key: ThemeNames.DEFAULT, theme: createMuiTheme(defaultThemeOptions)},
    {key: ThemeNames.N12, theme: createMuiTheme(n12ThemeOptions)},
  ]
