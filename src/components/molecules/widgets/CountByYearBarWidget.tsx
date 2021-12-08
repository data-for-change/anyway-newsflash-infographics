import React, { FC } from 'react';
import { IWidgetAccidentsByYearData } from 'models/WidgetData';
import { MultiBarChart } from '../GenericBarChartView';
import { useTranslation } from 'react-i18next';
import { transformItems } from '../../../utils/barchart';

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

  const isSingleBar = originData.data.items[0].series == null;
  const items = transformItems(originData, isSingleBar);
  const yLabels = Object.keys(items[0]);
  yLabels.splice(0, 1);

  return <MultiBarChart isStacked={true} isPercentage={false} data={items} yLabels={yLabels} textLabel={text.title} />;
};
export default CountByYearBarWidget;
