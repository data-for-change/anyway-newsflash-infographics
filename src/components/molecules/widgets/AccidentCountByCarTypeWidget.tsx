import React, { FC } from 'react';
import { IWidgetAccidentCountByCarType } from 'models/WidgetData';
import DoubleBarChartView from 'components/molecules/DoubleBarChartView';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
const CAR_TYPE = 'car_type';
const PERCENTAGE_SEGMENT = 'percentage_segment';
const PERCENTAGE_COUNTRY = 'percentage_country';

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
  const { items } = data;
  const roundedItems = items.map((i) => ({
    ...i,
    percentage_segment: Math.round(i.percentage_segment),
    percentage_country: Math.round(i.percentage_country),
  }));

  return (
    <>
      <Box display="flex" flexDirection="column">
        <span>{t('widgets.countByCarType.Accidents count by vehicle type')}</span>
        <span>{t('widgets.countByCarType.compared to national average')}</span>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <Box textAlign="center">{segmentText}</Box>
      </Box>
      <Box className={classes.chartWrapper}>
        <DoubleBarChartView
          data={roundedItems}
          yLabel={CAR_TYPE}
          xLabel1={PERCENTAGE_SEGMENT}
          xLabel2={PERCENTAGE_COUNTRY}
        />
      </Box>
    </>
  );
};
export default AccidentCountByCarType;
