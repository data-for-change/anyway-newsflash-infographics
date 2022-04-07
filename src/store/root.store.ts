/* eslint-disable*/
// https://mobx.js.org/best/store.html#combining-multiple-stores
import { runInAction, makeAutoObservable } from 'mobx';
import { initService } from 'services/init.service';

import { IGpsData } from 'models/WidgetData';
import SettingsStore from './settings.store';
import NewsFlashStore from './news-flash-store';
import UserStore from './user.store';
import WidgetsStore from './widgets.store';
import { IPoint } from 'models/Point';
import i18next from 'services/i18n.service';
import { fetchGpsLocation } from 'services/gpsToLocation.data.service';
import { LANG } from 'const/languages.const';

// todo: move all map defaults to one place

export default class RootStore {
  appInitialized = false;

  locationId: number = 0; // data by location id
  currentLanguageRouteString: string = '';
  selectedLanguage: string = LANG.HE;
  gpsLocationData: IGpsData | null = null;

  //different stores
  settingsStore: SettingsStore;
  userStore: UserStore;
  newsFlashStore: NewsFlashStore;
  widgetsStore: WidgetsStore;

  constructor() {
    // init app data
    makeAutoObservable(this);
    this.settingsStore = new SettingsStore(this);
    this.userStore = new UserStore(this);
    this.newsFlashStore = new NewsFlashStore(this);
    this.widgetsStore = new WidgetsStore(this);

    initService().then((initData) => {
      runInAction(() => {
        if (initData.newsFlashCollection) {
          this.newsFlashStore.newsFlashCollection = initData.newsFlashCollection;
        }
        if (initData.newsFlashWidgetsData) {
          this.widgetsStore.newsFlashWidgetsData = initData.newsFlashWidgetsData.widgets;
          this.widgetsStore.newsFlashWidgetsMeta = initData.newsFlashWidgetsData.meta;
        }
        this.appInitialized = true;
      });
    });
    // settings store - settings of the app such as num of results returned etc.
  }

  setGpsLocationData(data: IGpsData | null) {
    runInAction(() => {
      this.gpsLocationData = data;
    });
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
        newsId: this.newsFlashStore.activeNewsFlashId,
        yearAgo: this.newsFlashStore.newsFlashWidgetsTimerFilter,
        gpsId: this.locationId,
      };
      this.widgetsStore.fetchSelectedWidgets(widgetInput);
    });
  }

  async fetchGpsLocation(data: IPoint) {
    runInAction(() => {
      fetchGpsLocation(data).then((response: IGpsData | undefined) => {
        runInAction(() => {
          if (response) {
            this.setGpsLocationData(response);
          } else {
            console.error(`gpsLocation invalid response:`, response);
          }
        });
      });
    });
  }
}
