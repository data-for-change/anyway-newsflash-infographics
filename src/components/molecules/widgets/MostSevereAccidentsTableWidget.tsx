import React, { FC } from 'react';
import TableView from '../TableView';
import { IWidgetMostSevereAccidentsTableData } from '../../../models/WidgetData';
import { toJsDateFormat } from '../../../utils/time.utils';
import { createTableData } from '../../../services/formatTableData.service';

interface IProps {
  data: IWidgetMostSevereAccidentsTableData;
}

const MostSevereAccidentsTableWidget: FC<IProps> = ({ data }) => {
  const { items, text } = data;

  const labels = ['תאריך', 'שעה', 'סוג תאונה', 'הרוג', 'קשה', 'קל'];
  const dataKeys = ['date', 'hour', 'type', 'killed_count', 'severe_injured_count', 'light_injured_count'];

  const accidentsByAscDate = [...items];
  accidentsByAscDate.sort((a, b) => toJsDateFormat(b.date, b.hour) - toJsDateFormat(a.date, a.hour));

  const tableData = createTableData(labels, dataKeys, accidentsByAscDate, text);

  return <TableView data={tableData} />;
};

export default MostSevereAccidentsTableWidget;
