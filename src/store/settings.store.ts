import {makeAutoObservable, runInAction} from 'mobx';
import {createMuiTheme, Theme} from '@material-ui/core';
import {defaultThemeOptions} from 'style';
import {LANG} from 'const/languages.const';
import i18next from 'services/i18n.service';
import RootStore from './root.store';
import {ThemeData, ThemeNames, themeOptions} from "style/theme";

export default class SettingsStore {
  rootStore: RootStore;
  private themeName : ThemeNames = ThemeNames.DEFAULT;
  _theme : Theme = createMuiTheme(defaultThemeOptions);
  currentLanguageRouteString: string = '';
  selectedLanguage: string = LANG.HE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  get theme(): Theme {
    let new_theme : Theme | undefined = undefined;
    const organizationName = this.rootStore.userStore.orgNamesList ? this.rootStore.userStore.orgNamesList[0] : '';
    if (organizationName) {
      const new_theme_data :  ThemeData | undefined = themeOptions.find((p) => p.key === this.themeName);
      new_theme = new_theme_data?.theme;
    }
    this._theme = new_theme ? new_theme : this._theme;
    return this._theme;
  }

  changeLanguage(lngCode: string): void {
    i18next.changeLanguage(lngCode).then(() => {
      runInAction(() => {
        lngCode === LANG.HE
          ? (this.currentLanguageRouteString = '')
          : (this.currentLanguageRouteString = `/${i18next.language}`);
        this.selectedLanguage = i18next.language;
      });
      const widgetInput = {
        lang: i18next.language,
        newsId: this.rootStore.newsFlashStore.activeNewsFlashId,
        yearAgo: this.rootStore.newsFlashStore.newsFlashWidgetsTimerFilter,
        gpsId: this.rootStore.locationId,
      };
      this.rootStore.widgetsStore.fetchSelectedWidgets(widgetInput);
    });
  }
}
