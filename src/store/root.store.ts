/* eslint-disable*/
// https://mobx.js.org/best/store.html#combining-multiple-stores
import { runInAction, makeAutoObservable } from 'mobx';
import { initService } from 'services/init.service';
import { fetchWidgets, IWidgetInput } from 'services/widgets.data.service';

import { IDateComments, IGpsData, ILocationMeta, IWidgetBase } from 'models/WidgetData';
import SettingsStore from './settings.store';
import NewsFlashStore from './newsFlashStore';
import UserStore from './userStore';
import { IPoint } from 'models/Point';
import i18next from 'services/i18n.service';
import { fetchGpsLocation } from 'services/gpsToLocation.data.service';
import { LANG } from 'const/languages.const';

// todo: move all map defaults to one place

const DEFAULT_LOCATION_META = {
  location_info: {
    resolution: '',
    road1: 0,
    road_segment_name: '',
  },
  location_text: '',
  dates_comment: {
    date_range: [],
    last_update: 0,
  },
};

export default class RootStore {
  appInitialized = false;

  locationId: number = 0; // data by location id

  newsFlashWidgetsMeta: ILocationMeta = DEFAULT_LOCATION_META;
  newsFlashWidgetsData: Array<IWidgetBase> = [];

  widgetBoxLoading: boolean = false;
  currentLanguageRouteString: string = '';
  selectedLanguage: string = LANG.HE;
  gpsLocationData: IGpsData | null = null;
  // domain stores
  settingsStore: SettingsStore;
  //different stores
  userStore: UserStore;
  newsFlashStore: NewsFlashStore;

  constructor() {
    // init app data
    makeAutoObservable(this);
    this.settingsStore = new SettingsStore(this);
    this.userStore = new UserStore(this);
    this.newsFlashStore = new NewsFlashStore(this);
    initService().then((initData) => {
      runInAction(() => {
        if (initData.newsFlashCollection) {
          this.newsFlashStore.newsFlashCollection = initData.newsFlashCollection;
        }
        if (initData.newsFlashWidgetsData) {
          this.newsFlashWidgetsData = initData.newsFlashWidgetsData.widgets;
          this.newsFlashWidgetsMeta = initData.newsFlashWidgetsData.meta;
        }
        this.appInitialized = true;
      });
    });
    // settings store - settings of the app such as num of results returned etc.
  }

  get newsFlashWidgetsMetaLocation(): string {
    const { location_text } = this.newsFlashWidgetsMeta;
    return location_text ? location_text : '';
  }

  get newsFlashWidgetsMetaSegmentName(): string {
    const { road_segment_name } = this.newsFlashWidgetsMeta.location_info;
    return road_segment_name ? road_segment_name : '';
  }

  get newsFlashWidgetsMetaRoadNumber(): number {
    const {
      location_info: { road1 },
    } = this.newsFlashWidgetsMeta;
    return road1;
  }

  get newsFlashWidgetsMetaDateComment(): IDateComments {
    const { dates_comment } = this.newsFlashWidgetsMeta;
    return dates_comment;
  }

  getWidgetsDataByName(name: string): IWidgetBase | undefined {
    return this.newsFlashWidgetsData.find((item) => item.name === name);
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
      this.fetchSelectedWidgets(widgetInput);
    });
  }

  fetchSelectedWidgets({ lang, newsId, yearAgo, gpsId }: IWidgetInput): void {
    runInAction(() => (this.widgetBoxLoading = true));
    fetchWidgets({ lang, newsId, yearAgo, gpsId }).then((response: any) => {
      runInAction(() => {
        this.widgetBoxLoading = false;
        if (response && response.widgets && response.meta) {
          this.newsFlashWidgetsMeta = response.meta;
          this.newsFlashWidgetsData = response.widgets;
        } else {
          console.error(`fetchWidgets(id:${newsId || gpsId}) invalid response:`, response);
        }
      });
    });
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
}
