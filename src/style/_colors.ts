import {barColors, blueVioletColor, pieChartColors, silverGrayColor} from "./default/_defaultColors";
import {
  grayBeige,
  mainN12Red,
  n12BackgroundColor,
  n12BarColors,
  n12DataContainerColor,
  n12PieChartColors
} from "./n12/_n12_colors";

export const blackColor = '#000';
export const whiteColor = '#ffffff';
export const transparentColor = 'transparent';

// Opacity
export const opacity80percent = '8c';
export const transparent = 'transparent';

//road number icon && font
export const roadIconColors = {
  red: '#ae0721',
  blue: '#0000FE',
  green: '#007E00',
  black: '#000000',
};

export const tooltipMarkerBorderColorArrow = 'transparent #000000 transparent #000000';


declare module "@material-ui/core";
interface PaletteColorOptions {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

export interface ColorScheme extends PaletteColorOptions {
  fontColor: string;
  backgroundColor: string;
  containerColor: string;
  titleContainerColor: string;
  pieChartColors: string[];
  barChartColors: string[];
  roadNumberBackground?: string;
}

export const defaultThemeColors : ColorScheme = {
  main: blueVioletColor,
  fontColor: blackColor,
  backgroundColor: whiteColor,
  containerColor: whiteColor,
  titleContainerColor: whiteColor,
  pieChartColors: pieChartColors,
  barChartColors: barColors,
  roadNumberBackground: silverGrayColor,
}

export const n12ThemeColors : ColorScheme = {
  main: mainN12Red,
  fontColor: whiteColor,
  backgroundColor: n12BackgroundColor,
  containerColor: n12DataContainerColor,
  titleContainerColor: mainN12Red,
  pieChartColors: n12PieChartColors,
  barChartColors: n12BarColors,
  roadNumberBackground: grayBeige,
}

