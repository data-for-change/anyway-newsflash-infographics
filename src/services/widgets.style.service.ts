import { WidgetName } from 'models/WidgetName';

export enum HeaderVariant {
  None,
  Centered,
  CenteredNoTitle,
  Label,
  Logo,
}

export enum FooterVariant {
  None,
  Logo,
  LogoWithRange,
}

export interface CardVariant {
  header: HeaderVariant;
  footer: FooterVariant;
}

// === widgets variants === //
// determine the footer and  header style for each card
// See `HeaderVariant` and `FooterVariant` enums
const widgetVariants: { [index: string]: CardVariant } = {
  defaultVariant: { header: HeaderVariant.None, footer: FooterVariant.LogoWithRange },
  [WidgetName.accidents_count_by_hour]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },
  [WidgetName.injured_count_per_age_group]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },
  [WidgetName.most_severe_accidents]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },
  [WidgetName.most_severe_accidents_table]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },
  [WidgetName.accident_count_by_severity]: {
    header: HeaderVariant.CenteredNoTitle,
    footer: FooterVariant.LogoWithRange,
  },
  [WidgetName.injured_count_by_severity]: {
    header: HeaderVariant.CenteredNoTitle,
    footer: FooterVariant.LogoWithRange,
  },
  [WidgetName.accident_count_by_accident_type]: { header: HeaderVariant.Centered, footer: FooterVariant.Logo },
  [WidgetName.accident_count_by_accident_year]: { header: HeaderVariant.Logo, footer: FooterVariant.None },
  [WidgetName.injured_count_by_accident_year]: { header: HeaderVariant.Logo, footer: FooterVariant.None },
  [WidgetName.accident_count_by_day_night]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },
  [WidgetName.head_on_collisions_comparison]: { header: HeaderVariant.Label, footer: FooterVariant.LogoWithRange },
  [WidgetName.head_on_collisions_comparison_percentage]: {
    header: HeaderVariant.Label,
    footer: FooterVariant.LogoWithRange,
  },
  [WidgetName.vision_zero_2_plus_1]: { header: HeaderVariant.None, footer: FooterVariant.None },
  [WidgetName.top_road_segments_accidents_per_km]: {
    header: HeaderVariant.Centered,
    footer: FooterVariant.LogoWithRange,
  },
  [WidgetName.accident_count_by_road_light]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },
  [WidgetName.accident_count_by_driver_type]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },
  [WidgetName.accident_count_by_car_type]: { header: HeaderVariant.None, footer: FooterVariant.LogoWithRange },
  [WidgetName.killed_and_injured_count_per_age_group]: {
    header: HeaderVariant.Centered,
    footer: FooterVariant.LogoWithRange,
  },
};

export function getWidgetVariant(widgetName: string) {
  const variant = widgetVariants[widgetName];
  return variant || widgetVariants.defaultVariant;
}
