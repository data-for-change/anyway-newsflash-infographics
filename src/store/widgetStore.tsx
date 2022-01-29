import SettingsStore from './settings.store';
import { initService } from 'services/init.service';
import { runInAction, makeAutoObservable } from 'mobx';
import { IDateComments, IWidgetBase } from 'models/WidgetData';

const DEFAULT_LOCATION = { latitude: 32.0853, longitude: 34.7818 };


export default class widgetStore {

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
                    this.widgetsData = initData.newsFlashWidgetsData.widgets;
                    this.widgetsMeta = initData.newsFlashWidgetsData.meta;
                }
                this.appInitialized = true;
            });
        });
        // settings store - settings of the app such as num of results returned etc.
        this.settingsStore = new SettingsStore(this);
    }

    get newsFlashWidgetsMetaLocation(): string {
        const { location_text } = this.widgetsMeta;
        return location_text ? location_text : '';
    }

    get newsFlashWidgetsMetaSegmentName(): string {
        const { road_segment_name } = this.widgetsMeta.location_info;
        return road_segment_name ? road_segment_name : '';
    }

    get newsFlashWidgetsMetaRoadNumber(): number {
        const {
            location_info: { road1 },
        } = this.widgetsMeta;
        return road1;
    }

    get newsFlashWidgetsMetaDateComment(): IDateComments {
        const { dates_comment } = this.widgetsMeta;
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


    getWidgetsDataByName(name: string): IWidgetBase | undefined {
        return this.widgetsData.find((item) => item.name === name);
    }
}