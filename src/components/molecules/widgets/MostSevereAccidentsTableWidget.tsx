import React, { FC } from 'react';
import TableView from '../TableView';
import { IWidgetMostSevereAccidentsTableData } from '../../../models/WidgetData';

interface IProps {
  data: IWidgetMostSevereAccidentsTableData;
  roadNumber: number;
}
const MostSevereAccidentsTableWidget: FC<IProps> = ({ data, roadNumber }) => {
  return <TableView data={data} roadNumber={roadNumber} />;
};

export default MostSevereAccidentsTableWidget;
