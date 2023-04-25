import { BarDataMap, BAR_CHART_X_LABEL } from 'components/molecules/GenericBarChart';
import { LabelsMap, MultiSeriesDataItems, SeriesDataItem } from 'models/MultiSeriesData';
import {IWidgetMultiBarData} from "../models/WidgetData";
const getTranslatedLabel = (key: string, labelsMap: LabelsMap): string => labelsMap[key] || key;

export const NUM_OF_BARS = 3

export const barsWidgetsLabels: Record<string, Array<string>> = {
  'accident_count_by_accident_year':
    ['textView.fatal.plural', 'textView.severe.plural', 'textView.light.plural'],
  'injured_count_by_accident_year':
    ['textView.killed.plural', 'textView.severeInjured.plural', 'textView.lightInjured.plural'],
}

export const barsWidgetsTitle: Record<string, string> = {
  'accident_count_by_accident_year': 'cardEditor.showAccidents',
  'injured_count_by_accident_year': 'cardEditor.showInjured',
}

// convert input to data series, for example:
// [
//   {
//     "label_key": "2017"
//     "series": [
//       { "label_key":  "light", "value": 55},
//       { "label_key":  "severe", "value": 5},
//     ]
//   },
//   {
//     "label_key": "2018"
//     "series": [
//       { "label_key":  "light", "value": 50},
//       { "label_key":  "severe", "value": 3},
//     ]
//   }
//  will be converted to: [{ xLabel: 'year 2017', light: 55, severe: 5 }, { xLabel: 'year 2017', light: 50, severe: 3 }]
// see more info in https://github.com/hasadna/anyway-newsflash-infographics/issues/779

export function convertToBarSeries(
  items: SeriesDataItem[] | MultiSeriesDataItems[],
  labelsMap?: LabelsMap | string,
  excludeList: any = [],
): BarDataMap[] {
  return items.map((item: any) => {
    const label: string = item.label_key.toString();

    let labelItem;
    if (typeof labelsMap === 'string') {
      labelItem = label;
    } else {
      const map: LabelsMap = labelsMap as LabelsMap;
      labelItem = map[label] || label;
    }

    const result: BarDataMap = {
      [BAR_CHART_X_LABEL]: labelItem,
    };

    if (!item.series) {
      // single value per bar, return type is like: { xLabel: 'year 2017', value: 30 }
      result['value'] = item.value;
    } else {
      // multi values per (stacked) bar return type is like: { xLabel: 'year 2017', light: 55, severe: 5 }
      const series : SeriesDataItem[] = item.series;
      series.filter((dataPoint: SeriesDataItem) => !excludeList.includes(dataPoint.label_key)).forEach(({ label_key,value }) =>{
        const yLabel = getTranslatedLabel(label_key, labelsMap as LabelsMap);
        result[yLabel] = Math.round(value);
      }) ;
    }
    return result;
  });
}

export function createBarWidget (
  data: IWidgetMultiBarData,
  editorBarOptions: Record<number, boolean>
): BarDataMap[] {
  const { items, text } = data;
  const excludeList = (Object.keys(editorBarOptions).length !== 0) ?
    Object.values(editorBarOptions).map((include: any, index: number) => {
      if (include) {
        return null;
      } else {
        return items[0].series[index].label_key;
      }
    }) : []
  return convertToBarSeries(items, text.labels_map, excludeList);
}

export function initEditorBarOptions () {
  return Object.fromEntries(Array.from({length: NUM_OF_BARS}, (_, i) => [i, true]));
}
