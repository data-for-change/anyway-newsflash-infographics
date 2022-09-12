import { WidgetName } from 'models/WidgetName';
import  orYarokLogo  from 'assets/greenlight.png';

// cards is this least will be avaiaable for operation environments (all non-staging environments)
export const operationalCards: WidgetName[] = [
  WidgetName.accident_count_by_severity,
  WidgetName.most_severe_accidents_table,
  WidgetName.most_severe_accidents,
  WidgetName.head_on_collisions_comparison_percentage,
  WidgetName.vision_zero_2_plus_1,
];


export const logosSorceMap = [
  {key:'or_yarok',path:orYarokLogo}
]
