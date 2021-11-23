import React, { FC } from 'react';
import { IWidgetAccidentCountByCarType } from 'models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import GenericBarChartView, { BarType } from '../GenericBarChartView';


type stringNumObject = Record<string,string | number>;
type stringObject = Record<string,string>;

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
  const { t } = useTranslation();
  const { items:ignore } = data;

  // data expected from json
  const originData = {
    "name": "accident_count_by_car_type",
    "data":  {
      "y_label_name": "car_type",
      "is_percentage": true ,
      "bar_type": "multi",
      "items": [
        {
          "label_key": "bicycle",
          "series": [
            { "label_key":  "percentage_segment", "value": 10},
            { "label_key":  "percentage_country", "value": 8},
          ]
        },
        {
          "label_key": "motorcycle",
          "series": [
            { "label_key":  "percentage_segment", "value": 20},
            { "label_key":  "percentage_country", "value": 4},
          ]
        },
        {
          "label_key": "car",
          "series": [
            { "label_key":  "percentage_segment", "value": 30},
            { "label_key":  "percentage_country", "value": 66},
          ]
        },
        {
          "label_key": "truck",
          "series": [
            { "label_key":  "percentage_segment", "value": 40},
            { "label_key":  "percentage_country", "value": 11},
          ]
        },
      ]
    },
    "text": {
      "title": "accident count by car type",
      "y_label_name": "סוג רכב",
      "x_labels_map": {
        "percentage_segment": "אזור",
        "percentage_country": "מדינה",
      },
      "y_labels_map": {
        "truck": "מסחרי/משאית",
        "car": "רכב נוסעים פרטי",
        "motorcycle": "אופנוע",
        "bicycle":"אופניים/קורקינט",
        "other":"אחר"
      }
    }
  }

  const items = originData.data.items;
  const translatedYLabelName=  originData.text['y_label_name'];
  const isPercentage = originData.data.is_percentage;
  const xTranslateMap:stringObject = originData.text.x_labels_map;
  const yTranslateMap:stringObject = originData.text.y_labels_map;
  const barType =  originData.data.bar_type;

  const transformedItems = items.reduce((newArray:Array<stringNumObject>, currItem) => {
    const {label_key,series} = currItem;

    const newItem: stringNumObject = {};
    newItem[translatedYLabelName] = yTranslateMap[label_key] || label_key; //   {'year':2017}

    series.forEach((item)=>{
      const {label_key,value} = item;
      const property= xTranslateMap[label_key];
      newItem[property]= Math.round(value); //   {'year':2017, 'percentage_segment':5 ...series}
    })

    return [...newArray,newItem]
  }, []);

  const xLabels = Object.values(xTranslateMap);


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
        <GenericBarChartView
          barType={BarType.Multi}
          isPercentage={isPercentage}
          data={transformedItems}
          yLabel={translatedYLabelName}
          xLabels={xLabels}
        />
      </Box>
    </>
  );
};
export default AccidentCountByCarType;
