import React, { FC } from 'react';
import { IWidgetInjuredAccidentsWithPedestrians } from 'models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import GenericBarChartView from '../GenericBarChartView';
import { useTranslation } from 'react-i18next';

const YEAR = 'year';
const KILLED_INJURY_SEVERITY_COUNT = 'killed_injury_severity_count';
const SEVERE_INJURY_SEVERITY_COUNT = 'severe_injury_severity_count';
const LIGHT_INJURY_SEVERITY_COUNT = 'light_injury_severity_count';
type stringNumObject = Record<string, string | number>;
type stringObject = Record<string, string>;

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
      items_depth: 1,
      items: [
        { label_key: '2017', value: 55 },
        { label_key: '2018', value: 5 },
        { label_key: '2019', value: 1 },
      ],
    },
    text: {
      title: 'widget title bla bla',
      labels_map: {
        y_label_name: 'שנה',
        value: 'מספר נפגעים',
      },
    },
  };
  let transformedItems: Array<stringNumObject> = [];
  const labelsMap: stringObject = originData.text.labels_map;
  const translatedYLabelName = getTranslatedLabel('y_label_name');
  const translatedXLabelName = getTranslatedLabel('value');
  function getTranslatedLabel(key: string): string {
    return labelsMap[key] || key;
  }
  if (originData.data.items_depth === 1) {
    transformedItems = originData.data.items.map((item) => {
      const result: stringNumObject = {};
      const label = item.label_key.toString();
      result[translatedYLabelName] = getTranslatedLabel(label);
      result[translatedXLabelName] = item.value;
      return result;
    });
  }
  console.log(JSON.stringify(transformedItems)); // [{"שנה":"2017","מספר נפגעים":55},{"שנה":"2018","מספר נפגעים":5},{"שנה":"2019","מספר נפגעים":1}];

  const xLabels = [originData.text.labels_map.value];

  return (
    <>
      <Box textAlign="center">{segmentText}</Box>
      <Box className={classes.chartWrapper}>
        <GenericBarChartView
          isStacked={false}
          isPercentage={false}
          data={transformedItems}
          yLabel={translatedYLabelName}
          xLabels={xLabels}
        />
      </Box>
    </>
  );
};
export default InjuredAccidentsWithPedestrians;
