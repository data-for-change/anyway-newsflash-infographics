import React, { FC } from 'react';
import { IWidgetSingleBarData } from 'models/WidgetData';
import { Box, makeStyles } from '@material-ui/core';
import { SingleBarChart } from '../GenericBarChartView';
import { transformItems } from 'utils/barchart.utils';

interface IProps {
  data: IWidgetSingleBarData;
  segmentText: string;
}

const useStyle = makeStyles(() => ({
  chartWrapper: {
    height: '100%',
    width: '90%',
    margin: 'auto',
    padding: '5px',
  },
}));

const InjuredAccidentsWithPedestrians: FC<IProps> = ({ data, segmentText }) => {
  const classes = useStyle();
  const content = JSON.parse(JSON.stringify(data));

  const items = transformItems(content);

  return (
    <>
      <Box textAlign="center">{segmentText}</Box>
      <Box className={classes.chartWrapper}>
        <SingleBarChart isPercentage={false} data={items} />
      </Box>
    </>
  );
};
export default InjuredAccidentsWithPedestrians;
