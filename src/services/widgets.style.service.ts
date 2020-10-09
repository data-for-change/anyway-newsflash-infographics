import { WidgetName } from '../models/WidgetName';

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
  // backgroundImage
}

// === widgets variants === //
const widgetVariants: { [index: string]: CardVariant } = {
  defaultVariant: { header: HeaderVariant.None, footer: FooterVariant.Logo },
  [WidgetName.accidents_count_by_hour]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.injured_count_per_age_group]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.most_severe_accidents]: { header: HeaderVariant.None, footer: FooterVariant.Logo },
  [WidgetName.most_severe_accidents_table]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  // [WidgetName.accidents_heat_map]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  // [WidgetName.street_view]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_severity]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_accident_type]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_accident_year]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.injured_count_by_accident_year]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_day_night]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.head_on_collisions_comparison]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.head_on_collisions_comparison_percentage]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.vision_zero]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.top_road_segments_accidents_per_km]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_road_light]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_driver_type]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_car_type]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
};

export function getWidgetVariant(widgetName: string) {
  const variant = widgetVariants[widgetName];
  return variant || widgetVariants.defaultVariant;
}

// === widgets variants - header titles === //
const widgetHeaderTitles: { [index: string]: string } = {
  defaultTitle: '',
  [WidgetName.accidents_count_by_hour]: 'accidents count by hour', // todo: add all title strings (use i18n)
  [WidgetName.injured_count_per_age_group]: 'injured count per age group',
  [WidgetName.most_severe_accidents_table]: 'most severe accidents table',
};

export function getWidgetTitle(widgetName: string) {
  const title = widgetHeaderTitles[widgetName];
  return title || widgetHeaderTitles.defaultTitle;
}
