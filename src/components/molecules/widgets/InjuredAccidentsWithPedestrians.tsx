import React, { FC } from 'react';
import { IWidgetInjuredAccidentsWithPedestrians } from 'models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { SingleBarChart } from '../GenericBarChartView';
import { useTranslation } from 'react-i18next';
import { transformItems } from '../../../utils/barchart';

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
  const originData = {
    name: 'accident_count_by_accident_year',
    data: {
      items: [
        { label_key: '2017', value: 55 },
        { label_key: '2018', value: 5 },
        { label_key: '2019', value: 1 },
      ],
    },
    text: {
      title: 'widget title bla bla',
      labels_map: {
        value: 'מספר נפגעים',
      },
    },
  };

  const isSingleBar = true;
  const items = transformItems(originData, isSingleBar);
  // console.log(JSON.stringify(transformedItems)); // [{"שנה":"2017","מספר נפגעים":55},{"שנה":"2018","מספר נפגעים":5},{"שנה":"2019","מספר נפגעים":1}];

  const yLabels = [originData.text.labels_map.value];

  return (
    <>
      <Box textAlign="center">{segmentText}</Box>
      <Box className={classes.chartWrapper}>
        <SingleBarChart isPercentage={false} data={items} yLabels={yLabels} />
      </Box>
    </>
  );
};
export default InjuredAccidentsWithPedestrians;
