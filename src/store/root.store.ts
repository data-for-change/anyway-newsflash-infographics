/* eslint-disable*/
// https://mobx.js.org/best/store.html#combining-multiple-stores
import { runInAction, makeAutoObservable } from 'mobx';
import { initService } from 'services/init.service';

import { IGpsData } from 'models/WidgetData';
import { IPoint } from 'models/Point';
import { fetchGpsLocation } from 'services/gpsToLocation.data.service';
import { fetchCitiesList } from 'services/getCitiesAndStreets.service';
import SettingsStore from './settings.store';
import NewsFlashStore from './news-flash-store';
import UserStore from './user.store';
import WidgetsStore from './widgets.store';

// todo: move all map defaults to one place

export default class RootStore {
  appInitialized = false;

  locationId: number = 0; // data by location id
  gpsLocationData: IGpsData | null = null;
  citiesList: Array<{ yishuv_name: string; yishuv_symbol: number }> = [];
  cityAndStreet: { city?: string; street?: string };

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
    this.citiesList = [];
    this.cityAndStreet = {};

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

  setCitiesList(data: any) {
    runInAction(() => {
      this.citiesList = data;
    });
  }

  async fetchCitiesList() {
    runInAction(() => {
      fetchCitiesList().then((response: any) => {
        runInAction(() => {
          if (response) {
            this.setCitiesList(response);
          } else {
            console.error(`cities list invalid response:`, response);
          }
        });
      });
    });
  }
}
