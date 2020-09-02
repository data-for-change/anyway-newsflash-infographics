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
    padding: theme.spacing(2),
    alignSelf: 'flex-start',
  },
  textHighlight: {
    backgroundColor: highlightBasicColor,
    textAlign: 'center',
  },
}));
const AccidentCountByCarType: FC<IProps> = ({ data, roadNumber, segmentText }) => {
  const classes = useStyle();
  const { items, text } = data;
  return (
    <>
      <Box display="flex" flexDirection="column">
        <span>השוואת אחוז התאונות ע"פ כלי רכב</span>
        <span>במקטע לעומת ממוצע ארצי בכבישים מאותו הסוג</span>
        <span className={classes.textHighlight}>{segmentText}</span>
      </Box>
      <Box flexBasis={100} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <div className={classes.roadNumber}>
          <RoadNumberImage roadNumber={roadNumber} />
        </div>
      </Box>
      {/* //TODO currently text is not recieved from API - need to fix */}
      <DoubleBarChartView
        data={items}
        yLabel={CAR_TYPE}
        xLabel1={PERCENTAGE_SEGMENT}
        xLabel2={PERCENTAGE_COUNTRY}
        textLabel={text?.title}
      />
      ;
    </>
  );
};
export default AccidentCountByCarType;
