import {makeAutoObservable, runInAction} from 'mobx';
import {createMuiTheme, Theme} from '@material-ui/core';
import {LANG} from 'const/languages.const';
import i18next from 'services/i18n.service';
import RootStore from './root.store';
import {ThemeNames, themeOptions} from "style/theme";

export default class SettingsStore {
  rootStore: RootStore;
  currentThemeName : ThemeNames = ThemeNames.DEFAULT
  _theme : Theme = createMuiTheme(themeOptions[this.currentThemeName]);
  currentLanguageRouteString: string = '';
  selectedLanguage: string = LANG.HE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  get theme(): Theme {
    const organizationName = this.rootStore.userStore.userOrganizations ? this.rootStore.userStore.userOrganizations[0] : '';
    if (organizationName !== this.currentThemeName) {
      this.currentThemeName = organizationName as ThemeNames;
      const new_theme_data :  Theme | undefined = themeOptions[this.currentThemeName];
      if (new_theme_data) {
        this._theme = new_theme_data;
      }
    }
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
