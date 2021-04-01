import React, { FC } from 'react';
import {
  IWidgetAccidentCountByRoadLight,
  IWidgetBase,
  IWidgetAccidentsByHourBarData,
  // IWidgetInjuredCountPerAgeGroupPieData,
  IWidgetMostSevereAccidentsData,
  IWidgetMostSevereAccidentsTableData,
  IWidgetCountBySeverityTextData,
  IWidgetAccidentsByTypeData,
  IWidgetAccidentsByYearData,
  IWidgetInjuredByYearData,
  IWidgetAccidentsByDayNightData,
  IWidgetHeadOnCollisionsComparisonData,
  IWidgetVisionZeroImageData,
  IWidgetTopRoadSegmentsAccidentsPerKm,
  IWidgetAccidentCountByDriverType,
  IWidgetAccidentCountByCarType,
  IWidgetInjuredAccidentsWithPedestrians,
  IWidgetRainAccidentsBySeverityTableData,
} from '../../../models/WidgetData';
import AccidentsCountByHourBarWidget from './AccidentsCountByHourBarWidget';
// import InjuredCountPerAgeGroupPieWidget from './InjuredCountPerAgeGroupPieWidget';
import MostSevereAccidentsMapWidget from './MostSevereAccidentsMapWidget';
import MostSevereAccidentsTableWidget from './MostSevereAccidentsTableWidget';
import HeatMap from '../HeatMap';
import CountBySeverityTextWidget from './CountBySeverityTextWidget';
import CountByTypePieWidget from './CountByTypePieWidget';
import CountByYearBarWidget from './CountByYearBarWidget';
import CountInjuredByYearBarWidget from './CountInjuredByYearBarWidget';
import CountAccidentsByDayNightPieWidget from './CountAccidentsByDayNightPieWidget';
import HeadOnCollisionsComparisonWidget from './HeadOnCollisionsComparisonWidget';
import StaticImageViewWidget from './StaticImageViewWidget';
import TopRoadSegmentsAccidentsPerKm from './TopRoadSegmentsAccidentsPerKm';
import AccidentCountByRoadLight from './AccidentCountByRoadLight';
import AccidentCountByDriverType from './AccidentCountByDriverType';
import AccidentCountByCarTypeWidget from './AccidentCountByCarTypeWidget';
import InjuredAccidentsWithPedestrians from './InjuredAccidentsWithPedestrians';
import { IPoint } from '../../../models/Point';
import { WidgetName } from '../../../models/WidgetName';
import RainAccidentsTableWidget from './RainAccidentsTableWidget';

interface IProps {
  widget: IWidgetBase;
  locationText: string;
  sizeOptions: any;
  segmentText: string;
}

const WidgetWrapper: FC<IProps> = ({ widget, locationText, sizeOptions, segmentText }) => {
  const { name, data } = widget;
  let widgetComponent;
  switch (name) {
    case WidgetName.accidents_count_by_hour: {
      widgetComponent = <AccidentsCountByHourBarWidget data={data as IWidgetAccidentsByHourBarData} />;
      break;
    }
    // Temp - until server issues has been staged
    // case WidgetName.injured_count_per_age_group: {
    //   widgetComponent = <InjuredCountPerAgeGroupPieWidget data={data as IWidgetInjuredCountPerAgeGroupPieData} />;
    //   break;
    // }
    case WidgetName.most_severe_accidents: {
      widgetComponent = (
        <MostSevereAccidentsMapWidget data={data as IWidgetMostSevereAccidentsData} sizeOptions={sizeOptions} />
      );
      break;
    }
    case WidgetName.rain_accidents_by_severity: {
      widgetComponent = <RainAccidentsTableWidget data={data as IWidgetRainAccidentsBySeverityTableData} />;
      break;
    }
    case WidgetName.most_severe_accidents_table: {
      widgetComponent = <MostSevereAccidentsTableWidget data={data as IWidgetMostSevereAccidentsTableData} />;
      break;
    }
    case WidgetName.accidents_heat_map: {
      widgetComponent = (
        <HeatMap data={data.items as IPoint[]} center={{ lat: 32.0853, lng: 34.7818 }} sizeOptions={sizeOptions} />
      );
      break;
    }
    // remove street_view until fixed
    // case WidgetName.street_view: {
    //   widgetComponent = <StreetViewWidget data={data as IWidgetStreetViewData} />;
    //   break;
    // }
    case WidgetName.accident_count_by_severity: {
      widgetComponent = (
        <CountBySeverityTextWidget segmentText={segmentText} data={data as IWidgetCountBySeverityTextData} />
      );
      break;
    }
    case WidgetName.accident_count_by_accident_type: {
      // example of pie widget
      widgetComponent = <CountByTypePieWidget data={data as IWidgetAccidentsByTypeData} />;
      break;
    }
    case WidgetName.accident_count_by_accident_year: {
      widgetComponent = <CountByYearBarWidget data={data as IWidgetAccidentsByYearData} />;
      break;
    }
    case WidgetName.injured_count_by_accident_year: {
      widgetComponent = <CountInjuredByYearBarWidget data={data as IWidgetInjuredByYearData} />;
      break;
    }
    case WidgetName.accident_count_by_day_night: {
      widgetComponent = <CountAccidentsByDayNightPieWidget data={data as IWidgetAccidentsByDayNightData} />;
      break;
    }
    case WidgetName.head_on_collisions_comparison: {
      widgetComponent = (
        <HeadOnCollisionsComparisonWidget
          data={data as IWidgetHeadOnCollisionsComparisonData}
          segmetText={locationText}
        />
      );
      break;
    }
    case WidgetName.head_on_collisions_comparison_percentage: {
      widgetComponent = (
        <HeadOnCollisionsComparisonWidget
          data={data as IWidgetHeadOnCollisionsComparisonData}
          segmetText={locationText}
          usePercent={true}
        />
      );
      break;
    }
    case WidgetName.vision_zero: {
      widgetComponent = <StaticImageViewWidget data={data as IWidgetVisionZeroImageData} />;
      break;
    }
    case WidgetName.top_road_segments_accidents_per_km: {
      widgetComponent = (
        <TopRoadSegmentsAccidentsPerKm data={data as IWidgetTopRoadSegmentsAccidentsPerKm} segmentText={locationText} />
      );
      break;
    }
    case WidgetName.accident_count_by_road_light: {
      widgetComponent = (
        <AccidentCountByRoadLight data={data as IWidgetAccidentCountByRoadLight} segmentText={locationText} />
      );
      break;
    }
    case WidgetName.accident_count_by_driver_type: {
      widgetComponent = <AccidentCountByDriverType data={data as IWidgetAccidentCountByDriverType} />;
      break;
    }
    case WidgetName.accident_count_by_car_type: {
      widgetComponent = (
        <AccidentCountByCarTypeWidget data={data as IWidgetAccidentCountByCarType} segmentText={locationText} />
      );
      break;
    }
    case WidgetName.injured_accidents_with_pedestrians: {
      widgetComponent = (
        <InjuredAccidentsWithPedestrians
          data={data as IWidgetInjuredAccidentsWithPedestrians}
          segmentText={segmentText}
        />
      );
      break;
    }
    default: {
      widgetComponent = null; // do not create element for unrecognized widget
      console.warn(`widget name (${name}) was not recognize `, widget);
      break;
    }
  }
  return widgetComponent;
};
export default WidgetWrapper;
