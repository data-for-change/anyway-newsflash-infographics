import React, { FC } from 'react';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '../atoms';
import { Table, TableBody, TableCell, TableHead, TableRow, Theme } from '@material-ui/core';
import { IWidgetMostSevereAccidentsTableData } from '../../models/WidgetData';
import { silverGrayColor, transparentColor, whiteColor, blackColor } from '../../style';
import { toJsDateFormat } from '../../utils/time.utils';

interface IProps {
  data: IWidgetMostSevereAccidentsTableData;
}
const useStyles = makeStyles((theme: Theme) => ({
  table: {
    border: `1px solid ${blackColor}`,
    borderCollapse: 'separate',
  },
}));

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: 0,
    },
    sizeSmall: {
      padding: '5px 0px',
      border: `1px solid ${transparentColor}`,
      '&:last-child': {
        padding: 0,
      },
    },
    head: {
      backgroundColor: silverGrayColor,
      color: theme.palette.common.black,
    },
  }),
)(TableCell);
const StyledTableRow = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: whiteColor,
    },
  }),
)(TableRow);

const TableView: FC<IProps> = ({ data }) => {
  const classes = useStyles();
  const { items, text } = data;

  const maxKilled = Math.max.apply(
    Math,
    items.map((item) => item.killed_count),
  );
  const maxInjured = Math.max.apply(
    Math,
    items.map((item) => item.injured_count),
  );

  const accidentsByAscDate = [...items];
  accidentsByAscDate.sort((a, b) => toJsDateFormat(b.date, b.hour) - toJsDateFormat(a.date, a.hour));

  return (
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>
            <Typography.Body6>תאריך</Typography.Body6>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Typography.Body6>שעה</Typography.Body6>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Typography.Body6>סוג תאונה</Typography.Body6>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Typography.Body6>הרוג</Typography.Body6>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Typography.Body6>קשה</Typography.Body6>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Typography.Body6>קל</Typography.Body6>
          </StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {accidentsByAscDate.map((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell component="th" scope="row">
              <Typography.Body6>{item.date}</Typography.Body6>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography.Body6>{item.hour}</Typography.Body6>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography.Body6>{item.type}</Typography.Body6>
            </StyledTableCell>
            {item.killed_count === maxKilled ? (
              <StyledTableCell align="right">
                <Typography.Body6> {item.killed_count}</Typography.Body6>
              </StyledTableCell>
            ) : (
              <StyledTableCell align="right">
                <Typography.Body6>{item.killed_count}</Typography.Body6>
              </StyledTableCell>
            )}
            {item.injured_count === maxInjured ? (
              <StyledTableCell align="right">
                <Typography.Body6>{item.injured_count}</Typography.Body6>
              </StyledTableCell>
            ) : (
              <StyledTableCell align="right">
                <Typography.Body6>{item.injured_count}</Typography.Body6>
              </StyledTableCell>
            )}
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TableView;
