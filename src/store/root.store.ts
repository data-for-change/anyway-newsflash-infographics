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
import { ActualiUserInfo, fetchUserInfo, postUserInfo } from '../services/user.service';
import i18next from '../services/i18n.service';
import { IFormInput } from '../components/molecules/UserUpdateForm';

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
  dates_comment: '',
};

export default class RootStore {
  appInitialized = false;

  @observable newsFlashCollection: Array<INewsFlash> = [];
  @observable isUserAuthenticated: boolean = false;
  @observable userInfo: ActualiUserInfo= {};
  @observable activeNewsFlashId: number = 0; // active newsflash id
  @observable newsFlashFetchLimit: number = 0;
  @observable newsFlashWidgetsMeta: ILocationMeta = DEFAULT_LOCATION_META;
  @observable newsFlashWidgetsData: Array<IWidgetBase> = [];
  @observable newsFlashWidgetsTimerFilter = DEFAULT_TIME_FILTER; // newsflash time filter (in years ago, 5 is the default)
  @observable newsFlashLoading: boolean = false;
  @observable widgetBoxLoading: boolean = false;
  @observable currentLanguageRouteString: string = '';
  @observable selectedLanguage: string = 'he';
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
  get newsFlashWidgetsMetaLocation(): string {
    const { location_text } = this.newsFlashWidgetsMeta;
    return location_text ? location_text : '';
  }

  @computed
  get newsFlashWidgetsMetaSegmentName(): string {
    const { road_segment_name } = this.newsFlashWidgetsMeta.location_info;
    return road_segment_name ? road_segment_name : '';
  }

  @computed
  get newsFlashWidgetsMetaRoadNumber(): number {
    let {
      location_info: { road1 },
    } = this.newsFlashWidgetsMeta;
    return road1;
  }

  @computed
  get newsFlashWidgetsMetaDateComment(): string {
    let { dates_comment } = this.newsFlashWidgetsMeta;
    return dates_comment;
  }

  @computed
  get activeNewsFlashLocation() {
    let location: IPoint = DEFAULT_LOCATION; // default location
    if (this.activeNewsFlash) {
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
    fetchUserInfo()
      .then((userData) => {
        this.userInfo.firstName = userData.firstName;
        this.userInfo.lastName = userData.lastName;
        this.userInfo.email = userData.email;
      })
      .catch((err) => console.log(err));
  }

  @action
  updateUserInfo(formInput :IFormInput){
    postUserInfo(formInput).then(isValid => {
      if(isValid){
        this.userInfo = {...this.userInfo, ...formInput};
      }
    })
  };



  @action
  selectNewsFlash(id: number): void {
    this.activeNewsFlashId = id;
    this.fetchSelectedNewsFlashWidgets(id, this.selectedLanguage, this.newsFlashWidgetsTimerFilter);
  }

  @action
  changeTimeFilter(filterValue: number): void {
    if (this.newsFlashWidgetsTimerFilter !== filterValue) {
      this.newsFlashWidgetsTimerFilter = filterValue;
      this.fetchSelectedNewsFlashWidgets(this.activeNewsFlashId, this.selectedLanguage, filterValue);
    }
  }
  @action
  changeLanguage(lngCode: string): void {
    i18next.changeLanguage(lngCode).then(() => {
      lngCode === 'he'
        ? (this.currentLanguageRouteString = '')
        : (this.currentLanguageRouteString = `/${i18next.language}`);
      this.selectedLanguage = i18next.language;
      this.fetchSelectedNewsFlashWidgets(this.activeNewsFlashId, i18next.language, this.newsFlashWidgetsTimerFilter);
    });
  }

  private fetchSelectedNewsFlashWidgets(id: number, lang: string, filterValue: number): void {
    this.widgetBoxLoading = true;

    fetchWidgets(id, lang, filterValue).then((response: any) => {
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
