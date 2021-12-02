import React, { FC } from 'react';
import { IWidgetInjuredAccidentsWithPedestrians } from 'models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import GenericBarChartView from '../GenericBarChartView';
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
  const items = [
    { year: 2011, value: 40 },
    { year: 2012, value: 64 },
    { year: 2013, value: 12 },
    { year: 2014, value: 36 },
  ];
  const xLabels = ['value'];

  return (
    <>
      <Box textAlign="center">{segmentText}</Box>
      <Box className={classes.chartWrapper}>
        <GenericBarChartView isStacked={false} isPercentage={false} data={items} yLabel={YEAR} xLabels={xLabels} />
      </Box>
    </>
  );
};
export default InjuredAccidentsWithPedestrians;
