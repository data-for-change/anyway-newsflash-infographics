import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DoubleBarChartView from 'components/molecules/DoubleBarChartView';
import { IWidgetAccidentCountByCarType } from 'models/WidgetData';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
const PREFIX = 'AccidentCountByCarType';

const classes = {
  chartWrapper: `${PREFIX}-chartWrapper`,
};

const Root = styled('div')(({ theme: Theme }) => ({
  [`& .${classes.chartWrapper}`]: {
    height: '80%',
    width: '100%',
  },
}));

const CAR_TYPE = 'car_type';
const PERCENTAGE_SEGMENT = 'percentage_segment';
const PERCENTAGE_COUNTRY = 'percentage_country';

interface IProps {
  data: IWidgetAccidentCountByCarType;
  segmentText: string;
}

const AccidentCountByCarType: FC<IProps> = ({ data, segmentText }) => {
  const { t } = useTranslation();
  const { items } = data;
  const roundedItems = items.map((i) => ({
    ...i,
    percentage_segment: Math.round(i.percentage_segment),
    percentage_country: Math.round(i.percentage_country),
  }));

  return (
    <Root>
      <Box display="flex" flexDirection="column">
        <span>{t('widgets.countByCarType.Accidents count by vehicle type')}</span>
        <span>{t('widgets.countByCarType.compared to national average')}</span>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <Box textAlign="center">{segmentText}</Box>
      </Box>
      <Box className={classes.chartWrapper}>
        <DoubleBarChartView
          data={roundedItems}
          yLabel={CAR_TYPE}
          xLabel1={PERCENTAGE_SEGMENT}
          xLabel2={PERCENTAGE_COUNTRY}
        />
      </Box>
    </Root>
  );
};
export default AccidentCountByCarType;
