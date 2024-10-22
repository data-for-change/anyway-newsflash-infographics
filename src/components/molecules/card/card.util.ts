import { CardVariant, FooterVariant, HeaderVariant } from 'services/widgets.style.service';
import { cardFooterHeight, cardHeaderHeight, cardHeight, cardWidth } from 'style';

export interface CardSizes {
  height: number;
  width: number;
  headerHeight: number;
  contentHeight: number;
  footerHeight: number;
}

export function getSizes(variant: CardVariant, factor: number): CardSizes {
  const height = cardHeight * factor;
  const width = cardWidth * factor;
  const headerHeight = variant.header === HeaderVariant.None ? 0 : cardHeaderHeight * factor;
  const footerHeight = variant.footer === FooterVariant.None ? 0 : cardFooterHeight * factor;
  const contentHeight = height - headerHeight - footerHeight;

  return {
    height,
    width,
    headerHeight,
    contentHeight,
    footerHeight,
  };
}
