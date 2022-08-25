import { BarDataMap, BAR_CHART_X_LABEL } from 'components/molecules/GenericBarChart';
import { LabelsMap, MultiSeriesDataItems, SeriesDataItem } from 'models/MultiSeriesData';
const getTranslatedLabel = (key: string, labelsMap: LabelsMap): string => labelsMap[key] || key;

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
      const series = item.series;
      series.forEach((dataPoint: any) => {
        const { label_key, value } = dataPoint;
        const yLabel = getTranslatedLabel(label_key, labelsMap as LabelsMap);
        result[yLabel] = Math.round(value);
      });
    }
    return result;
  });
}
