import React, { FC } from 'react';
import { IWidgetInjuredAccidentsWithPedestrians } from 'models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import GenericBarChartView, { BarType } from '../GenericBarChartView';
import { useTranslation } from 'react-i18next';

const YEAR = 'year';
const KILLED_INJURY_SEVERITY_COUNT = 'killed_injury_severity_count';
const SEVERE_INJURY_SEVERITY_COUNT = 'severe_injury_severity_count';
const LIGHT_INJURY_SEVERITY_COUNT = 'light_injury_severity_count';

interface IProps {
  data: IWidgetInjuredAccidentsWithPedestrians;
  segmentText: string;
}
const useStyle = makeStyles((theme: Theme) => ({
  chartWrapper: {
    height: '100%',
    width: '90%',
    margin: 'auto',
    padding: '5px',
  },
}));

const InjuredAccidentsWithPedestrians: FC<IProps> = ({ data, segmentText }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const  items  = [
    { 'year':2011, 'killed_injury_severity_count': 40, 'severe_injury_severity_count': 50, 'light_injury_severity_count': 70 },
    { 'year':2012,'killed_injury_severity_count': 6, 'severe_injury_severity_count': 2, 'light_injury_severity_count': 8 },
    { 'year':2013,'killed_injury_severity_count': 12, 'severe_injury_severity_count': 34, 'light_injury_severity_count': 67 },
    { 'year':2014,'killed_injury_severity_count': 36, 'severe_injury_severity_count': 2, 'light_injury_severity_count': 1 },
    { 'year':2015,'killed_injury_severity_count': 13, 'severe_injury_severity_count': 2, 'light_injury_severity_count': 3 },
    { 'year':2016,'killed_injury_severity_count': 7, 'severe_injury_severity_count': 7, 'light_injury_severity_count': 45 },
    { 'year':2017,'killed_injury_severity_count': 37, 'severe_injury_severity_count': 12, 'light_injury_severity_count': 23 },

  ];
  const xLabels = [KILLED_INJURY_SEVERITY_COUNT,SEVERE_INJURY_SEVERITY_COUNT,LIGHT_INJURY_SEVERITY_COUNT]

  return (
    <>
      <Box textAlign="center">{segmentText}</Box>
      <Box className={classes.chartWrapper}>
        <GenericBarChartView
          barType={BarType.Stacked}
          isPercentage={false}
          data={items}
          yLabel={YEAR}
          xLabels={xLabels}
        />
      </Box>
    </>
  );
};
export default InjuredAccidentsWithPedestrians;
