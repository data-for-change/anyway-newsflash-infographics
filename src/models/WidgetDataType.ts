import {
  IWidgetInjuredCountPerAgeGroupPieData,
  IWidgetMostSevereAccidentsData,
  IWidgetAccidentsHeatMapData,
  IWidgetAccidentsByDayNightData,
  IWidgetHeadOnCollisionsComparisonData,
  IWidgetCountBySeverityTextData,
  IWidgetCountBySeverityData,
  IWidgetAccidentsByTypeData,
  IWidgetStreetViewData,
  IWidgetSingleBarData,
  IWidgetMultiBarData,
  IWidgetVisionZeroImageData,
  IWidgetAccidentsByHourBarData,
  IWidgetMostSevereAccidentsTableData,
  IWidgetTopRoadSegmentsAccidentsPerKm,
  IWidgetAccidentCountByRoadLight,
  IWidgetAccidentCountByDriverType,
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
  | IWidgetStreetViewData
  | IWidgetSingleBarData
  | IWidgetMultiBarData
  | IWidgetVisionZeroImageData
  | IWidgetAccidentsByHourBarData
  | IWidgetMostSevereAccidentsTableData
  | IWidgetTopRoadSegmentsAccidentsPerKm
  | IWidgetAccidentCountByRoadLight
  | IWidgetAccidentCountByDriverType;
