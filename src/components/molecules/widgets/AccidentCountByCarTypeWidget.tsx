import React, { FC } from 'react';
import { IWidgetAccidentCountByCarType } from '../../../models/WidgetData';
import DoubleBarChartView from '../DoubleBarChartView';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { highlightBasicColor } from '../../../style';

import RoadNumberImage from '../../../services/get-road-image.service';

const CAR_TYPE = 'car_type';
const PERCENTAGE_SEGMENT = 'percentage_segment';
const PERCENTAGE_COUNTRY = 'percentage_country';

interface IProps {
  data: IWidgetAccidentCountByCarType;
  roadNumber: number;
  segmentText: string;
}
const useStyle = makeStyles((theme: Theme) => ({
  roadNumber: {
    padding: theme.spacing(1),
  },
  textHighlight: {
    backgroundColor: highlightBasicColor,
    textAlign: 'center',
  },
  chartWrapper: {
    height: '80%',
    width: '100%',
  },
}));
const AccidentCountByCarType: FC<IProps> = ({ data, roadNumber, segmentText }) => {
  const classes = useStyle();
  const { items } = data;
  return (
    <>
      <Box display="flex" flexDirection="column">
        <span>השוואת אחוז התאונות ע"פ כלי רכב</span>
        <span>במקטע לעומת ממוצע ארצי בכבישים מאותו הסוג</span>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <div className={classes.roadNumber}>
          <RoadNumberImage roadNumber={roadNumber} />
        </div>
        <span className={classes.textHighlight}>{segmentText}</span>
      </Box>
      <Box className={classes.chartWrapper}>
        <DoubleBarChartView data={items} yLabel={CAR_TYPE} xLabel1={PERCENTAGE_SEGMENT} xLabel2={PERCENTAGE_COUNTRY} />
      </Box>
    </>
  );
};
export default AccidentCountByCarType;
