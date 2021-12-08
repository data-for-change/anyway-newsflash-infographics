import React, { FC } from 'react';
import { IWidgetAccidentCountByCarType } from 'models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { MultiBarChart } from '../GenericBarChartView';
import { transformItems } from '../../../utils/barchart';

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

  const isSingleBar = originData.data.items[0].series == null;
  const items = transformItems(originData, isSingleBar);
  const yLabels = Object.keys(items[0]);
  yLabels.splice(0, 1);

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
        <MultiBarChart isStacked={false} isPercentage={true} data={items} yLabels={yLabels} />
      </Box>
    </>
  );
};
export default AccidentCountByCarType;
