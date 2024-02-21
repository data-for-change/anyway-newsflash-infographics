import {n12ThemeOptions} from "./n12/n12Theme";
import {defaultThemeOptions} from "./default/defaultTheme";
import { ThemeOptions } from "@material-ui/core";

export type ThemeData =  {key : string, theme : ThemeOptions} ;

export const themeOptions : ThemeData[] = [
    // {key: 'or_yarok', path: orYarokTheme},
    {key: 'default', theme: defaultThemeOptions},
    {key: 'n12', theme: n12ThemeOptions},
  ]
