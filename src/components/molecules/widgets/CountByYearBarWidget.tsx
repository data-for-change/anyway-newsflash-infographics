import React, { FC } from 'react';
import { IWidgetAccidentsByYearData } from 'models/WidgetData';
import GenericBarChartView from '../GenericBarChartView';
import { useTranslation } from 'react-i18next';

type stringNumObject = Record<string, string | number>;
type stringObject = Record<string, string>;

interface IProps {
  data: IWidgetAccidentsByYearData;
}

const CountByYearBarWidget: FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  const { items: itemsIgnore, text } = data;

  // data expected from json
  const originData = {
    name: 'accident_count_by_accident_year',
    data: {
      is_percentage: false,
      is_stacked: true,
      items: [
        {
          label_key: '2017',
          series: [
            { label_key: 'light', value: 35 },
            { label_key: 'severe', value: 5 },
            { label_key: 'fatal', value: 1 },
          ],
        },
        {
          label_key: '2018',
          series: [
            { label_key: 'light', value: 100 },
            { label_key: 'severe', value: 3 },
            { label_key: 'fatal', value: 3 },
          ],
        },
        {
          label_key: '2019',
          series: [
            { label_key: 'light', value: 50 },
            { label_key: 'severe', value: 3 },
            { label_key: 'fatal', value: 3 },
          ],
        },
        {
          label_key: '2020',
          series: [
            { label_key: 'light', value: 30 },
            { label_key: 'severe', value: 3 },
            { label_key: 'fatal', value: 3 },
          ],
        },
      ],
    },
    text: {
      title: 'accident count by accident year',
      labels_map: {
        y_label_name: 'שנת תאונה',
        fatal: 'קשות',
        severe: 'בינוניות',
        light: 'קלות',
      },
    },
  };

  /**
   * Data structure expected by GenericBarChartView component
   * { 'accident_year':2017, 'fatal_count': 1, 'severe_count': 5, 'light_count': 55 },
   * { 'accident_year':2018, 'fatal_count': 3, 'severe_count': 3, 'light_count': 50 },
   * { 'accident_year':2019, 'fatal_count': 1, 'severe_count': 6, 'light_count': 68 },
   * { 'accident_year':2020, 'fatal_count': 0, 'severe_count': 5, 'light_count': 47 },
   * { 'accident_year':2021, 'fatal_count': 1, 'severe_count': 5, 'light_count': 39 },
   */

  const isPercentage = originData.data.is_percentage;
  const isStacked = originData.data.is_stacked;
  const labelsMap: stringObject = originData.text.labels_map;
  const translatedYLabelName = getTranslatedLabel('y_label_name');
  function getTranslatedLabel(key: string): string {
    return labelsMap[key] || key;
  }
  const items = originData.data.items;
  const xLabels = originData.data.items[0].series.map((dataPoint) => {
    return getTranslatedLabel(dataPoint.label_key);
  });

  const transformedItems = items.map((item) => {
    const { label_key, series } = item;
    const result: stringNumObject = {};
    const label = label_key.toString();
    result[translatedYLabelName] = getTranslatedLabel(label); //   {'סוג רכב':'אופניים'}    {'שנה':'2017'}
    series.forEach((dataPoint) => {
      const { label_key, value } = dataPoint;
      const label = getTranslatedLabel(label_key);
      result[label] = Math.round(value); //   {'year':2017, 'percentage_segment':5 ...series}
    });
    return result;
  });
  console.log(transformedItems);

  return (
    <GenericBarChartView
      isStacked={isStacked}
      isPercentage={isPercentage}
      data={transformedItems}
      xLabels={xLabels}
      yLabel={translatedYLabelName}
      textLabel={text.title}
    />
  );
};
export default CountByYearBarWidget;
