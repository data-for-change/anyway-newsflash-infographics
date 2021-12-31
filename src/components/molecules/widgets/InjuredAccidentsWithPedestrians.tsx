import React, { FC } from 'react';
import { IWidgetSingleBarData } from 'models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { SingleBarChart } from '../GenericBarChartView';
import { useTranslation } from 'react-i18next';
import { transformItems } from '../../../utils/barchart.utils';

interface IProps {
  data: IWidgetSingleBarData;
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
  const content = JSON.parse(JSON.stringify(data));

  const newItems = transformItems(content);

  return (
    <>
      <Box textAlign="center">{segmentText}</Box>
      <Box className={classes.chartWrapper}>
        <SingleBarChart isPercentage={false} data={newItems} />
      </Box>
    </>
  );
};
export default InjuredAccidentsWithPedestrians;
