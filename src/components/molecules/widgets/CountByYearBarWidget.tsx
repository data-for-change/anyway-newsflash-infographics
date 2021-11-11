import React, { FC } from 'react';
import BarChartView from 'components/molecules/BarChartView';
import { IWidgetAccidentsByYearData } from 'models/WidgetData';
import GenericBarChartView from '../GenericBarChartView';
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
  const { text } = data;
  const items  = [
    { 'accident_year':2017, 'fatal_count': 1, 'severe_count': 5, 'light_count': 55 },
    { 'accident_year':2018, 'fatal_count': 3, 'severe_count': 3, 'light_count': 50 },
    { 'accident_year':2019, 'fatal_count': 1, 'severe_count': 6, 'light_count': 68 },
    { 'accident_year':2020, 'fatal_count': 0, 'severe_count': 5, 'light_count': 47 },
    { 'accident_year':2021, 'fatal_count': 1, 'severe_count': 5, 'light_count': 39 },
  ];
  const xLabels = [FATAL_COUNT,SEVERE_COUNT,LIGHT_COUNT]
  const numOfBars = xLabels.length;
  const xNames = [t(`textView.${NAME1}.plural`),t(`textView.${NAME2}.plural`),t(`textView.${NAME3}.plural`)]


  return <GenericBarChartView isStacked={true}
                              isPercentages={false}
                              numOfBars={numOfBars}
                              data={items}
                              xLabels={xLabels}
                              yLabel={YEAR}
                              textLabel={text.title}
                              xNames={xNames}
  />;
};
export default CountByYearBarWidget;
