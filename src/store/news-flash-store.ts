import { runInAction, makeAutoObservable } from 'mobx';
import { SourceFilterEnum } from 'models/SourceFilter';
import { fetchNews, IFetchNewsQueryParams } from 'services/news.data.service';
import { INewsFlash, INewsFlashCollection } from 'models/NewFlash';
import { IPoint } from 'models/Point';
import RootStore from './root.store';
import { Direction } from 'models/ScrollObserver.model';

const DEFAULT_TIME_FILTER = 5;
const DEFAULT_LOCATION = { latitude: 32.0853, longitude: 34.7818 };
const LOCAL_FILTERS: { [key in SourceFilterEnum]?: (newsFlashCollection: Array<INewsFlash>) => Array<INewsFlash> } = {};

export default class NewsFlashStore {
  rootStore: RootStore;
  newsFlashCollection: INewsFlashCollection = {
    data: [] as INewsFlash[],
    pagination: { pageNumber: 1, pageSize: 100, totalRecords: 0, totalPages: 0 },
  };
  activeNewsFlashId: number = 0; // active newsflash id
  newsFlashPageNumber = 1;
  newsFlashLastNextPage = 1;
  newsFlashLastPrevPage = 1;
  newsFlashActiveFilter: SourceFilterEnum = SourceFilterEnum.all;
  newsFlashLoading: boolean = false;
  newsFlashWidgetsTimerFilter = DEFAULT_TIME_FILTER; // newsflash time filter (in years ago, 5 is the default)

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  get activeNewsFlash(): INewsFlash | undefined {
    return this.newsFlashCollection?.data.find((item) => item.id === this.activeNewsFlashId);
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
        this.newsFlashPageNumber = 1;
      });
      if (!(filter in LOCAL_FILTERS)) {
        runInAction(() => {
          this.newsFlashCollection.data = [];
        });
      }
      this.filterNewsFlashCollection(undefined,true);
    }
  }

  async filterNewsFlashCollection (direction: Direction = Direction.NEXT, isFiltering: boolean = false) {
    runInAction(() => (this.newsFlashLoading = true));

    if (this.newsFlashActiveFilter in LOCAL_FILTERS) {
      const filterMethod = LOCAL_FILTERS[this.newsFlashActiveFilter];
      const filtered = filterMethod && filterMethod(this.newsFlashCollection.data);
      runInAction(() => {
        this.newsFlashCollection.data = [...(filtered || [])];
        this.newsFlashLoading = false;
      });
    } else {
      const queryParams: IFetchNewsQueryParams = {};
      if (!isFiltering) {
        queryParams.pageNumber =
          direction === Direction.NEXT ? this.newsFlashLastNextPage + 1 : Math.max(this.newsFlashLastPrevPage - 1, 1);
      } else {
        queryParams.pageNumber = 1;
        runInAction(() => {
          this.newsFlashPageNumber = 1;
          this.newsFlashLastNextPage = 1;
          this.newsFlashLastPrevPage = 1;
        });
      }
      if (this.newsFlashActiveFilter === 'critical') {
        queryParams['critical'] = true;
      } else {
        queryParams['source'] = this.newsFlashActiveFilter;
      }

      fetchNews(queryParams).then((res: any) => {
        runInAction(() => (this.newsFlashLoading = false));
        if (res) {
          runInAction(() => {
            this.newsFlashCollection = {
              data:
                direction === Direction.NEXT
                  ? [...this.newsFlashCollection.data, ...res.data]
                  : [...res.data, ...this.newsFlashCollection.data],
              pagination: res.pagination,
            };
            if (direction === Direction.NEXT) {
              this.newsFlashLastNextPage = res.pagination.pageNumber;
            } else {
              this.newsFlashLastPrevPage = res.pagination.pageNumber;
            }
            this.newsFlashPageNumber = res.pagination.pageNumber;
            this.newsFlashLoading = false;
          });
        } else {
          console.error(`filterNewsFlashCollection(filter:${this.newsFlashActiveFilter}) invalid data:`, res);
          runInAction(() => (this.newsFlashLoading = false));
        }
      });
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
