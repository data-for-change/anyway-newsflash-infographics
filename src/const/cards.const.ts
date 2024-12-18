import { WidgetName } from 'models/WidgetName';
import  orYarokLogo  from 'assets/greenlight.png';
import n12Logo from 'assets/n12Logo.png';

// cards in this list will be available for operation environments (all non-staging environments)
export const operationalCards: WidgetName[] = [
  WidgetName.accident_count_by_severity,
  WidgetName.most_severe_accidents_table,
  WidgetName.most_severe_accidents,
  WidgetName.head_on_collisions_comparison_percentage,
  WidgetName.vision_zero_2_plus_1,
  WidgetName.vision_zero_10_50_90,
  WidgetName.vision_zero_bike,
  WidgetName.injured_count_by_severity,
  WidgetName.accidents_heat_map,
  WidgetName.accident_count_by_accident_year,
  WidgetName.injured_count_by_accident_year,
  // WidgetName.accident_count_by_driver_type,
  WidgetName.killed_and_injured_count_per_age_group,
  WidgetName.accident_count_by_day_night,
  WidgetName.killed_and_injured_count_per_age_group_stacked,
];

export type OrgLogoData =  {key : string, path:string} ;

export const logosSourceMap  : OrgLogoData[] = [
  {key: 'or_yarok', path: orYarokLogo},
  {key: 'n12', path: n12Logo},
]
