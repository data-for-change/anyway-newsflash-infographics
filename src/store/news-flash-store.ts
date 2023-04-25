import { runInAction, makeAutoObservable } from 'mobx';
import { SourceFilterEnum } from 'models/SourceFilter';
import { fetchNews, IFetchNewsQueryParams } from 'services/news.data.service';
import { INewsFlash } from 'models/NewFlash';
import { IPoint } from 'models/Point';
import RootStore from './root.store';

const DEFAULT_TIME_FILTER = 5;
const DEFAULT_LOCATION = { latitude: 32.0853, longitude: 34.7818 };
const LOCAL_FILTERS: { [key in SourceFilterEnum]?: (newsFlashCollection: Array<INewsFlash>) => Array<INewsFlash> } = {};

export default class NewsFlashStore {
  rootStore: RootStore;
  newsFlashCollection: Array<INewsFlash> = [];
  activeNewsFlashId: number = 0; // active newsflash id
  newsFlashFetchOffSet = 0;
  newsFlashActiveFilter: SourceFilterEnum = SourceFilterEnum.all;
  newsFlashLoading: boolean = false;
  newsFlashWidgetsTimerFilter = DEFAULT_TIME_FILTER; // newsflash time filter (in years ago, 5 is the default)

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  get activeNewsFlash(): INewsFlash | undefined {
    return this.newsFlashCollection.find((item) => item.id === this.activeNewsFlashId);
  }

  selectNewsFlash(id: number): void {
    runInAction(() => {
      this.rootStore.cityAndStreet = {};
      this.rootStore.locationId = 0;
      this.activeNewsFlashId = id;
    });
    const widgetInput = {
      lang: this.rootStore.settingsStore.selectedLanguage,
      newsId: id,
      yearAgo: this.newsFlashWidgetsTimerFilter,
    };
    this.rootStore.widgetsStore.fetchSelectedWidgets(widgetInput);
  }

  selectNewsFlashByCityAndStreet(city: string, street: string): void {
    runInAction(() => {
      this.rootStore.locationId = 0;
      this.activeNewsFlashId = 0;
      this.rootStore.cityAndStreet = { city, street };
    });
    const widgetInput = {
      lang: this.rootStore.settingsStore.selectedLanguage,
      yearAgo: this.newsFlashWidgetsTimerFilter,
      city,
      street,
    };
    this.rootStore.widgetsStore.fetchSelectedWidgets(widgetInput);
  }

  selectLocationId(id: number): void {
    runInAction(() => {
      this.rootStore.cityAndStreet = {};
      this.activeNewsFlashId = 0;
      this.rootStore.locationId = id;
    });
    const widgetInput = {
      lang: this.rootStore.settingsStore.selectedLanguage,
      gpsId: id,
      yearAgo: this.newsFlashWidgetsTimerFilter,
    };
    this.rootStore.widgetsStore.fetchSelectedWidgets(widgetInput);
  }

  changeTimeFilter(filterValue: number): void {
    if (this.newsFlashWidgetsTimerFilter !== filterValue) {
      runInAction(() => (this.newsFlashWidgetsTimerFilter = filterValue));
      const widgetInput = {
        lang: this.rootStore.settingsStore.selectedLanguage,
        newsId: this.activeNewsFlashId,
        yearAgo: filterValue,
        gpsId: this.rootStore.locationId,
        city: this.rootStore.cityAndStreet.city,
        street: this.rootStore.cityAndStreet.street,
      };
      this.rootStore.widgetsStore.fetchSelectedWidgets(widgetInput);
    }
  }

  setActiveNewsFlashFilter(filter: SourceFilterEnum) {
    if (filter !== this.newsFlashActiveFilter) {
      runInAction(() => {
        this.newsFlashActiveFilter = filter;
        this.newsFlashFetchOffSet = 0;
      });
      if (!(filter in LOCAL_FILTERS)) {
        runInAction(() => {
          this.newsFlashCollection = [];
        });
      }
      this.filterNewsFlashCollection();
    }
  }

  filterNewsFlashCollection(): void {
    runInAction(() => (this.newsFlashLoading = true));
    if (this.newsFlashActiveFilter in LOCAL_FILTERS) {
      const filterMethod = LOCAL_FILTERS[this.newsFlashActiveFilter];
      const filtered = filterMethod && filterMethod(this.newsFlashCollection);
      runInAction(() => (this.newsFlashCollection = [...(filtered || [])]));
      runInAction(() => (this.newsFlashLoading = false));
    } else {
      const queryParams: IFetchNewsQueryParams = {
        offSet: this.newsFlashFetchOffSet
      };
      if (this.newsFlashActiveFilter === "critical") {
        queryParams["critical"] = true;
      } else {
        queryParams["source"] = this.newsFlashActiveFilter;
      }
      fetchNews(queryParams).then((data: any) => {
        runInAction(() => (this.newsFlashLoading = false));
        if (data) {
          runInAction(() => (this.newsFlashCollection = [...this.newsFlashCollection, ...data]));
        } else {
          console.error(`filterNewsFlashCollection(filter:${this.newsFlashActiveFilter}) invalid data:`, data);
        }
      });
    }
  }
  infiniteFetchLimit(fetchSize: number): void {
    runInAction(() => (this.newsFlashFetchOffSet += fetchSize));
    if (this.newsFlashCollection.length >= this.newsFlashFetchOffSet - fetchSize) {
      this.filterNewsFlashCollection();
    }
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
}
