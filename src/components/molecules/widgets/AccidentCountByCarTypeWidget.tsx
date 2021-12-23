import React, { FC } from 'react';
import { IWidgetMultiBarData } from 'models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { MultiBarChart } from '../GenericBarChartView';
import { transformItems } from '../../../utils/barchart.utils';

interface IProps {
  data: IWidgetMultiBarData;
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
  const content = JSON.parse(JSON.stringify(data));
  const newItems = transformItems(content);
  const yLabels = Object.keys(content.items[0]);
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
        <MultiBarChart isStacked={false} isPercentage={true} data={newItems} yLabels={yLabels} />
      </Box>
    </>
  );
};
export default AccidentCountByCarType;
