import React, { FC } from 'react';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { Text, TextType } from '../atoms';
import { Table, TableBody, TableCell, TableHead, TableRow, Theme } from '@material-ui/core';
import { IWidgetMostSevereAccidentsTableData } from '../../models/WidgetData';
import { tableHeadColor, tableBackgroundColorMain, tableBackgroundColorOdd } from '../../style';

interface IProps {
  data: IWidgetMostSevereAccidentsTableData;
}
export const UseTableStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  table: {},
}));
export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: 0,
    },
    sizeSmall: {
      padding: '5px 0px',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      '&:last-child': {
        padding: 0,
      },
    },
    head: {
      backgroundColor: tableHeadColor,
      color: theme.palette.common.white,
    },
  }),
)(TableCell);
export const StyledTableRow = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: tableBackgroundColorMain,
      '&:nth-of-type(odd)': {
        backgroundColor: tableBackgroundColorOdd,
      },
    },
  }),
)(TableRow);

const TableView: FC<IProps> = ({ data }) => {
  const classes = UseTableStyles();
  const { items, text } = data;
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Text type={TextType.WIDGET_TABLE_TITLE}>{text.title}</Text>
      </div>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>
              <Text type={TextType.WIDGET_TABLE_HEADER}>תאריך</Text>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Text type={TextType.WIDGET_TABLE_HEADER}>שעה</Text>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Text type={TextType.WIDGET_TABLE_HEADER}>סוג תאונה</Text>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Text type={TextType.WIDGET_TABLE_HEADER}>הרוגים</Text>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Text type={TextType.WIDGET_TABLE_HEADER}>פצועים קשה</Text>
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                <Text type={TextType.WIDGET_TABLE_CONTENT}>{item.date}</Text>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Text type={TextType.WIDGET_TABLE_CONTENT}>{item.hour}</Text>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Text type={TextType.WIDGET_TABLE_CONTENT}>{item.type}</Text>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Text type={TextType.WIDGET_TABLE_CONTENT}>{item.killed_count}</Text>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Text type={TextType.WIDGET_TABLE_CONTENT}>{item.injured_count}</Text>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableView;
