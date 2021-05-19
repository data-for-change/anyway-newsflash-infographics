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
import { IWidgetDataType } from './WidgetDataType';

export interface ILocationData {
  meta: ILocationMeta;
  widgets: IWidgetBase[];
}
export interface IWidgetDataBase {
  text: {
    title?: string;
  };
}
export interface IWidgetBase {
  rank: number; // order? (not in use)
  name: string; // unique - used as identifier
  data: IWidgetDataType;
  meta: {
    information: string;
  };
}
export interface ILocationMeta {
  location_info: {
    resolution: string;
    road1: number;
    road_segment_name: string;
  };
  location_text: string;
  dates_comment: string;
}
export interface IWidgetAccidentsByHourBarData extends IWidgetDataBase {
  items: {
    accident_hour: number;
    hour: number;
  }[];
}

export interface IWidgetInjuredCountPerAgeGroupPieData extends IWidgetDataBase {
  items: {
    age_group: string;
    count: number;
  }[];
}
export interface IWidgetMostSevereAccidentsData extends IWidgetDataBase {
  items: IPointAccident[];
}
export interface IWidgetMostSevereAccidentsTableData extends IWidgetDataBase {
  items: {
    accident_year: number;
    date: string;
    hour: string;
    killed_count: number;
    severe_injured_count: number;
    light_injured_count: number;
    type: string;
  }[];
}
export interface IWidgetAccidentsHeatMapData extends IWidgetDataBase {
  items: IPoint[];
}
export interface IWidgetCountBySeverityTextData extends IWidgetDataBase {
  items: {
    severity_light_count: number;
    severity_fatal_count: number;
    severity_severe_count: number;
    start_year: string;
    end_year: string;
    total_accidents_count: number;
  };
}
export interface IWidgetCountBySeverityData extends IWidgetDataBase {
  items: {
    accident_severity: string;
    count: number;
  }[];
}
export interface IWidgetAccidentsByTypeData extends IWidgetDataBase {
  items: {
    accident_type: string;
    count: number;
  }[];
}
export interface IWidgetAccidentsByYearData extends IWidgetDataBase {
  items: {
    accident_year: number;
    count: number;
  }[];
}
export interface IWidgetInjuredByYearData extends IWidgetDataBase {
  items: {
    accident_year: number;
    count: number;
  }[];
}
export interface IWidgetStreetViewData extends IWidgetDataBase {
  items: IPoint;
}

export interface IWidgetVisionZeroImageData extends IWidgetDataBase {
  items: {
    image_src: string;
  }[];
}

export interface IWidgetAccidentsByDayNightData extends IWidgetDataBase {
  items: {
    day_night: string;
    count: number;
  }[];
}

export interface IWidgetHeadOnCollisionsComparisonData extends IWidgetDataBase {
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

export interface IWidgetTopRoadSegmentsAccidentsPerKm extends IWidgetDataBase {
  items: {}[];
}
export interface IWidgetAccidentCountByRoadLight extends IWidgetDataBase {
  items: {}[];
}
export interface IWidgetAccidentCountByDriverType extends IWidgetDataBase {
  items: {
    driver_type: string;
    count: number;
  }[];
}
export interface IWidgetAccidentCountByCarType extends IWidgetDataBase {
  items: {
    car_type: string;
    percentage_segment: number;
    percentage_country: number;
  }[];
}
export interface IWidgetInjuredAccidentsWithPedestrians extends IWidgetDataBase {
  items: {
    year: number;
    killed_injury_severity_count: number;
    severe_injury_severity_count: number;
    light_injury_severity_count: number;
  }[];
}
