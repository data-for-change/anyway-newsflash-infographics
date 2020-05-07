// current suggestion for widget structure (25 April 2020)
// export interface IWidgetBase = {
//   name: string; // unique - used as identifier
//   data: {
//     text: Array<string>;  // text items - title, text content etc.
//     items: object | Array<any>;    // data items - points, events, image name, chart ticks etc.
//     addionals?: any       // optional - any additional data
//   };
//   meta: {
//     category: string;     // one per widget
//     tags: Array<string>;  // zero or more per widget
//   };
// }

export interface ILocationMeta {
  location_info: {
    resolution: string;
    road1: number;
    road_segment_name: string;
  };
  location_text: string;
};

export interface IWidgetBase {
  name: string; // unique - used as identifier
  data: any;
  meta: {};
}

export interface IWidgetMostSevereAccidents extends IWidgetBase {
  data: {
    longitude: number;
    latitude: number;
    accident_severity: string;
    accident_timestamp: string;
  }[];
};
export interface IWidgetAccidentsHeatMap extends IWidgetBase {
  data: {
    longitude: number;
    latitude: number;
  }[];
};
export interface IWidgetCountBySeverity extends IWidgetBase {
  data: {
    accident_severity: string;
    count: number;
  }[];
};
export interface IWidgetAccidentsByType extends IWidgetBase {
  data: {
    accident_type: string;
    count: number;
  }[];
};
export interface IWidgetAccidentsByYear extends IWidgetBase {
  data: {
    accident_year: number;
    count: number;
  }[];
};
export interface IWidgetInjuredByYear extends IWidgetBase {
  data: {
    accident_year: number;
    count: number;
  }[];
};
export interface IWidgetAccidentsByDayNight extends IWidgetBase {
  data: {
    day_night: string;
    count: number;
  }[];
};
export interface ILocationData {
  meta: ILocationMeta;
  widgets: IWidgetTypes[];
};
export interface IWidgetVisionZeroImage extends IWidgetBase {
	data: {
	  image_src: string;
	}[];
  };
export type IWidgetTypes =
  | IWidgetMostSevereAccidents
  | IWidgetAccidentsHeatMap
  | IWidgetAccidentsByDayNight
  | IWidgetCountBySeverity
  | IWidgetAccidentsByType
  | IWidgetInjuredByYear
  | IWidgetAccidentsByYear
  | IWidgetVisionZeroImage ;
