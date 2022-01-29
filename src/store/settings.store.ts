import { makeAutoObservable } from 'mobx';
import { Theme, createMuiTheme } from '@material-ui/core';
import { defaultThemeOptions } from 'style';
import RootStore from './root.store';
import { LANG } from 'const/languages.const';

export default class SettingsStore {

  selectedLanguage: string = LANG.HE;
  currentLanguageRouteString: string = '';


  private _theme: Theme = createMuiTheme(defaultThemeOptions);

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get theme(): Theme {
    return this._theme;
  }
}
