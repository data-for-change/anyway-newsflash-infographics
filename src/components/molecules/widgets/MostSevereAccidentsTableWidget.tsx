import React, { FC } from 'react';
import TableView from '../TableView';
import { IWidgetMostSevereAccidentsTableData } from '../../../models/WidgetData';

interface IProps {
  data: IWidgetMostSevereAccidentsTableData
}
const MostSevereAccidentsTableWidget: FC<IProps> = ( {data} ) => {

  return <TableView data={data} />;
};
export default MostSevereAccidentsTableWidget;
