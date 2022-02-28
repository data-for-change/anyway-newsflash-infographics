import { SourceFilterEnum } from 'models/SourceFilter';
import { runInAction, makeAutoObservable } from 'mobx';
import { INewsFlash } from 'models/NewFlash';
import { IPoint } from 'models/Point';
import { fetchNews } from 'services/news.data.service';

const DEFAULT_LOCATION = { latitude: 32.0853, longitude: 34.7818 };

export default class NewsFlashStore {
  activeNewsFlashId: number = 0; // active newsflash id
  newsFlashFetchOffSet = 0;
  newsFlashActiveFilter: SourceFilterEnum = SourceFilterEnum.all;
  newsFlashLoading: boolean = false;
  newsFlashCollection: Array<INewsFlash> = [];

  get activeNewsFlash(): INewsFlash | undefined {
    return this.newsFlashCollection.find((item) => item.id === this.activeNewsFlashId);
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

  filterNewsFlashCollection(): void {
    runInAction(() => (this.newsFlashLoading = true));
    fetchNews(this.newsFlashActiveFilter, this.newsFlashFetchOffSet).then((data: any) => {
      runInAction(() => (this.newsFlashLoading = false));
      if (data) {
        runInAction(() => (this.newsFlashCollection = [...this.newsFlashCollection, ...data]));
      } else {
        console.error(`filterNewsFlashCollection(filter:${this.newsFlashActiveFilter}) invalid data:`, data);
      }
    });
  }

  infiniteFetchLimit(fetchSize: number): void {
    runInAction(() => (this.newsFlashFetchOffSet += fetchSize));
    if (this.newsFlashCollection.length >= this.newsFlashFetchOffSet - fetchSize) {
      this.filterNewsFlashCollection();
    }
  }
}
