import { LabelsMap, MultiSeriesDataItems, SeriesDataItem } from './MultiSeriesData';
import { IPoint, IPointAccident } from './Point';
import { IWidgetDataType } from './WidgetDataType';
import {ICityOption, IStreetOption} from "./Map";

export enum Resolution {
  STREET = "STREET",
  SUBURBAN_ROAD = "SUBURBAN_ROAD",
  NONE = "",
}

export interface ILocationData {
  meta: ILocationMeta;
  widgets: IWidgetBase[];
}

export interface IGpsData {
  road1: string;
  road_segment_name: string;
  road_segment_id: number;
  resolution: string;
}
export interface IStreetData {
  street: IStreetOption;
  city: ICityOption;
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

export interface IDateComments {
  date_range: Array<number>;
  last_update: number;
}

export interface ILocationMeta {
  location_info: {
    road1: number;
    road_segment_name: string;
  };
  location_text: string;
  dates_comment: IDateComments;
  resolution: Resolution;
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

export interface IWidgetCountBySeverityTextDataBase<T = {}> {
  items: {
    start_year: string;
    end_year: string;
    total_accidents_count: number;
  } & T;
}
export type IWidgetAccidentsBySeverityTextData = { text: any } & IWidgetCountBySeverityTextDataBase<{
  severity_light_count: number;
  severity_fatal_count: number;
  severity_severe_count: number;
  total_accidents_count: number;
}>;

// TODO: Change field names once fixed in API
export type IWidgetInjuredBySeverityTextData = { text: any } & IWidgetCountBySeverityTextDataBase<{
  light_injured_count: number;
  severe_injured_count: number;
  killed_count: number;
  total_injured_count: number;
}>;
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
  };
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

export interface IWidgetMultiBarData extends IWidgetDataBase {
  items: MultiSeriesDataItems[];
  text: {
    title?: string;
    labels_map: LabelsMap;
  };
}

export interface IWidgetKilledAndInjuredCountPerAgeGroup extends IWidgetDataBase {
  items: SeriesDataItem[];
  text: {
    subtitle?: string;
    title?: string;
  };
}
