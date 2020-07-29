import React, { FC } from 'react';
import { IWidgetAccidentCountByCarType } from '../../../models/WidgetData';
import BarChartView from '../BarChartView';
import { Box, makeStyles, Theme } from '@material-ui/core';
import RoadNumberImage from '../../../services/get-road-image.service';

const CAR_TYPE = 'car_type';
const PERCENTAGE_SEGMENT = 'percentage_segment';
// const PERCENTAGE_COUNTRY= 'percentage-country'

interface IProps {
  data: IWidgetAccidentCountByCarType;
  //   segmentText : string;
  roadNumber: number;
}

const useStyle = makeStyles((theme: Theme) => ({
  roadNumber: {
    padding: theme.spacing(2),
  },
}));

const AccidentCountByCarType: FC<IProps> = ({ data, roadNumber }) => {
  const classes = useStyle();
  const { items, text } = data;
  return (
    <>
      <Box flexBasis={120} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <div className={classes.roadNumber}>
          <RoadNumberImage roadNumber={roadNumber} />
        </div>
        {/* <span className={classes.textHighlight}>{segmetText}</span> */}
      </Box>
      <BarChartView data={items} xLabel={CAR_TYPE} yLabel={PERCENTAGE_SEGMENT} textLabel={text.title} />;
    </>
  );
};
export default AccidentCountByCarType;
