import { makeAutoObservable,  } from 'mobx';
import { Theme, createMuiTheme } from '@material-ui/core';
import { defaultThemeOptions } from 'style';
import RootStore from './root.store';
// import { LANG } from 'const/languages.const';
// import i18next from 'services/i18n.service';


export default class SettingsStore {
  // currentLanguageRouteString: string = '';
  // selectedLanguage: string = LANG.HE;

  private _theme: Theme = createMuiTheme(defaultThemeOptions);

  // constructor(private rootStore: RootStore) {
  //   makeAutoObservable(this);
  // }

  get theme(): Theme {
    return this._theme;
  }

  // changeLanguage(lngCode: string): void {
  //   i18next.changeLanguage(lngCode).then(() => {
  //     runInAction(() => {
  //       lngCode === LANG.HE
  //         ? (this.currentLanguageRouteString = '')
  //         : (this.currentLanguageRouteString = `/${i18next.language}`);
  //       this.selectedLanguage = i18next.language;
  //     });
  //     const widgetInput = {
  //       lang: i18next.language,
  //       newsId: this.activeNewsFlashId,
  //       yearAgo: this.newsFlashWidgetsTimerFilter,
  //       gpsId: this.locationId,
  //     };
  //     this.fetchSelectedWidgets(widgetInput);
  //   });
  // }
}
