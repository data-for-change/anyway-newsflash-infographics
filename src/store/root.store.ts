// https://mobx.js.org/best/store.html#combining-multiple-stores
import { runInAction, makeAutoObservable } from 'mobx';
import { initService } from '../services/init.service';
import { fetchWidgets } from '../services/widgets.data.service';
import { INewsFlash } from '../models/NewFlash';
import { ILocationMeta, IWidgetBase } from '../models/WidgetData';
import { SourceFilterEnum } from '../models/SourceFilter';
import { fetchNews } from '../services/news.data.service';
import SettingsStore from './settings.store';
import { IPoint } from '../models/Point';
import { ActualiUserInfo, fetchUserInfo, logoutUserFromSession, postUserInfo } from '../services/user.service';
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

  newsFlashCollection: Array<INewsFlash> = [];
  isUserAuthenticated: boolean = false;
  userApiError: boolean = false;
  userInfo: ActualiUserInfo | null = null;
  activeNewsFlashId: number = 0; // active newsflash id
  newsFlashFetchOffSet = 0;
  newsFlashActiveFilter: SourceFilterEnum = SourceFilterEnum.all;
  newsFlashWidgetsMeta: ILocationMeta = DEFAULT_LOCATION_META;
  newsFlashWidgetsData: Array<IWidgetBase> = [];
  newsFlashWidgetsTimerFilter = DEFAULT_TIME_FILTER; // newsflash time filter (in years ago, 5 is the default)
  newsFlashLoading: boolean = false;
  widgetBoxLoading: boolean = false;
  currentLanguageRouteString: string = '';
  selectedLanguage: string = 'he';
  // domain stores
  settingsStore: SettingsStore;

  constructor() {
    // init app data
    makeAutoObservable(this);
    initService().then((initData) => {
      runInAction(() => {
        if (initData.newsFlashCollection) {
          this.newsFlashCollection = initData.newsFlashCollection;
        }
        if (initData.newsFlashWidgetsData) {
          this.newsFlashWidgetsData = initData.newsFlashWidgetsData.widgets;
          this.newsFlashWidgetsMeta = initData.newsFlashWidgetsData.meta;
        }
        this.appInitialized = true;
      });
    });
    // settings store - settings of the app such as num of results returned etc.
    this.settingsStore = new SettingsStore(this);
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
    let {
      location_info: { road1 },
    } = this.newsFlashWidgetsMeta;
    return road1;
  }

  get newsFlashWidgetsMetaDateComment(): string {
    let { dates_comment } = this.newsFlashWidgetsMeta;
    return dates_comment;
  }

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

  get activeNewsFlash(): INewsFlash | undefined {
    return this.newsFlashCollection.find((item) => item.id === this.activeNewsFlashId);
  }

  getWidgetsDataByName(name: string): IWidgetBase | undefined {
    return this.newsFlashWidgetsData.find((item) => item.name === name);
  }

  checkuserstatus(): void {}

  setActiveNewsFlashFilter(filter: SourceFilterEnum) {
    if (filter !== this.newsFlashActiveFilter) {
      runInAction(() => {
        this.newsFlashActiveFilter = filter;
        this.newsFlashCollection = [];
        this.newsFlashFetchOffSet = 0;
      });
      this.filterNewsFlashCollection();
    }
  }

  filterNewsFlashCollection (): void {
    runInAction(() => this.newsFlashLoading = true);
    fetchNews(this.newsFlashActiveFilter, this.newsFlashFetchOffSet).then((data: any) => {
    runInAction(() => (this.newsFlashLoading = false));
      if (data) {
        runInAction(() => (this.newsFlashCollection = [...this.newsFlashCollection, ...data]));
      } else {
        console.error(`filterNewsFlashCollection(filter:${this.newsFlashActiveFilter}) invalid data:`, data);
      }
    });
  }

  infiniteFetchLimit (fetchSize: number): void {
    runInAction(() => this.newsFlashFetchOffSet += fetchSize);
    if (this.newsFlashCollection.length >= this.newsFlashFetchOffSet - fetchSize) {
      this.filterNewsFlashCollection();
    }
  }

  logOutUser() {
    logoutUserFromSession().then((isOk) => {
      if (isOk) {
        runInAction(() => {
          this.isUserAuthenticated = false;
          this.userInfo = null;
        });
      }
    });
  }

  getUserLoginDetails() {
    fetchUserInfo()
      .then((userData) => {
        runInAction(() => {
          this.userInfo = userData;
          this.isUserAuthenticated = true;
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.isUserAuthenticated = false;
        });
        console.error(err);
      });
  }

  async updateUserInfo(formInput: IFormInput) {
    runInAction(async () => {
      const isValid = await postUserInfo(formInput);
      if (isValid) {
        this.getUserLoginDetails();
        this.userApiError = false;
      } else {
        this.userApiError = true;
      }
    });
  }

  selectNewsFlash(id: number): void {
    runInAction(() => (this.activeNewsFlashId = id));
    this.fetchSelectedNewsFlashWidgets(id, this.selectedLanguage, this.newsFlashWidgetsTimerFilter);
  }

  changeTimeFilter(filterValue: number): void {
    if (this.newsFlashWidgetsTimerFilter !== filterValue) {
      runInAction(() => (this.newsFlashWidgetsTimerFilter = filterValue));
      this.fetchSelectedNewsFlashWidgets(this.activeNewsFlashId, this.selectedLanguage, filterValue);
    }
  }

  changeLanguage(lngCode: string): void {
    i18next.changeLanguage(lngCode).then(() => {
      runInAction(() => {
        lngCode === 'he'
          ? (this.currentLanguageRouteString = '')
          : (this.currentLanguageRouteString = `/${i18next.language}`);
        this.selectedLanguage = i18next.language;
      });
      this.fetchSelectedNewsFlashWidgets(this.activeNewsFlashId, i18next.language, this.newsFlashWidgetsTimerFilter);
    });
  }

  private fetchSelectedNewsFlashWidgets (id: number, lang: string, filterValue: number): void {
    runInAction(() => this.widgetBoxLoading = true);
    fetchWidgets(id, lang, filterValue).then((response: any) => {
      runInAction(() => {
        this.widgetBoxLoading = false;
        if (response && response.widgets && response.meta) {
          this.newsFlashWidgetsMeta = response.meta;
          this.newsFlashWidgetsData = response.widgets;
        } else {
          console.error(`fetchWidgets(id:${id}) invalid response:`, response);
        }
      });
    });
  }
}
