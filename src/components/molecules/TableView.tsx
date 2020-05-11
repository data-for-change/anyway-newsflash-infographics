import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IWidgetMostSevereAccidentsTableData } from '../../models/WidgetData';

interface IProps {
  data: IWidgetMostSevereAccidentsTableData;
}
const useStyles = makeStyles({
  table: {},
});
const TableView: FC<IProps> = ({ data }) => {
    const classes = useStyles();
    const { items, text } = data;
    console.log(items, text);
    return (
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>תהריך</TableCell>
                        <TableCell align="right">שעה</TableCell>
                        <TableCell align="right">סוג תאונה</TableCell>
                        <TableCell align="right">הרוגים</TableCell>
                        <TableCell align="right">פצועים קשה</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">{item.date}</TableCell>
                            <TableCell align="right">{item.hour}</TableCell>
                            <TableCell align="right">{item.type}</TableCell>
                            <TableCell align="right">{item.killed_count}</TableCell>
                            <TableCell align="right">{item.injured_count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            );
};
export default TableView;
