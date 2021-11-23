import React, { FC } from 'react';
import { IWidgetAccidentsByYearData } from 'models/WidgetData';
import GenericBarChartView, { BarType } from '../GenericBarChartView';
import { useTranslation } from 'react-i18next';

type stringNumObject = Record<string,string | number>;
type stringObject = Record<string,string>;

interface IProps {
  data: IWidgetAccidentsByYearData;
}

const CountByYearBarWidget: FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  const {items:itemsIgnore, text } = data;

  // data expected from json
  const originData = {
    "name": "accident_count_by_accident_year",
    "data":  {
      "y_label_name": "accident_year",
      "is_percentage": false ,
      "bar_type": "stacked",
      "items": [
        {
          "label_key": "2017",
          "series": [
            { "label_key":  "light", "value": 55},
            { "label_key":  "severe", "value": 5},
            { "label_key":  "fatal", "value": 1},
          ]
        },
        {
          "label_key": "2018",
          "series": [
            { "label_key":  "light", "value": 50},
            { "label_key":  "severe", "value": 3},
            { "label_key":  "fatal", "value": 3},
          ]
        },
        {
          "label_key": "2019",
          "series": [
            { "label_key":  "light", "value": 50},
            { "label_key":  "severe", "value": 3},
            { "label_key":  "fatal", "value": 3},
          ]
        },
        {
          "label_key": "2020",
          "series": [
            { "label_key":  "light", "value": 50},
            { "label_key":  "severe", "value": 3},
            { "label_key":  "fatal", "value": 3},
          ]
        },
      ]
    },
    "text": {
      "title": "accident count by accident year",
      "y_label_name": "שנת תאונה",
      "x_labels_map": {
        "fatal": "קשות",
        "severe": "בינוניות",
        "light": "קלות",
        },
        "y_labels_map": {}
    }
  }

  /**
   * Data structure expected by GenericBarChartView component
   * { 'accident_year':2017, 'fatal_count': 1, 'severe_count': 5, 'light_count': 55 },
   * { 'accident_year':2018, 'fatal_count': 3, 'severe_count': 3, 'light_count': 50 },
   * { 'accident_year':2019, 'fatal_count': 1, 'severe_count': 6, 'light_count': 68 },
   * { 'accident_year':2020, 'fatal_count': 0, 'severe_count': 5, 'light_count': 47 },
   * { 'accident_year':2021, 'fatal_count': 1, 'severe_count': 5, 'light_count': 39 },
   */

  const items = originData.data.items;
  const translatedYLabelName=  originData.text['y_label_name'];
  const isPercentage = originData.data.is_percentage;
  const xTranslateMap:stringObject = originData.text.x_labels_map;
  const yTranslateMap:stringObject = originData.text.y_labels_map;

  const transformedItems = items.reduce((newArray:Array<stringNumObject>, currItem) => {
    const {label_key,series} = currItem;

    const newItem: stringNumObject = {};
    newItem[translatedYLabelName] = yTranslateMap[label_key] || label_key; //   {'year':2017}

    series.forEach((item)=>{
      const {label_key,value} = item;
      const property= xTranslateMap[label_key] || label_key;
      newItem[property]= value; //   {'year':2017, 'light':5 ...series}
    })

    return [...newArray,newItem]
  }, []);

  const xLabels = Object.values(xTranslateMap);

  return <GenericBarChartView barType={BarType.Stacked}
                              isPercentage={isPercentage}
                              data={transformedItems}
                              xLabels={xLabels}
                              yLabel={translatedYLabelName}
                              textLabel={text.title}
  />;
};
export default CountByYearBarWidget;
