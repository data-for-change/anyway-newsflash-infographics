import { makeAutoObservable } from 'mobx';
import { Theme, createMuiTheme } from '@material-ui/core';
import { defaultThemeOptions } from 'style';
import RootStore from './root.store';

export default class SettingsStore {
  private _theme: Theme = createMuiTheme(defaultThemeOptions);

  private _themeRtl: Theme = createMuiTheme({ ...defaultThemeOptions, direction: 'rtl' });

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }
  get rtlTheme(): Theme {
    return this._themeRtl;
  }

  get theme(): Theme {
    return this._theme;
  }
}
