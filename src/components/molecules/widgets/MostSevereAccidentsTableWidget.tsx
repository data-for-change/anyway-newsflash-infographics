import React, { FC } from 'react';
import TableView from '../TableView';
import { IWidgetMostSevereAccidentsTableData } from '../../../models/WidgetData';

interface IProps {
  data: IWidgetMostSevereAccidentsTableData;
}
const MostSevereAccidentsTableWidget: FC<IProps> = ({ data }) => {
  const { items } = data;
  const labels = ['קל', 'קשה', 'הרוג', 'סוג תאונה', 'שעה', 'תאריך'];
  const dataKeys = ['date', 'hour', 'type', 'killed_count', 'severe_injured_count', 'light_injured_count'];

  const d = items.map((item: any, i) => {
    return Object.keys(item)
      .filter((key) => dataKeys.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: item[key],
        };
      }, {});
  });
  console.log('🚀 ~ file: MostSevereAccidentsTableWidget.tsx ~ line 24 ~ d ~ d', d);

  return <TableView data={data} />;
};

export default MostSevereAccidentsTableWidget;
