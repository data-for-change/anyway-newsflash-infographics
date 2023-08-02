/* eslint-disable max-lines*/
import React, { FC } from 'react';
import {
  IWidgetAccidentCountByRoadLight,
  IWidgetBase,
  IWidgetAccidentsByHourBarData,
  IWidgetMostSevereAccidentsData,
  IWidgetMostSevereAccidentsTableData,
  IWidgetAccidentsBySeverityTextData,
  IWidgetInjuredBySeverityTextData,
  IWidgetAccidentsByTypeData,
  IWidgetMultiBarData,
  IWidgetAccidentsByDayNightData,
  IWidgetHeadOnCollisionsComparisonData,
  IWidgetVisionZeroImageData,
  IWidgetTopRoadSegmentsAccidentsPerKm,
  IWidgetAccidentCountByDriverType,
  IWidgetAccidentCountByCarType,
  IWidgetInjuredAccidentsWithPedestrians,
  IWidgetKilledAndInjuredCountPerAgeGroup,
} from 'models/WidgetData';
import visionZeroImage from 'assets/vision_zero_2_plus_1.jpg';
import vision_zero_10_50_90 from 'assets/vision_zero_10_50_90.png';
import AccidentsCountByHourBarWidget from './AccidentsCountByHourBarWidget';
import MostSevereAccidentsMapWidget from './MostSevereAccidentsMapWidget';
import MostSevereAccidentsTableWidget from './MostSevereAccidentsTableWidget';
import HeatMap from 'components/molecules/HeatMap';
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
import { IPoint } from 'models/Point';
import { WidgetName } from 'models/WidgetName';
import KilledAndInjuredCountPerAgeGroupWidget from './KilledAndInjuredCountPerAgeGroupWidget';
import { getInjuredBySeverityVerbLabel } from 'utils/text.utils';

interface IProps {
  widget: IWidgetBase;
  locationText: string;
  sizeOptions: any;
  editorBarOptions: Record<number, boolean>;
  segmentText: string;
  isStreet: boolean;
}

const WidgetWrapper: FC<IProps> = ({ widget, locationText, sizeOptions, editorBarOptions, segmentText, isStreet }) => {
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
    case WidgetName.most_severe_accidents_table: {
      widgetComponent = <MostSevereAccidentsTableWidget data={data as IWidgetMostSevereAccidentsTableData} />;
      break;
    }
    case WidgetName.accidents_heat_map: {
      widgetComponent = <HeatMap data={data.items as IPoint[]} />;
      break;
    }
    // remove street_view until fixed
    // case WidgetName.street_view: {
    //   widgetComponent = <StreetViewWidget data={data as IWidgetStreetViewData} />;
    //   break;
    // }
    case WidgetName.accident_count_by_severity: {
      widgetComponent = (
        <CountBySeverityTextWidget
          segmentText={isStreet ? locationText : segmentText}
          data={data as IWidgetAccidentsBySeverityTextData}
          severityFieldNames={{
            fatal: 'severity_fatal_count',
            severe: 'severity_severe_count',
            light: 'severity_light_count',
            total: 'total_accidents_count',
          }}
          labels={{
            fatal: 'fatal',
            severe: 'severe',
            light: 'light',
            noun: 'accidents',
            verb: 'occurred',
          }}
          isStreet={isStreet}
        />
      );
      break;
    }
    case WidgetName.injured_count_by_severity: {
      widgetComponent = (
        <CountBySeverityTextWidget
          segmentText={isStreet ? locationText : segmentText}
          data={data as IWidgetInjuredBySeverityTextData}
          severityFieldNames={{
            fatal: 'killed_count',
            severe: 'severe_injured_count',
            light: 'light_injured_count',
            total: 'total_injured_count',
          }}
          labels={{
            fatal: 'killed',
            severe: 'severeInjured',
            light: 'lightInjured',
            noun: 'injured',
            verb: getInjuredBySeverityVerbLabel(data as IWidgetInjuredBySeverityTextData),
          }}
          isStreet={isStreet}
          largeNumbers={true}
        />
      );
      break;
    }
    case WidgetName.accident_count_by_accident_type: {
      widgetComponent = <CountByTypePieWidget data={data as IWidgetAccidentsByTypeData} />;
      break;
    }
    case WidgetName.killed_and_injured_count_per_age_group: {
      widgetComponent = (
        <KilledAndInjuredCountPerAgeGroupWidget data={data as IWidgetKilledAndInjuredCountPerAgeGroup} />
      );
      break;
    }
    case WidgetName.accident_count_by_accident_year: {
      widgetComponent = <CountByYearBarWidget data={data as IWidgetMultiBarData} editorBarOptions={editorBarOptions} />;
      break;
    }
    case WidgetName.injured_count_by_accident_year: {
      widgetComponent = <CountInjuredByYearBarWidget data={data as IWidgetMultiBarData} editorBarOptions={editorBarOptions} />;
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
    case WidgetName.vision_zero_2_plus_1: {
      widgetComponent = <StaticImageViewWidget data={{items:{image_src:visionZeroImage},text:{}} as IWidgetVisionZeroImageData} />;
      break;
    }
    case WidgetName.vision_zero_10_50_90: {
      widgetComponent = <StaticImageViewWidget data={{items:{image_src:vision_zero_10_50_90},text:{}} as IWidgetVisionZeroImageData} />;

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
      console.warn(`widget name (${name}) was not recognized `, widget);
      break;
    }
  }
  return widgetComponent;
};
export default WidgetWrapper;
