import React, { FC } from 'react';
import { IWidgetAccidentCountByCarType } from 'models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import GenericBarChartView from '../GenericBarChartView';
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
  const xLabels = [PERCENTAGE_SEGMENT,PERCENTAGE_COUNTRY];
  const xNames = [t('widgets.countByCarType.percentage_segment'),t('widgets.countByCarType.percentage_country')]
  const numOfBars = xLabels.length;

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
          isStacked={false}
          isPercentage={true}
          numOfBars={numOfBars}
          data={roundedItems}
          yLabel={CAR_TYPE}
          xLabels={xLabels}
          xNames={xNames}
        />
      </Box>
    </>
  );
};
export default AccidentCountByCarType;
