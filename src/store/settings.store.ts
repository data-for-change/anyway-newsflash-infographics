import { observable } from 'mobx';
import { Theme, createMuiTheme } from '@material-ui/core';
import { defaultThemeOptions } from '../style/theme';
import RootStore from './root.store';

export default class SettingsStore {
  @observable private _theme: Theme = createMuiTheme(defaultThemeOptions);

  constructor(private rootStore: RootStore) {}

  get theme(): Theme {
    return this._theme;
  }
}
