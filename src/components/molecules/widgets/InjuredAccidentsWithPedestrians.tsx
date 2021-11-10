import React, { FC } from 'react';
import { IWidgetInjuredAccidentsWithPedestrians } from 'models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import GenericBarChartView from '../GenericBarChartView';

const YEAR = 'year';
const KILLED_INJURY_SEVERITY_COUNT = 'killed_injury_severity_count';
const SEVERE_INJURY_SEVERITY_COUNT = 'severe_injury_severity_count';
const LIGHT_INJURY_SEVERITY_COUNT = 'light_injury_severity_count';
const NAME1 = 'Killed';
const NAME2 = 'Severe';
const NAME3 = 'Light';

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
  const  items  = [
    { 'year':2011, 'killed_injury_severity_count': 3, 'severe_injury_severity_count': 12, 'light_injury_severity_count': 23 },
    { 'year':2012,'killed_injury_severity_count': 3, 'severe_injury_severity_count': 12, 'light_injury_severity_count': 23 },
    { 'year':2013,'killed_injury_severity_count': 3, 'severe_injury_severity_count': 12, 'light_injury_severity_count': 23 },
    { 'year':2014,'killed_injury_severity_count': 3, 'severe_injury_severity_count': 12, 'light_injury_severity_count': 23 },
    { 'year':2015,'killed_injury_severity_count': 3, 'severe_injury_severity_count': 12, 'light_injury_severity_count': 23 },
    { 'year':2016,'killed_injury_severity_count': 3, 'severe_injury_severity_count': 12, 'light_injury_severity_count': 23 },
    { 'year':2017,'killed_injury_severity_count': 3, 'severe_injury_severity_count': 12, 'light_injury_severity_count': 23 },

  ];
  const xLabels = [KILLED_INJURY_SEVERITY_COUNT,SEVERE_INJURY_SEVERITY_COUNT,LIGHT_INJURY_SEVERITY_COUNT]
  const numOfBars = xLabels.length;
  const xNames = [NAME1,NAME2,NAME3]

  return (
    <>
      <Box textAlign="center">{segmentText}</Box>
      <Box className={classes.chartWrapper}>
        <GenericBarChartView
          numOfBars={numOfBars}
          data={items}
          yLabel={YEAR}
          xLabels={xLabels}
          xNames={xNames}
        />
      </Box>
    </>
  );
};
export default InjuredAccidentsWithPedestrians;
