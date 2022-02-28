import { IDateComments, IGpsData, ILocationMeta, IWidgetBase } from 'models/WidgetData';

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

export default class widgetStore {
  widgetsMeta: ILocationMeta = DEFAULT_LOCATION_META;
  widgetsData: Array<IWidgetBase> = [];
  widgetBoxLoading: boolean = false;


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

  getWidgetsDataByName(name: string): IWidgetBase | undefined {
    return this.widgetsData.find((item) => item.name === name);
  }
}
