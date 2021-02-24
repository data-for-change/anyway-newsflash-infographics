import {
  IWidgetInjuredCountPerAgeGroupPieData,
  IWidgetMostSevereAccidentsData,
  IWidgetAccidentsHeatMapData,
  IWidgetAccidentsByDayNightData,
  IWidgetHeadOnCollisionsComparisonData,
  IWidgetCountBySeverityTextData,
  IWidgetCountBySeverityData,
  IWidgetAccidentsByTypeData,
  IWidgetInjuredByYearData,
  IWidgetStreetViewData,
  IWidgetAccidentsByYearData,
  IWidgetVisionZeroImageData,
  IWidgetAccidentsByHourBarData,
  IWidgetMostSevereAccidentsTableData,
  IWidgetTopRoadSegmentsAccidentsPerKm,
  IWidgetAccidentCountByRoadLight,
  IWidgetAccidentCountByDriverType,
  IWidgetAccidentCountByCarType,
  IWidgetInjuredAccidentsWithPedestrians,
} from './WidgetData';

export type IWidgetDataType =
  | IWidgetInjuredCountPerAgeGroupPieData
  | IWidgetMostSevereAccidentsData
  | IWidgetAccidentsHeatMapData
  | IWidgetAccidentsByDayNightData
  | IWidgetHeadOnCollisionsComparisonData
  | IWidgetCountBySeverityTextData
  | IWidgetCountBySeverityData
  | IWidgetAccidentsByTypeData
  | IWidgetInjuredByYearData
  | IWidgetStreetViewData
  | IWidgetAccidentsByYearData
  | IWidgetVisionZeroImageData
  | IWidgetAccidentsByHourBarData
  | IWidgetMostSevereAccidentsTableData
  | IWidgetTopRoadSegmentsAccidentsPerKm
  | IWidgetAccidentCountByRoadLight
  | IWidgetAccidentCountByDriverType
  | IWidgetAccidentCountByCarType
  | IWidgetInjuredAccidentsWithPedestrians;
