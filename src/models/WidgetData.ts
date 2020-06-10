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

import { IPoint, IPointAccident } from './Point';

export interface ILocationData {
  meta: ILocationMeta;
  widgets: IWidgetBase[];
}

export interface IWidgetBase {
  rank: number; // order? (not in use)
  name: string; // unique - used as identifier
  data: IWidgetDataType;
  meta?: {};
}

export type IWidgetDataType =
  | IWidgetInjuredCountPerAgeGroupPieData
  | IWidgetMostSevereAccidentsData
  | IWidgetAccidentsHeatMapData
  | IWidgetAccidentsByDayNightData
  | WidgetCountBySeverityTextData
  | IWidgetCountBySeverityData
  | IWidgetAccidentsByTypeData
  | IWidgetInjuredByYearData
  | IWidgetAccidentsByYearData
  | IWidgetVisionZeroImageData
  | IWidgetAccidentsByHourBarData
  | IWidgetMostSevereAccidentsTableData;

export interface ILocationMeta {
  location_info: {
    resolution: string;
    road1: number;
    road_segment_name: string;
  };
  location_text: string;
}
export interface IWidgetAccidentsByHourBarData {
  items: {
    accident_hour: number;
    hour: number;
  }[];
  text: {
    title: string;
  };
}
export interface IWidgetInjuredCountPerAgeGroupPieData {
  items: {
    age_group: string;
    count: number;
  }[];
}
export interface IWidgetMostSevereAccidentsData {
  items: IPointAccident[];
}
export interface IWidgetMostSevereAccidentsTableData {
  items: {
    accident_year: number;
    date: string;
    hour: string;
    injured_count: number;
    killed_count: number;
    type: string;
  }[];
  text: {
    title: string;
  };
}
export interface IWidgetAccidentsHeatMapData {
  items: IPoint[];
}
export interface WidgetCountBySeverityTextData {
  items: {
    severity_light_count: number;
    severity_fatal_count: number;
    severity_severe_count: number;
    start_year: string;
    end_year: string;
    total_accidents_count: number;
  };
}
export interface IWidgetCountBySeverityData {
  items: {
    accident_severity: string;
    count: number;
  }[];
}
export interface IWidgetAccidentsByTypeData {
  items: {
    accident_type: string;
    count: number;
  }[];
}
export interface IWidgetAccidentsByYearData {
  items: {
    accident_year: number;
    count: number;
  }[];
  text: {
    title: string;
  };
}
export interface IWidgetInjuredByYearData {
  items: {
    accident_year: number;
    count: number;
  }[];
  text: {
    title: string;
  };
}
export interface IWidgetStreetViewData {
  items: IPoint;
}

export interface IWidgetVisionZeroImageData {
  items: {
    image_src: string;
  }[];
}

export interface IWidgetAccidentsByDayNightData {
  items: {
    day_night: string;
    count: number;
  }[];
}

export interface IWidgetHeadOnCollisionsComparisonData {
  items: {
    all_roads_fatal_accidents: {
      desc: string;
      count: number;
    }[];
    specific_road_segment_fatal_accidents: {
      desc: string;
      count: number;
    }[];
  };
}

export interface IWidgetVisionZeroImageData {
  items: {
    image_src: string;
  }[];
}
