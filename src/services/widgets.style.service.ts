import { WidgetName } from 'models/WidgetName';

export enum HeaderVariant {
  None,
  Centered,
  Label,
  Logo,
}

export enum FooterVariant {
  None,
  Logo,
}

export interface CardVariant {
  header: HeaderVariant;
  footer: FooterVariant;
}

// === widgets variants === //
// determine the footer and  header style for each card
// See `HeaderVariant` and `FooterVariant` enums
const widgetVariants: { [index: string]: CardVariant } = {
  defaultVariant: { header: HeaderVariant.None, footer: FooterVariant.Logo },
  [WidgetName.accidents_count_by_hour]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.injured_count_per_age_group]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.most_severe_accidents]: { header: HeaderVariant.None, footer: FooterVariant.Logo },
  [WidgetName.most_severe_accidents_table]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_severity]: { header: HeaderVariant.Logo, footer: FooterVariant.None },
  [WidgetName.accident_count_by_accident_type]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_accident_year]: { header: HeaderVariant.Logo, footer: FooterVariant.None },
  [WidgetName.injured_count_by_accident_year]: { header: HeaderVariant.Logo, footer: FooterVariant.None },
  [WidgetName.accident_count_by_day_night]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.head_on_collisions_comparison]: { header: HeaderVariant.Label, footer: FooterVariant.Logo },
  [WidgetName.head_on_collisions_comparison_percentage]: { header: HeaderVariant.Label, footer: FooterVariant.Logo },
  [WidgetName.vision_zero_2_plus_1]: { header: HeaderVariant.None, footer: FooterVariant.Logo },
  [WidgetName.top_road_segments_accidents_per_km]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_road_light]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_driver_type]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_car_type]: { header: HeaderVariant.None, footer: FooterVariant.Logo },
};

export function getWidgetVariant(widgetName: string) {
  const variant = widgetVariants[widgetName];
  return variant || widgetVariants.defaultVariant;
}
