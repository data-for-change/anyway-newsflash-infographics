import { INewsFlash } from 'models/NewFlash';
import { SourceFilterEnum } from 'models/SourceFilter';
import { runInAction } from 'mobx';
import i18next from 'services/i18n.service';
import { fetchNews } from 'services/news.data.service';
import { fetchWidgets, IWidgetInput } from 'services/widgets.data.service';
import { ILocationMeta, IWidgetBase } from 'models/WidgetData';
import SettingsStore from './settings.store';


const DEFAULT_TIME_FILTER = 5;
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


export default class activeNewsFlashId {

    newsFlashCollection: Array<INewsFlash> = [];
    activeNewsFlashId: number = 0; // active newsflash id
    newsFlashFetchOffSet = 0;
    newsFlashActiveFilter: SourceFilterEnum = SourceFilterEnum.all;
    newsFlashLoading: boolean = false;
    locationId: number = 0; // data by location id
    newsFlashWidgetsTimerFilter = DEFAULT_TIME_FILTER; // newsflash time filter (in years ago, 5 is the default)
    widgetBoxLoading: boolean = false;
    newsFlashWidgetsMeta: ILocationMeta = DEFAULT_LOCATION_META;
    newsFlashWidgetsData: Array<IWidgetBase> = [];


    get activeNewsFlash(): INewsFlash | undefined {
        return this.newsFlashCollection.find((item) => item.id === this.activeNewsFlashId);
    }

    selectNewsFlash(id: number): void {
        runInAction(() => { this.locationId = 0; this.activeNewsFlashId = id; });
        const widgetInput = {
            lang: SettingsStore.selectedLanguage,
            newsId: id,
            yearAgo: this.newsFlashWidgetsTimerFilter,
        };
        this.fetchSelectedWidgets(widgetInput);
    }

    changeTimeFilter(filterValue: number): void {
        if (this.newsFlashWidgetsTimerFilter !== filterValue) {
            runInAction(() => (this.newsFlashWidgetsTimerFilter = filterValue));
            const widgetInput = {
                lang: SettingsStore.selectedLanguage,
                newsId: this.activeNewsFlashId,
                yearAgo: filterValue,
                gpsId: this.locationId,
            };
            this.fetchSelectedWidgets(widgetInput);
        }
    }

    changeLanguage(lngCode: string): void {
        i18next.changeLanguage(lngCode).then(() => {
            runInAction(() => {
                lngCode === SettingsStore.LANG.HE
                    ? (SettingsStore.currentLanguageRouteString = '')
                    : (SettingsStore.currentLanguageRouteString = `/${i18next.language}`);
                SettingsStore.selectedLanguage = i18next.language;
            });
            const widgetInput = {
                lang: i18next.language,
                newsId: this.activeNewsFlashId,
                yearAgo: this.newsFlashWidgetsTimerFilter,
                gpsId: this.locationId,
            };
            this.fetchSelectedWidgets(widgetInput);
        });
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

    private fetchSelectedWidgets({ lang, newsId, yearAgo, gpsId }: IWidgetInput): void {
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
}