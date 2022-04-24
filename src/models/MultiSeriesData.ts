export interface MultiSeriesDataItems  {
  label_key: string;
  series: SeriesDataItem[];
}


export interface SeriesDataItem {
  label_key: string;
  value: number;
}

export type LabelsMap = Record<string, string>