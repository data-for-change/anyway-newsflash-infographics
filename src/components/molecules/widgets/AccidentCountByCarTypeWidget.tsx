import React, { FC } from 'react';
import { IWidgetAccidentCountByCarType } from '../../../models/WidgetData';
import DoubleBarChartView from '../DoubleBarChartView';
import { Box, makeStyles, Theme } from '@material-ui/core';
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
  const { items } = data;
  return (
    <>
      <Box display="flex" flexDirection="column">
        <span>השוואת אחוז התאונות ע"פ כלי רכב</span>
        <span>במקטע לעומת ממוצע ארצי בכבישים מאותו הסוג</span>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <Box textAlign="center">{segmentText}</Box>
      </Box>
      <Box className={classes.chartWrapper}>
        <DoubleBarChartView data={items} yLabel={CAR_TYPE} xLabel1={PERCENTAGE_SEGMENT} xLabel2={PERCENTAGE_COUNTRY} />
      </Box>
    </>
  );
};
export default AccidentCountByCarType;
