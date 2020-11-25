// https://mobx.js.org/best/store.html#combining-multiple-stores
import { action, observable, computed } from 'mobx';
import { initService } from '../services/init.service';
import { fetchWidgets } from '../services/widgets.data.service';
import { INewsFlash } from '../models/NewFlash';
import { ILocationMeta, IWidgetBase } from '../models/WidgetData';
import { SourceFilterEnum } from '../models/SourceFilter';
import { fetchNews } from '../services/news.data.service';
import SettingsStore from './settings.store';
import { IPoint } from '../models/Point';
import { fetchUserLoginStatus } from '../services/user.service';
import i18next from '../services/i18n.service';
import { DEMO_ID } from '../utils/utils';

// todo: move all map defaults to one place
const DEFAULT_TIME_FILTER = 5;
const DEFAULT_LOCATION = { latitude: 32.0853, longitude: 34.7818 };
const DEFAULT_LOCATION_META = {
  location_info: {
    resolution: '',
    road1: 0,
    road_segment_name: '',
  },
  location_text: '',
};

export default class RootStore {
  appInitialized = false;

  @observable newsFlashCollection: Array<INewsFlash> = [];
  @observable isUserAuthenticated: boolean = false;
  @observable userName: string = '';
  @observable activeNewsFlashId: number | string = 0; // active newsflash id
  @observable newsFlashFetchLimit: number = 0;
  @observable newsFlashWidgetsMeta: ILocationMeta = DEFAULT_LOCATION_META;
  @observable newsFlashWidgetsData: Array<IWidgetBase> = [];
  @observable newsFlashWidgetsTimerFilter = DEFAULT_TIME_FILTER; // newsflash time filter (in years ago, 5 is the default)
  @observable newsFlashLoading: boolean = false;
  @observable widgetBoxLoading: boolean = false;
  @observable currentLanguageRouteString: string = '';
  // domain stores
  settingsStore: SettingsStore;

  constructor() {
    // init app data
    initService().then((initData) => {
      console.log(initData);
      if (initData.newsFlashCollection) {
        this.newsFlashCollection = initData.newsFlashCollection;
      }
      if (initData.newsFlashWidgetsData) {
        this.newsFlashWidgetsData = initData.newsFlashWidgetsData.widgets;
        this.newsFlashWidgetsMeta = initData.newsFlashWidgetsData.meta;
      }
      this.appInitialized = true;
    });
    // settings store - settings of the app such as num of results returned etc.
    this.settingsStore = new SettingsStore(this);
  }

  @computed
  get newsFlashWidgetsMetaString(): string {
    let { location_text } = this.newsFlashWidgetsMeta;
    return location_text ? location_text : '';
  }

  @computed
  get newsFlashWidgetsMetaNumber(): number {
    let {
      location_info: { road1 },
    } = this.newsFlashWidgetsMeta;
    return road1;
  }

  @computed
  get activeNewsFlashLocation() {
    let location: IPoint = DEFAULT_LOCATION; // default location
    if (this.activeNewsFlash && this.activeNewsFlash.id !== DEMO_ID) {
      location = {
        latitude: this.activeNewsFlash.lat,
        longitude: this.activeNewsFlash.lon,
      };
    } else {
      location = DEFAULT_LOCATION;
    }
    return location;
  }

  @computed
  get activeNewsFlash(): INewsFlash | undefined {
    return this.newsFlashCollection.find((item) => item.id === this.activeNewsFlashId);
  }

  getWidgetsDataByName(name: string): IWidgetBase | undefined {
    return this.newsFlashWidgetsData.find((item) => item.name === name);
  }

  @action checkuserstatus(): void {}

  @action
  filterNewsFlashCollection(source?: SourceFilterEnum): void {
    this.newsFlashLoading = true;
    fetchNews(source, this.newsFlashFetchLimit).then((data: any) => {
      this.newsFlashLoading = false;
      if (data) {
        this.newsFlashCollection = data;
      } else {
        console.error(`filterNewsFlashCollection(source:${source}) invalid data:`, data);
      }
    });
  }

  @action
  infiniteFetchLimit(count: number): void {
    this.newsFlashFetchLimit += count;
    const { newsFlashCollection, newsFlashFetchLimit } = this;
    if (newsFlashCollection.length < newsFlashFetchLimit - count) return;
    this.filterNewsFlashCollection();
  }

  @action
  getUserLoginDetails() {
    fetchUserLoginStatus()
      .then((userData) => {
        this.isUserAuthenticated = userData.authenticated;
        this.userName = userData.userName;
      })
      .catch((err) => console.log(err));
  }

  @action
  selectNewsFlash(id: number | string): void {
    this.activeNewsFlashId = id;
    if (id !== DEMO_ID) {
      this.fetchSelectedNewsFlashWidgets(id as number, this.newsFlashWidgetsTimerFilter);
    }
  }

  @action
  changeTimeFilter(filterValue: number): void {
    if (this.newsFlashWidgetsTimerFilter !== filterValue) {
      this.newsFlashWidgetsTimerFilter = filterValue;
      this.fetchSelectedNewsFlashWidgets(this.activeNewsFlashId as number, filterValue);
    }
  }
  @action
  changeLanguage(lngCode: string): void {
    i18next.changeLanguage(lngCode).then(() => {
      lngCode === 'he'
        ? (this.currentLanguageRouteString = '')
        : (this.currentLanguageRouteString = `/${i18next.language}`);
    });
  }

  private fetchSelectedNewsFlashWidgets(id: number, filterValue: number): void {
    this.widgetBoxLoading = true;

    fetchWidgets(id, filterValue).then((response: any) => {
      this.widgetBoxLoading = false;
      if (response && response.widgets && response.meta) {
        this.newsFlashWidgetsMeta = response.meta;
        this.newsFlashWidgetsData = response.widgets;
      } else {
        console.error(`fetchWidgets(id:${id}) invalid response:`, response);
      }
    });
  }
}
