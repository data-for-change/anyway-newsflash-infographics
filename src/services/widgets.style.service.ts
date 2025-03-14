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

export enum CardType {
  None,
  MapAndDesigns,
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
  [WidgetName.accident_count_by_accident_year]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },
  [WidgetName.injured_count_by_accident_year]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },
  [WidgetName.accident_count_by_day_night]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },
  [WidgetName.head_on_collisions_comparison]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },
  [WidgetName.head_on_collisions_comparison_percentage]: {
    header: HeaderVariant.Centered,
    footer: FooterVariant.LogoWithRange,
  },
  [WidgetName.vision_zero_2_plus_1]: { header: HeaderVariant.None, footer: FooterVariant.LogoWithRange },
  [WidgetName.vision_zero_10_50_90]: { header: HeaderVariant.None, footer: FooterVariant.LogoWithRange },
  [WidgetName.vision_zero_bike]: { header: HeaderVariant.None, footer: FooterVariant.LogoWithRange },
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
  [WidgetName.accidents_heat_map]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },
  [WidgetName.killed_and_injured_count_per_age_group_stacked]: { header: HeaderVariant.Centered, footer: FooterVariant.LogoWithRange },

};

export function getWidgetVariant(widgetName: string) {
  const variant = widgetVariants[widgetName];
  return variant || widgetVariants.defaultVariant;
}

const widgetTypes: { [index: string]: CardType } = {
  defaultType: CardType.None,
  [WidgetName.most_severe_accidents]: CardType.MapAndDesigns ,
  [WidgetName.accidents_heat_map]:CardType.MapAndDesigns,
  [WidgetName.injured_count_by_severity]:CardType.MapAndDesigns,
  [WidgetName.accident_count_by_severity]:CardType.MapAndDesigns,
  [WidgetName.vision_zero_2_plus_1]:CardType.MapAndDesigns,
  [WidgetName.vision_zero_10_50_90]:CardType.MapAndDesigns,
  [WidgetName.vision_zero_bike]:CardType.MapAndDesigns,
};

export function getWidgetType(widgetName: string) {
  const widgetType = widgetTypes[widgetName];
  return widgetType || widgetTypes.defaultType;
}
