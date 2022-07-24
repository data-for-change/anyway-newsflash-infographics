import { runInAction, makeAutoObservable } from 'mobx';
import RootStore from './root.store';
import { IDateComments, ILocationMeta, IWidgetBase, Resolution } from 'models/WidgetData';

import { fetchWidgets, IWidgetInput } from 'services/widgets.data.service';

const DEFAULT_LOCATION_META = {
  location_info: {
    road1: 0,
    road_segment_name: '',
  },
  location_text: '',
  dates_comment: {
    date_range: [],
    last_update: 0,
  },
  resolution: Resolution.NONE,
};

export default class WidgetsStore {
  rootStore: RootStore;
  newsFlashWidgetsMeta: ILocationMeta = DEFAULT_LOCATION_META;
  newsFlashWidgetsData: Array<IWidgetBase> = [];

  widgetBoxLoading: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
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

  get isStreet(): boolean {
    const { resolution } = this.newsFlashWidgetsMeta;
    return resolution === Resolution.STREET;
  }

  fetchSelectedWidgets({ lang, newsId, yearAgo, gpsId, city, street }: IWidgetInput): void {
    runInAction(() => (this.widgetBoxLoading = true));
    fetchWidgets({ lang, newsId, yearAgo, gpsId, city, street }).then((response: any) => {
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
