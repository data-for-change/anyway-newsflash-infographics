import React, { FC } from 'react';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '../atoms';
import { Table, TableBody, TableCell, TableHead, TableRow, Theme } from '@material-ui/core';
import { IWidgetMostSevereAccidentsTableData } from '../../models/WidgetData';
import { roadIconColors, silverGray, blackColorTransparency, solidWhite } from '../../style';

interface IProps {
  data: IWidgetMostSevereAccidentsTableData;
}
const useStyles = makeStyles((theme: Theme) => ({
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

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: 0,
    },
    sizeSmall: {
      padding: '5px 0px',
      border: `1px solid ${blackColorTransparency}`,
      '&:last-child': {
        padding: 0,
      },
    },
    head: {
      backgroundColor: silverGray,
      color: theme.palette.common.black,
    },
  }),
)(TableCell);
const StyledTableRow = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: solidWhite,
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

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography.Body4>{text?.title}</Typography.Body4>
      </div>
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
              <Typography.Body6>הרוגים</Typography.Body6>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography.Body6>פצועים קשה</Typography.Body6>
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
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
                <StyledTableCell align="right" style={{ backgroundColor: roadIconColors.red }}>
                  <Typography.Body6> {item.killed_count}</Typography.Body6>
                </StyledTableCell>
              ) : (
                <StyledTableCell align="right">
                  <Typography.Body6>{item.killed_count}</Typography.Body6>
                </StyledTableCell>
              )}
              {item.injured_count === maxInjured ? (
                <StyledTableCell align="right" style={{ backgroundColor: roadIconColors.red }}>
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
    </div>
  );
};
export default TableView;
