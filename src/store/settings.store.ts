import { makeAutoObservable, runInAction } from 'mobx';
import { Theme, createMuiTheme } from '@material-ui/core';
import { defaultThemeOptions } from 'style';
import { LANG } from 'const/languages.const';
import i18next from 'services/i18n.service';
import RootStore from './root.store';

export default class SettingsStore {
  rootStore: RootStore;
  private _theme: Theme = createMuiTheme(defaultThemeOptions);
  currentLanguageRouteString: string = '';
  selectedLanguage: string = LANG.HE;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  get theme(): Theme {
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
