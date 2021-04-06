import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import TableView from '../Table/TableView';
import { IWidgetRainAccidentsBySeverityTableData } from '../../../models/WidgetData';
import { createTableData } from '../Table/formatTableData.service';

interface IProps {
  data: IWidgetRainAccidentsBySeverityTableData;
}

const RainAccidentsTableWidget: FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  const { items, text } = data;

  const labels: Array<string> = t('table.rainAccidentsLabels', { returnObjects: true });
  const dataKeys = ['severity_hebrew', 'amount_of_accidents_caused_by_rain', 'accidents_caused_by_rain_percentage'];

  const tableData = createTableData(labels, dataKeys, items, text);

  return <TableView data={tableData} />;
};

export default RainAccidentsTableWidget;
