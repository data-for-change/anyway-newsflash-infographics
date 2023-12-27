import { WidgetName } from 'models/WidgetName';
import  orYarokLogo  from 'assets/greenlight.png';

// cards in this list will be available for operation environments (all non-staging environments)
export const operationalCards: WidgetName[] = [
  WidgetName.accident_count_by_severity,
  WidgetName.most_severe_accidents_table,
  WidgetName.most_severe_accidents,
  WidgetName.head_on_collisions_comparison_percentage,
  WidgetName.vision_zero_2_plus_1,
  WidgetName.injured_count_by_severity,
  WidgetName.accidents_heat_map,
  WidgetName.accident_count_by_accident_year,
  WidgetName.injured_count_by_accident_year,
  WidgetName.accident_count_by_driver_type,
  WidgetName.accident_count_by_day_night
];

export type OrgLogoData =  {key : string, path:string} ;

export const logosSourceMap  : [OrgLogoData] = [
  {key:'or_yarok',path:orYarokLogo}
]

