import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import TableView from 'components/molecules/Table/TableView';
import { IWidgetMostSevereAccidentsTableData } from 'models/WidgetData';
import { toJsDateFormat } from 'utils/time.utils';
import { createTableData } from 'components/molecules/Table/formatTableData.service';

interface IProps {
  data: IWidgetMostSevereAccidentsTableData;
}

const MostSevereAccidentsTableWidget: FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  const { items, text } = data;

  const labels: Array<string> = t('table.labels', { returnObjects: true });
  const dataKeys = ['date', 'hour', 'type', 'killed_count', 'severe_injured_count', 'light_injured_count'];

  const accidentsByAscDate = [...items];
  accidentsByAscDate.sort((a, b) => toJsDateFormat(b.date, b.hour) - toJsDateFormat(a.date, a.hour));

  const tableData = createTableData(labels, dataKeys, accidentsByAscDate, text);

  return <TableView data={tableData} />;
};

export default MostSevereAccidentsTableWidget;
