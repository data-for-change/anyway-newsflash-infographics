import React, { FC } from 'react';
import {
  IWidgetAccidentCountByRoadLight,
  IWidgetBase,
  IWidgetAccidentsByHourBarData,
  IWidgetInjuredCountPerAgeGroupPieData,
  IWidgetMostSevereAccidentsData,
  IWidgetMostSevereAccidentsTableData,
  IWidgetStreetViewData,
  IWidgetCountBySeverityTextData,
  IWidgetAccidentsByTypeData,
  IWidgetAccidentsByYearData,
  IWidgetInjuredByYearData,
  IWidgetAccidentsByDayNightData,
  IWidgetHeadOnCollisionsComparisonData,
  IWidgetVisionZeroImageData,
  IWidgetTopRoadSegmentsAccidentsPerKm,
  IWidgetAccidentCountByDriverType,
} from '../../../models/WidgetData';
import AccidentsCountByHourBarWidget from './AccidentsCountByHourBarWidget';
import InjuredCountPerAgeGroupPieWidget from './InjuredCountPerAgeGroupPieWidget';
import MostSevereAccidentsMapWidget from './MostSevereAccidentsMapWidget';
import MostSevereAccidentsTableWidget from './MostSevereAccidentsTableWidget';
import HeatMap from '../HeatMap';
import StreetViewWidget from './StreetViewWidget';
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
import { IPoint } from '../../../models/Point';

interface IProps {
  widget: IWidgetBase;
  segmentText: string;
  roadNumber: number;
  options?: any;
}

const WidgetWrapper: FC<IProps> = ({ widget, segmentText, roadNumber, options = {} }) => {
  const { name, data } = widget;
  let widgetComponent;
  switch (name) {
    case 'accidents_count_by_hour': {
      widgetComponent = <AccidentsCountByHourBarWidget data={data as IWidgetAccidentsByHourBarData} />;
      break;
    }
    case 'injured_count_per_age_group': {
      widgetComponent = <InjuredCountPerAgeGroupPieWidget data={data as IWidgetInjuredCountPerAgeGroupPieData} />;
      break;
    }
    case 'most_severe_accidents': {
      widgetComponent = <MostSevereAccidentsMapWidget data={data as IWidgetMostSevereAccidentsData} />;
      break;
    }
    case 'most_severe_accidents_table': {
      widgetComponent = (
        <MostSevereAccidentsTableWidget data={data as IWidgetMostSevereAccidentsTableData} roadNumber={roadNumber} />
      );
      break;
    }
    case 'accidents_heat_map': {
      widgetComponent = <HeatMap data={data.items as IPoint[]} center={{ lat: 32.0853, lng: 34.7818 }} />;
      break;
    }
    case 'street_view': {
      widgetComponent = <StreetViewWidget data={data as IWidgetStreetViewData} />;
      break;
    }
    case 'accident_count_by_severity': {
      widgetComponent = (
        <CountBySeverityTextWidget
          data={data as IWidgetCountBySeverityTextData}
          segmentText={segmentText}
          roadNumber={roadNumber}
        />
      );
      break;
    }
    case 'accident_count_by_accident_type': {
      // example of pie widget
      widgetComponent = <CountByTypePieWidget data={data as IWidgetAccidentsByTypeData} />;
      break;
    }
    case 'accident_count_by_accident_year': {
      widgetComponent = <CountByYearBarWidget data={data as IWidgetAccidentsByYearData} />;
      break;
    }
    case 'injured_count_by_accident_year': {
      widgetComponent = <CountInjuredByYearBarWidget data={data as IWidgetInjuredByYearData} />;
      break;
    }
    case 'accident_count_by_day_night': {
      widgetComponent = <CountAccidentsByDayNightPieWidget data={data as IWidgetAccidentsByDayNightData} />;
      break;
    }
    case 'head_on_collisions_comparison': {
      widgetComponent = (
        <HeadOnCollisionsComparisonWidget
          data={data as IWidgetHeadOnCollisionsComparisonData}
          segmetText={segmentText}
          roadNumber={roadNumber}
        />
      );
      break;
    }
    case 'head_on_collisions_comparison_percentage': {
      widgetComponent = (
        <HeadOnCollisionsComparisonWidget
          data={data as IWidgetHeadOnCollisionsComparisonData}
          segmetText={segmentText}
          usePercent={true}
          roadNumber={roadNumber}
        />
      );
      break;
    }
    case 'vision_zero': {
      widgetComponent = <StaticImageViewWidget data={data as IWidgetVisionZeroImageData} />;
      break;
    }
    case 'top_road_segments_accidents_per_km': {
      widgetComponent = (
        <TopRoadSegmentsAccidentsPerKm data={data as IWidgetTopRoadSegmentsAccidentsPerKm} segmentText={segmentText} />
      );
      break;
    }
    case 'accident_count_by_road_light': {
      widgetComponent = (
        <AccidentCountByRoadLight data={data as IWidgetAccidentCountByRoadLight} segmentText={segmentText} />
      );
      break;
    }
    case 'accident_count_by_driver_type': {
      widgetComponent = <AccidentCountByDriverType data={data as IWidgetAccidentCountByDriverType} />;
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
