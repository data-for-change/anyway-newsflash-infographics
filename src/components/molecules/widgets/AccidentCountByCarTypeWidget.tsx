import React, { FC } from 'react';
import { IWidgetAccidentCountByCarType } from 'models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import GenericBarChartView, { BarType } from '../GenericBarChartView';

type stringNumObject = Record<string, string | number>;
type stringObject = Record<string, string>;

interface IProps {
  data: IWidgetAccidentCountByCarType;
  segmentText: string;
}
const useStyle = makeStyles((theme: Theme) => ({
  chartWrapper: {
    height: '80%',
    width: '100%',
  },
}));

const AccidentCountByCarType: FC<IProps> = ({ data, segmentText }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const { items: ignore } = data;

  // data expected from json
  const originData = {
    name: 'accident_count_by_car_type',
    data: {
      y_label_name: 'car_type',
      is_percentage: true,
      bar_type: 'multi',
      items: [
        {
          label_key: 'bicycle',
          series: [
            { label_key: 'percentage_segment', value: 10 },
            { label_key: 'percentage_country', value: 8 },
          ],
        },
        {
          label_key: 'motorcycle',
          series: [
            { label_key: 'percentage_segment', value: 20 },
            { label_key: 'percentage_country', value: 4 },
          ],
        },
        {
          label_key: 'car',
          series: [
            { label_key: 'percentage_segment', value: 30 },
            { label_key: 'percentage_country', value: 66 },
          ],
        },
        {
          label_key: 'truck',
          series: [
            { label_key: 'percentage_segment', value: 40 },
            { label_key: 'percentage_country', value: 11 },
          ],
        },
      ],
    },
    text: {
      title: 'accident count by car type',
      labels_map: {
        y_label_name: 'סוג רכב',
        percentage_segment: 'אזור',
        percentage_country: 'מדינה',
        truck: 'מסחרי/משאית',
        car: 'רכב נוסעים פרטי',
        motorcycle: 'אופנוע',
        bicycle: 'אופניים/קורקינט',
        other: 'אחר',
      },
    },
  };

  const isPercentage = originData.data.is_percentage;
  const barType = originData.data.bar_type;
  const translationMap: stringObject = originData.text.labels_map;
  const translatedYLabelName = getTranslatedLabel('y_label_name');
  function getTranslatedLabel(key: string): string {
    return translationMap[key] || key;
  }
  const items = originData.data.items;
  const xLabels = originData.data.items[0].series.map((dataPoint) => {
    return getTranslatedLabel(dataPoint.label_key);
  });
  const transformedItems = items.map((item, i) => {
    const { label_key, series } = item;
    const result: stringNumObject = {};
    const label = label_key.toString();
    result[translatedYLabelName] = getTranslatedLabel(label); //   {'סוג רכב':'אופניים'}  /  {'שנה':'2017'}
    series.forEach((dataPoint) => {
      const { label_key, value } = dataPoint;
      const label = getTranslatedLabel(label_key);
      result[label] = Math.round(value); //   {'year':2017, 'percentage_segment':5 ...series}
    });
    return result;
  });
  console.log(transformedItems);

  return (
    <>
      <Box display="flex" flexDirection="column">
        <span>{t('widgets.countByCarType.Accidents count by vehicle type')}</span>
        <span>{t('widgets.countByCarType.compared to national average')}</span>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" fontWeight={500}>
        <Box textAlign="center">{segmentText}</Box>
      </Box>
      <Box className={classes.chartWrapper}>
        <GenericBarChartView
          barType={BarType.Multi}
          isPercentage={isPercentage}
          data={transformedItems}
          yLabel={translatedYLabelName}
          xLabels={xLabels}
        />
      </Box>
    </>
  );
};
export default AccidentCountByCarType;
