import { makeAutoObservable } from 'mobx';
import { Theme, createMuiTheme } from '@material-ui/core';
import { defaultThemeOptions } from 'style';
import RootStore from './root.store';

export default class SettingsStore {
  private _theme: Theme = createMuiTheme(defaultThemeOptions);

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get theme(): Theme {
    return this._theme;
  }
}
