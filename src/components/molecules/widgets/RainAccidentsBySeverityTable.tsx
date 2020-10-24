import React, { FC } from 'react';
import { IWidgetRainAccidentsBySeverityTable } from '../../../models/WidgetData';
import TableView from '../TableView';

interface IProps {
  data: IWidgetRainAccidentsBySeverityTable;
}
const dataMck = {
  items: [
    {
      severity: 2,
      severity_hebrew: 'קשה',
      amount_of_accidents_caused_by_rain: 10,
      accidents_caused_by_rain_percentage: 34,
    },
    {
      severity: 3,
      severity_hebrew: 'קשה',
      amount_of_accidents_caused_by_rain: 10,
      accidents_caused_by_rain_percentage: 34,
    },
    {
      severity: 5,
      severity_hebrew: 'קשה',
      amount_of_accidents_caused_by_rain: 10,
      accidents_caused_by_rain_percentage: 34,
    },
    {
      severity: 4,
      severity_hebrew: 'קשה',
      amount_of_accidents_caused_by_rain: 10,
      accidents_caused_by_rain_percentage: 34,
    },
    {
      severity: 3,
      severity_hebrew: 'קשה',
      amount_of_accidents_caused_by_rain: 10,
      accidents_caused_by_rain_percentage: 34,
    },
    {
      severity: 1,
      severity_hebrew: 'קשה',
      amount_of_accidents_caused_by_rain: 10,
      accidents_caused_by_rain_percentage: 34,
    },
  ],
  text: {
    title: 'road 24',
  },
};
const RainAccidentsBySeverityTable: FC<IProps> = ({ data }) => {
  return <TableView data={dataMck} />;
};
export default RainAccidentsBySeverityTable;
