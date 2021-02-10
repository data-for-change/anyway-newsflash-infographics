import React, { FC } from 'react';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '../atoms';
import { Table, TableBody, TableCell, TableHead, TableRow, Theme } from '@material-ui/core';
import { IWidgetMostSevereAccidentsTableData } from '../../models/WidgetData';
import { silverGrayColor, blackColor } from '../../style';
import { toJsDateFormat } from '../../utils/time.utils';

interface IProps {
  data: IWidgetMostSevereAccidentsTableData;
}
const useStyles = makeStyles((theme: Theme) => ({
  table: {
    border: `1px solid ${blackColor}`,
    borderBottom: 0,
    borderCollapse: 'separate',
  },
}));

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: theme.spacing(0.7, 0),
      borderBottom: `1px solid ${blackColor}`,
    },
    sizeSmall: {
      '&:last-child': {
        padding: theme.spacing(0.7, 1),
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
      // styles can be added here
    },
  }),
)(TableRow);

const TableView: FC<IProps> = ({ data }) => {
  const classes = useStyles();
  const { items } = data;

  const accidentsByAscDate = [...items];
  accidentsByAscDate.sort((a, b) => toJsDateFormat(b.date, b.hour) - toJsDateFormat(a.date, a.hour));

  return (
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>
            <Typography.Body5>תאריך</Typography.Body5>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Typography.Body5>שעה</Typography.Body5>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Typography.Body5>סוג תאונה</Typography.Body5>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Typography.Body5>הרוג</Typography.Body5>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Typography.Body5>קשה</Typography.Body5>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Typography.Body5>קל</Typography.Body5>
          </StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {accidentsByAscDate.map((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell scope="row">
              <Typography.Body6>{item.date}</Typography.Body6>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography.Body6>{item.hour}</Typography.Body6>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography.Body6>{item.type}</Typography.Body6>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography.Body6>{item.killed_count}</Typography.Body6>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography.Body6>{item.severe_injured_count}</Typography.Body6>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography.Body6>{item.light_injured_count}</Typography.Body6>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TableView;
