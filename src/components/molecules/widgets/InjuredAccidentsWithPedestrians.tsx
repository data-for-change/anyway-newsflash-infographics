import React, { FC } from 'react';
import { IWidgetInjuredAccidentsWithPedestrians } from '../../../models/WidgetData';
import StackedBarChartView from '../StackedBarChartView';
import { Box, makeStyles, Theme } from '@material-ui/core';

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
  },
}));

const InjuredAccidentsWithPedestrians: FC<IProps> = ({ data, segmentText }) => {
  const classes = useStyle();
  const { items } = data;
  return (
    <>
      <Box textAlign="center">{segmentText}</Box>
      <Box className={classes.chartWrapper}>
        <StackedBarChartView
          data={items}
          yLabel={YEAR}
          xLabel1={KILLED_INJURY_SEVERITY_COUNT}
          xLabel2={SEVERE_INJURY_SEVERITY_COUNT}
          xLabel3={LIGHT_INJURY_SEVERITY_COUNT}
        />
      </Box>
    </>
  );
};
export default InjuredAccidentsWithPedestrians;
