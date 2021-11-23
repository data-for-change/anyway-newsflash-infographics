import React, { FC } from 'react';
import { IWidgetAccidentsByYearData } from 'models/WidgetData';
import GenericBarChartView, { BarType } from '../GenericBarChartView';
import { useTranslation } from 'react-i18next';

const YEAR = 'accident_year';
const FATAL_COUNT = 'fatal_count';
const SEVERE_COUNT = 'severe_count';
const LIGHT_COUNT = 'light_count';
const NAME1 = 'fatal';
const NAME2 = 'severe';
const NAME3 = 'light';

interface IProps {
  data: IWidgetAccidentsByYearData;
}

const CountByYearBarWidget: FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  const {items, text } = data;
  // const originData = {
  //   "name": "accident_count_by_accident_year",
  //   "data":  {
  //     "y_label_name": "year",
  //     "is_percentage": true ,
  //     "is_stacked": true,
  //     "items": [
  //       {
  //         "label_key": "2017",
  //         "series": [
  //           { "label_key":  "light", "value": 55},
  //           { "label_key":  "severe", "value": 5},
  //           { "label_key":  "fatal", "value": 1},
  //         ]
  //       },
  //       {
  //         "label_key": "2018",
  //         "series": [
  //           { "label_key":  "light", "value": 50},
  //           { "label_key":  "severe", "value": 3},
  //           { "label_key":  "fatal", "value": 3},
  //         ]
  //       }
  //     ]
  //   },
  //   "text": {
  //     "title": "accident count by accident year",
  //     "labels_map": {
  //       "light": "קלות",
  //       "severe": "בינוניות",
  //       "fatal": "קשות",
  //       "y_label_name": "שנה",
  //     }
  //   }
  // }
  // const items1 = originData.data.items;
  // type stringObject = Record<string,string | number>;
  //
  // const newData = items1.map(item => {
  //   const translated=  originData.data.y_label_name;
  //   const translatedMap : Record<string, string> = originData.text.labels_map
  //   const xLabelValue = item.label_key;
  //   const xLabelName =  translatedMap[translated];
  //   const newItem: stringObject = {};
  //   newItem[xLabelName] = xLabelValue;
  //   for (let i = 0; i < item.series.length; i++) {
  //     const translated= item.series[i].label_key;
  //     const translatedMap : stringObject = originData.text.labels_map
  //     const yLabelName = translatedMap[translated];
  //     newItem[yLabelName] = item.series[i].value;
  //   }
  //   return newItem
  // })
  // console.log(newData);

  const mockItems  = [
    { 'accident_year':2017, 'fatal_count': 1, 'severe_count': 5, 'light_count': 55 },
    { 'accident_year':2018, 'fatal_count': 3, 'severe_count': 3, 'light_count': 50 },
    { 'accident_year':2019, 'fatal_count': 1, 'severe_count': 6, 'light_count': 68 },
    { 'accident_year':2020, 'fatal_count': 0, 'severe_count': 5, 'light_count': 47 },
    { 'accident_year':2021, 'fatal_count': 1, 'severe_count': 5, 'light_count': 39 },
  ];

  // const xLabelsArray = Object.keys(originData.text.labels_map);
  // // console.log(xLabelsArray);
  // const index= xLabelsArray.indexOf('y_label_name');
  // xLabelsArray.splice(index,1);
  const xLabelsArray=[FATAL_COUNT,SEVERE_COUNT,LIGHT_COUNT ]
  const xNames = [t(`textView.${NAME1}.plural`),t(`textView.${NAME2}.plural`),t(`textView.${NAME3}.plural`)]


  return <GenericBarChartView barType={BarType.Stacked}
                              isPercentage={false}
                              data={mockItems}
                              xLabels={xLabelsArray}
                              yLabel={YEAR}
                              textLabel={text.title}
                              xNames={xNames}
  />;
};
export default CountByYearBarWidget;
