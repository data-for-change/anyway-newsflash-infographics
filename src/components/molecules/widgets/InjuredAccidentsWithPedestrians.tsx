import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import StackedBarChartView from 'components/molecules/StackedBarChartView';
import { IWidgetInjuredAccidentsWithPedestrians } from 'models/WidgetData';
import React, { FC } from 'react';

const PREFIX = 'InjuredAccidentsWithPedestrians';

const classes = {
  chartWrapper: `${PREFIX}-chartWrapper`,
};

const Root = styled('div')(() => ({
  [`& .${classes.chartWrapper}`]: {
    height: '100%',
    width: '90%',
    margin: 'auto',
    padding: '5px',
  },
}));

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

const InjuredAccidentsWithPedestrians: FC<IProps> = ({ data, segmentText }) => {
  const { items } = data;
  return (
    <Root>
      <Box textAlign="center">{segmentText}</Box>
      <Box className={classes.chartWrapper}>
        <StackedBarChartView
          data={items}
          yLabel={YEAR}
          xLabel1={KILLED_INJURY_SEVERITY_COUNT}
          xLabel2={SEVERE_INJURY_SEVERITY_COUNT}
          xLabel3={LIGHT_INJURY_SEVERITY_COUNT}
          name1={NAME1}
          name2={NAME2}
          name3={NAME3}
        />
      </Box>
    </Root>
  );
};
export default InjuredAccidentsWithPedestrians;
