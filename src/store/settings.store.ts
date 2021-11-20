import { makeAutoObservable } from 'mobx';
import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/material';
import { defaultThemeOptions } from 'style';
import RootStore from './root.store';

export default class SettingsStore {
  private _theme: Theme = createTheme(defaultThemeOptions);

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get theme(): Theme {
    return this._theme;
  }
}
